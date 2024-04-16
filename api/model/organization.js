import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

const Organization = sequelize.define('Organization', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Refitsols'
    },
    totalUnits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 15000
    },
    reservedUnits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 15000
    },
    soldUnits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'organizations',
    timestamps: true
});

export default Organization;