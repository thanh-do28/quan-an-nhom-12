// src/services/product.js
import db from "../models/index.js";

// thêm sản phẩm
export const addProductService = async (body) => {
    try {
        // console.log("addProductService anh",body.anh);
        const newProduct = await db.SanPham.create(body);
        return {
            message: "Thêm sản phẩm thành công",
            data: newProduct,
        };
    } catch (error) {
        console.log(error.message);
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
        });
        // console.log("Data:", topProducts);
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
        // Tìm sản phẩm theo id
        const product = await db.SanPham.findByPk(id);
        if (!product) {
            return {
                message: "Không tìm thấy sản phẩm",
                data: null
            };
        }

        // Cập nhật sản phẩm
        await product.update(body);

        return {
            message: "Cập nhật sản phẩm thành công",
            data: product
        };
    } catch (error) {
        throw {
            message: "Lỗi khi cập nhật sản phẩm",
            error: error.message
        };
    }
};