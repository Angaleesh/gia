import dotenv from "dotenv";
import successMessage from "../lang/success.message";
import errorMessage from "../lang/error.message";
import { Sequelize } from "sequelize";
dotenv.config();
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

export const sequelize = new Sequelize(
  DB_NAME || "your_db_name",
  DB_USER || "your_db_user",
  DB_PASS || "your_db_password",
  {
    host: DB_HOST || "localhost",
    dialect: "postgres",
    port: parseInt(DB_PORT || "5432"),
    logging: false,
  }
);

export default async () => {
  try {
    await sequelize.authenticate();
    console.log(successMessage.DB_CONNECTED);
  } catch (error) {
    console.error(errorMessage.DATABASE_DISCONNECTED, error);
  }
};
