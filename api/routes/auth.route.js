import express from 'express';
import { signup, signin, generateOTP, signOut, getResetToken } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get("/signout", signOut);
router.post('/reset_password', getResetToken);
router.put('/reset_password', updatePassword);
router.post('/generateOTP', generateOTP);


export default router;