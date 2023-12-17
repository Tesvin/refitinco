import express from "express";
import { balance, response } from "../controller/auth.transaction.js";

const router = express.Router();

router.get("/response", response);
//router.get("/userallet/:Id", getBalance);
router.get("/wallet/:userId", balance);


export default router;