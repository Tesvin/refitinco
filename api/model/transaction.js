import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import User from "./user.js";


const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  units: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'success', 'failed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gateway: {
    type: DataTypes.ENUM('paystack', 'flutterwave', 'stripe'),
    allowNull: false,
    defaultValue: 'flutterwave'
  }
}, {
  tableName: 'transactions',
  timestamps: true
});

export default Transaction;