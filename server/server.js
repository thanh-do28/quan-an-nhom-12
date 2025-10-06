import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import initRoutes from "./src/routes/index.js";
import sequelize from "./src/config/connectDB.js";
import fs from 'fs';
import path from 'path';

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

        // Thử chạy file SQL tạo bảng nếu tồn tại
        try {
            const sqlPath = path.resolve(process.cwd(), 'create_sanphams_table.sql');
            if (fs.existsSync(sqlPath)) {
                const sql = fs.readFileSync(sqlPath, { encoding: 'utf8' });
                if (sql && sql.trim().length > 0) {
                    // Một số driver MySQL không cho phép nhiều statement trong một query.
                    // Để an toàn, tách file SQL theo dấu `;` và thực thi từng câu lệnh riêng.
                    const statements = sql
                        .split(';')
                        .map(s => s.trim())
                        .filter(s => s.length > 0);

                    for (const stmt of statements) {
                        try {
                            await sequelize.query(stmt);
                        } catch (innerErr) {
                            console.error('❌ Lỗi khi thực thi câu lệnh SQL:', stmt, innerErr.message || innerErr);
                            // Không ném tiếp để vẫn cố gắng chạy các câu khác; tùy bạn có muốn dừng ở đây hay không.
                        }
                    }

                    console.log('✅ Đã thực thi create_sanphams_table.sql (từng câu lệnh)');
                } else {
                    console.log('⚠️ File create_sanphams_table.sql rỗng, không thực thi.');
                }
            } else {
                console.log('ℹ️ Không tìm thấy create_sanphams_table.sql, bỏ qua bước tạo bảng.');
            }
        } catch (err) {
            console.error('❌ Lỗi khi thực thi create_sanphams_table.sql:', err.message || err);
        }

        const listener = app.listen(port, () => {
            console.log(`✅ Server đang chạy tại ${listener.address().port}`);
        });
    } catch (error) {
        console.error('❌ Không thể kết nối DB:', error);
    }
})();


