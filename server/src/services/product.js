// src/services/product.js
import db from "../models/index.js";
import { CategoryLevel1, CategoryLevel2 } from "../common/enum/index.js";


// thêm sản phẩm
export const addProductService = async (body) => {
    try {
        // 1️⃣ validate phan_loai
        if (!Object.keys(CategoryLevel1).includes(body.phan_loai)) {
            throw new Error("phan_loai không hợp lệ. Hãy gửi key (VD: DO_AN, DO_UONG)");
        }

        // 2️⃣ validate chi_tiet_phan_loai
        if (!Object.keys(CategoryLevel2).includes(body.chi_tiet_phan_loai)) {
            throw new Error("chi_tiet_phan_loai không hợp lệ. Hãy gửi key (VD: COM, MI)");
        }

        // 3️⃣ kiểm tra chi_tiet_phan_loai thuộc phan_loai
        const parentId = CategoryLevel1[body.phan_loai].id;
        if (CategoryLevel2[body.chi_tiet_phan_loai].parentId !== parentId) {
            throw new Error("chi_tiet_phan_loai không thuộc phan_loai đã chọn");
        }

        // 4️⃣ chuẩn bị dữ liệu tạo mới
        const newData = {
            ten_mon: body.ten_mon,
            gia: Number(body.gia), // đảm bảo là number
            mo_ta: body.mo_ta,
            don_vi: body.don_vi,
            kich_co: body.kich_co,
            trang_thai: body.trang_thai,
            phan_loai: CategoryLevel1[body.phan_loai].label, // lưu label
            chi_tiet_phan_loai: CategoryLevel2[body.chi_tiet_phan_loai].label, // lưu label
            anh: body.anh || null, // nếu có file ảnh, else null
        };

        // 5️⃣ tạo sản phẩm
        const newProduct = await db.SanPham.create(newData);

        return {
            message: "Thêm sản phẩm thành công",
            data: newProduct,
        };
    } catch (error) {
        throw {
            message: "Lỗi khi thêm sản phẩm",
            error: error.message,
        };
    }
};


// lấy toàn bộ sản phẩm
export const getProductService = async () => {
    try {
        const getProduct = await db.SanPham.findAll();
        return {
            message: "Get sản phẩm thành công",
            data: getProduct,
        };
    } catch (error) {
        throw {
            message: "Lỗi khi lấy sản phẩm",
            error: error.message,
        };
    }
};

// lấy 6 sản phẩm
export const getTopProductService = async (req, res) => {
    try {
        const topProducts = await db.SanPham.findAll({
            limit: 6,
            attributes: ['ten_mon', 'anh'], // chỉ lấy 2 trường
            where: {
                trang_thai: {
                    [db.Sequelize.Op.ne]: 'an' // không lấy những sản phẩm có trang_thai = 'an'
                }
            }
        });
        return {
            message: "Lấy 6 sản phẩm nổi bật",
            data: topProducts,
        };
    } catch (error) {
        throw {
            message: "Lỗi khi lấy sản phẩm",
            error: error.message,
        }
    }
};


// edit sản phẩm
export const editProductService = async (id, body) => {
    try {
        // 1️⃣ validate phan_loai
        if (!Object.keys(CategoryLevel1).includes(body.phan_loai)) {
            throw new Error("phan_loai không hợp lệ. Hãy gửi key (VD: DO_AN, DO_UONG)");
        }

        // 2️⃣ validate chi_tiet_phan_loai
        if (!Object.keys(CategoryLevel2).includes(body.chi_tiet_phan_loai)) {
            throw new Error("chi_tiet_phan_loai không hợp lệ. Hãy gửi key (VD: COM, MI)");
        }

        // 3️⃣ kiểm tra chi_tiet_phan_loai thuộc phan_loai
        const parentId = CategoryLevel1[body.phan_loai].id;
        if (CategoryLevel2[body.chi_tiet_phan_loai].parentId !== parentId) {
            throw new Error("chi_tiet_phan_loai không thuộc phan_loai đã chọn");
        }

        // 4️⃣ tìm sản phẩm cần sửa
        const product = await db.SanPham.findByPk(id);
        if (!product) {
            throw new Error("Sản phẩm không tồn tại");
        }

        // 5️⃣ chuẩn bị dữ liệu cập nhật (lưu label vào cột phan_loai và chi_tiet_phan_loai)
        const updatedData = {
            ten_mon: body.ten_mon,
            gia: Number(body.gia), // đảm bảo là số
            mo_ta: body.mo_ta,
            don_vi: body.don_vi,
            kich_co: body.kich_co,
            trang_thai: body.trang_thai,
            phan_loai: CategoryLevel1[body.phan_loai].label, // lưu label
            chi_tiet_phan_loai: CategoryLevel2[body.chi_tiet_phan_loai].label, // lưu label
            anh: body.anh ? body.anh : product.anh, // update ảnh nếu có
        };

        // 6️⃣ cập nhật database
        await product.update(updatedData);

        return {
            message: "Sửa sản phẩm thành công",
            data: product,
        };
    } catch (error) {
        throw {
            message: "Lỗi khi sửa sản phẩm",
            error: error.message,
        };
    }
};
