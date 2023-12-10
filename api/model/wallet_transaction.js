import mongoose from "mongoose";

const walletTransactionSchema  = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 },

    // Even though user can be implied from wallet, let us
    // double save it for security
    userId: {
      type: String,
      ref: "Users",
      required: true,
    },

    isInflow: { type: Boolean },

    paymentMethod: { type: String, default: "flutterwave" },

    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["NGN", "USD", "EUR", "GBP"],
    },

    status: {
      type: String,
      required: [true, "payment status is required"],
      enum: ["successful", "pending", "failed"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("walletTransaction", walletTransactionSchema);

export default User;
