import { Sequelize } from "@sequelize/core";
const { USER, PASS, HOST, DATABASE } = process.env;
const connection = new Sequelize({
  host: HOST,
  username: USER,
  password: PASS,
  database: DATABASE,
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await connection.authenticate();
    console.log("Connect to db successfully");
  } catch (error) {
    console.log("Connect to db error => ", error);
  }
})();

export default connection;
