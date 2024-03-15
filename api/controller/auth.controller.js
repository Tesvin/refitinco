import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

export const signup = async (req, res, next) => {
  const { firstname, lastname, email, password, refer } = req.body;

  if (!firstname && !lastname && !email && !password) {
    return res.status(400).json({error: 'Missing field'})
  }
  const user = await User.findOne({ email });
  if (user) return next(errorHandler(401, 'Your email already exist'));
  const hashedPassword = bcryptjs.hashSync(password, 10);
  if (refer) {
    const parentId = await User.findOne({ parent_refer: refer })
  }
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    parent_refer: refer || '',
    refer_code: uuidv4()
   });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({error: 'Missing field'})
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, "Not a member!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Incorrect password!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
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

  if (!email) {
    return res.status(400).json({error: 'Missing field'})
  }
  const user = await User.findOne({ email });
  if (!user) return next(errorHandler(401, 'Not a member'));
  await User.updateOne({ _id: ObjectId(user.id) }, { $set: { refer_code: uuidv4() }});

}