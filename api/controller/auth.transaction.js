import User from "../model/user.model.js";
import Wallet from "../model/wallet.js";
import WalletTransaction from "../model/wallet_transaction.js";
import Transaction from "../model/transaction.js";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

//...

export const response = async (req, res) => {
    const { transaction_id } = req.query;
  
    // URL with transaction ID of which will be used to confirm transaction status
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
  
    // Network call to confirm transaction status
    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      },
    });
  
    const { status, currency, id, amount, customer } = response.data.data;
  
    // check if transaction id already exist
  
    const transactionExist = await Transaction.findOne({ transactionId: id });
  
    if (transactionExist) {
      return res.status(409).send("Transaction Already Exist");
    }
    // check if customer exist in our database
    const user = await User.findOne({ email: customer.email });
  
    if (!user) {
      console.log(`User not found for email: ${customer.email}`);
      return res.status(404).send("User not found");
    }

    // check if user have a wallet, else create wallet
    const wallet = await validateUserWallet(user._id);
  
    // create wallet transaction
    await createWalletTransaction(user._id, status, currency, amount);
  
    // create transaction
    await createTransaction(user._id, id, status, currency, amount, customer);
  
    await updateWallet(user._id, amount);
  
    return res.status(200).json({
      response: "wallet funded successfully",
      data: wallet,
    });
  };
  
export const balance = async (req, res) => {
    try {
      const { userId } = req.params;
      // const { userId } = await Wallet.findById(req.params.userId)
      const wallet = await Wallet.findOne({ userId });
      // user
      res.status(200).json(wallet.balance);
    } catch (err) {
      console.log(err);
    }
  };

// export const getBalance = async (req, res) => {
//   try {
//     const balance = await Wallet.findById(req.params.id);
//     if(!balance) {
//       return error
//     }
//     res.status(200).json(balance)
//   } catch (error) {
    
//   }
// }

  export const transaction = async (req, res) => {
    try {
      const { userId } = req.params
      const transaction = await Transaction.findOne({ userId })
      res.status(200).json(transaction)
    } catch (error) {
      console.log(err)
    }
  }

  const validateUserWallet = async (userId) => {
    try {
      // check if user have a wallet, else create wallet
      const userWallet = await Wallet.findOne({ userId });
  
      if (!userWallet) {
        // create wallet
        const wallet = await Wallet.create({
          userId,
        });
        return wallet;
      }
      return userWallet;
    } catch (error) {
      console.log(error);
    }
  };
  
  const createWalletTransaction = async (userId, status, currency, amount) => {
    try {
      // create wallet transaction
      const walletTransaction = await WalletTransaction.create({
        amount,
        userId,
        isInflow: true,
        currency,
        status,
      });
      return walletTransaction;
    } catch (error) {
      console.log(error);
    }
  };
  
  const createTransaction = async (
    userId,
    id,
    status,
    currency,
    amount,
    customer
  ) => {
    try {
      // create transaction
      const transaction = await Transaction.create({
        userId,
        transactionId: id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone_number,
        amount,
        currency,
        paymentStatus: status,
        paymentGateway: "flutterwave",
      });
      return transaction;
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateWallet = async (userId, amount) => {
    try {
      // update wallet
      const wallet = await Wallet.findOneAndUpdate(
        { userId },
        { $inc: { balance: amount } },
        { new: true }
      );
      return wallet;
    } catch (error) {
      console.log(error);
    }
  };

