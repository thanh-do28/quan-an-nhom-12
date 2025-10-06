-- Tệp: create_sanphams_table.sql
-- Mục đích: Tạo bảng `SanPhams` tương thích với model `SanPham` trong dự án

DROP TABLE IF EXISTS `SanPhams`;
CREATE TABLE `SanPhams` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ten_mon` VARCHAR(255) NOT NULL,
  `anh` VARCHAR(255),
  `gia` DECIMAL(10,2) NOT NULL,
  `mo_ta` TEXT,
  `don_vi` VARCHAR(255),
  `kich_co` VARCHAR(255),
  `trang_thai` ENUM('hien','an') DEFAULT 'hien',
  `phan_loai` VARCHAR(255),
  `chi_tiet_phan_loai` VARCHAR(255),
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

