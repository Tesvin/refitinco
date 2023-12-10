import express from 'express';
//import { flutterwave, paymentCallBack, response } from '../controller/flutterwavePayment.js';

const router = express.Router();

//router.post('/flutterwave', flutterwave);
router.get('/paymentCallBack', paymentCallBack);
router.get('/response', response);

export default router;