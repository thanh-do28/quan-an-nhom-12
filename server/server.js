import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import initRoutes from "./src/routes/index.js";
import sequelize from "./src/config/connectDB.js";

const app = express();
app.use(cors(
    {origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],}
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route cơ bản
initRoutes(app)


const port = process.env.PORT || 8080;
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Kết nối database thành công!');

        const listener = app.listen(port, () => {
            console.log(`✅ Server đang chạy tại ${listener.address().port}`);
        });
    } catch (error) {
        console.error('❌ Không thể kết nối DB:', error);
    }
})();


