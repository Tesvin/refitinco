import User from "../model/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import Mailer from "../service/Mailer.js";



export const signup = async (req, res, next) => {
  const { firstname, lastname, email, password, refer } = req.body;

  if (!firstname && !lastname && !email && !password) {
    return res.status(400).json({error: 'Missing field'})
  }
  const user = await User.findOne({ where: { 'email': email }});
  if (user) return next(errorHandler(401, 'Your email already exist'));
  const hashedPassword = bcryptjs.hashSync(password, 10);
  if (refer) {
    const parentId = await User.findOne({ parent_refer: refer })
  }
  const mailResponse = await Mailer.mail(email,
    {
      title: 'Refitsols',
      body: `
        <html>
        <body>
          <h1>Reftinco Email Verification</h1>
          Hi ${firstname}, <br>
          We've received your request due to attempt to create an account.
          <p> Your registration was successful </p>
          If you didn't attempt signing up, you can safely ignore this email. Someone else might have typed your email address by mistake.
          Thanks <br>
          <strong>Reftinco Team</strong>
        </body>
        <html>
      `
  });
  if (mailResponse.error) return res.status(500).json({error: 'An error occured while sending message'});
  const xid = uuidv4()
  try {
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      parent_refer: refer || '',
      refer_code: xid.split('-')[0]
    });
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({error: 'Missing field'})
  try {
    const validUser = await User.findOne({ where: {'email': email } });
    if (!validUser) return next(errorHandler(401, "Not a member!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Incorrect password!"));
    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
    const userData = validUser.get({ plain: true });
    delete userData.password;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userData);
  } catch (error) {
    next(error);
  }
};

/** GET: http://localhost:8080/api/generateOTP */
export const generateOTP = async (req, res, next) => {
  req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
  res.status(201).send({ code: req.app.locals.OTP })
}


export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};

export const getResetToken = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(errorHandler(400, 'Missing field'));
  try {
    const user = await User.findOne({where: {'email': email} });
    if (!user) return next(errorHandler(401, 'Not a member'));
    const token = uuidv4();
    user.token = token;
    await user.save();
    return res.status(200).json({ 'email': email, 'reset_token': token });
  } catch (error) {
    next(error);
  }
}

export const updatePassword = async (req, res, next) => {
  const { email, password, reset_token } = req.body;
  if (!email) return next(errorHandler(400, 'Missing email'));
  if (!password) return next(errorHandler(400, 'Missing password'));
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const user = await User.findOne({where: {'email': email} });
  user.set({ password: hashedPassword });
  await user.save()
  return res.status(200).json("Password updated successfully");
}