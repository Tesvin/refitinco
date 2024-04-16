import User from '../model/user.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByPk(req.params.id)
        updateUser.set({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
            });
        await updatedUser.save();
        const user = updatedUser.get({ plain: true });
        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
    try {
        const user = await User.findByPk(req.params.id);
        await user.destroy();
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return next(errorHandler(404, "User not found!"));
        const userData = user.get({ plain: true });
        delete userData.password
        res.status(200).json(userData)
    } catch (error) {
        next(error)
    }
}

