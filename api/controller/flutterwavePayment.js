import axios from 'axios';
import got from 'got';
import Transaction from '../model/transaction.js'
//const got = require("got");

export const flutterwave = async (req, res, next) => {
try {
    const response = await got.post("https://api.flutterwave.com/v3/payments", {
        headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
        },
        json: {
            tx_ref: "hooli-tx-1920bbtytty",
            amount: "100",
            currency: "NGN",
            //redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
            redirect_url: "https://",
            meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a"
            },
            customer: {
                email: "user@gmail.com",
                phonenumber: "080****4528",
                name: "Yemi Desola"
            },
            customizations: {
                title: "Pied Piper Payments",
                logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
            }
        }
    }).json();
} catch (err) {
    console.log(err.code);
    console.log(err.response.body);
}
}

export const paymentCallBack = async (req, res, next) => {
    if (req.query.status === 'successful') {
        const transactionDetails = await Transaction.find({ref: req.query.tx_ref});
        const response = await flw.Transaction.verify({id: req.query.transaction_id});
        if (
            response.data.status === "successful"
            && response.data.amount === transactionDetails.amount
            && response.data.currency === "NGN") {
            // Success! Confirm the customer's payment
        } else {
            // Inform the customer their payment was unsuccessful
        }
    }
};



export const response = async (req, res, next) => {
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