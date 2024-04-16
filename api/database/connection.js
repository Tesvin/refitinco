import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('hbtn_0c_0', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

try {
    await sequelize.authenticate();
    //console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}