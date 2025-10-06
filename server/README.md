# Hướng dẫn tạo bảng `SanPhams` và chạy migrations

Tài liệu này mô tả cách tạo bảng `SanPhams` (bảng cho model `SanPham`) trong cơ sở dữ liệu MySQL cho dự án.

Nội dung:

- `create_sanphams_table.sql`: lệnh SQL để tạo trực tiếp bảng `SanPhams`.
- Tham chiếu cấu hình DB: `src/config/config.json` (mặc định development dùng `root` / `090909` và database `nhom12quanan`).

---

1. Chạy file SQL trực tiếp (MySQL)

Trên máy có MySQL, mở terminal (PowerShell) và chạy:

```powershell
mysql -u root -p nhom12quanan < .\create_sanphams_table.sql
```

Khi được yêu cầu nhập mật khẩu, nhập `090909` (hoặc mật khẩu tương ứng nếu bạn đã thay đổi).

Nếu database `nhom12quanan` chưa tồn tại, tạo trước:

```powershell
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS nhom12quanan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

2. Dùng Sequelize migrations (nếu dự án dùng sequelize-cli)

- Cấu hình kết nối nằm trong `src/config/config.json`. Kiểm tra `development` để chắc thông tin đúng.
- Đảm bảo đã cài `sequelize-cli` (nếu chưa):

```powershell
npm install --save-dev sequelize-cli
```

- Chạy migration (từ thư mục `server` nơi có `package.json` và `node_modules`):

```powershell
npx sequelize db:migrate --config src/config/config.json --migrations-path src/migrations
```

Ghi chú: migration mẫu `20250819150322-create-san-pham.cjs` trong `src/migrations` tạo bảng `SanPhams` tương thích với model.

3. Các cài đặt và lưu ý

- Model `src/models/sanpham.js` khai báo các trường chính: `ten_mon, anh, gia, mo_ta, don_vi, kich_co, trang_thai, phan_loai, chi_tiet_phan_loai`.
- Trường `trang_thai` trong model là ENUM('hien','an'). Migration có thể lưu dưới dạng STRING nếu muốn nhưng SQL trong `create_sanphams_table.sql` đã khai báo ENUM để khớp.
- Charset/collation: dùng `utf8mb4` để hỗ trợ ký tự tiếng Việt.

4. Kiểm tra sau khi tạo

Bạn có thể kiểm tra bảng đã tồn tại và cấu trúc bằng câu lệnh:

```powershell
mysql -u root -p -e "USE nhom12quanan; SHOW CREATE TABLE SanPhams\G"
```

Hoặc dùng công cụ quản lý DB như MySQL Workbench, DBeaver.

---

Nếu muốn, tôi có thể:

- Thêm migration mới để cập nhật schema dựa trên model hiện tại;
- Hoặc chỉnh lại migration để mọi kiểu dữ liệu khớp chính xác (ví dụ DECIMAL(10,2) cho `gia`).
