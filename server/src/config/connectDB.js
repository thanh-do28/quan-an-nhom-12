// src/config/database.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'nhom12quanan', // tên database
    'root',      // user
    '12345678a@',      // mật khẩu
    {
        host: 'localhost',
        dialect: 'mysql', // hoặc 'postgres', 'sqlite', 'mssql'
        logging: false,   // tắt log SQL trong console

    }
);

export default sequelize;
