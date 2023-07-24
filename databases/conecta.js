import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "rataodelivery", "root", "diago", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});