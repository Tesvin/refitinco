import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import User from "./user.js";

const Shares = sequelize.define('Shares', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.UUIDV4,
        references: {
            model: User,
            key: 'id'
        }
    },
    units: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'shares',
    timestamps: true
});


export default Shares;