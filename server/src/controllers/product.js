import * as productService from '../services/product.js';
import {searchProductService} from "../services/product.js";

// thêm sản phẩm
export const addproduct = async (req, res) => {
    try {
        const body = req.body;
        // console.log("File upload:", req.file);
        // console.log("Body:", req.body);

        if (req.file) {
            body.anh = req.file.filename;
        }
        const result = await productService.addProductService(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// lấy toàn bộ sản phẩm
export const getlistproduct = async (req, res) => {
    try {
        const result = await productService.getProductService();
        // console.log(result);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getlistproductcline = async (req, res) => {
    try {
        const result = await productService.getProductClineService();
        // console.log(result);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// lấy 6 sản phẩm
export const gettopproduct = async (req, res) => {
    try {
        const result = await productService.getTopProductService();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

// edit sản phẩm
export const editproduct = async (req, res) => {
    try {

        const id = req.params.id;
        const body = req.body;
        // console.log(body);
        if (req.file) {
            body.anh = req.file.filename;
        }
        const result = await productService.editProductService(id, body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

// xoá sản phẩm
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productService.deleteProductService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// tìm kiếm sản phẩm
export const searchProducts = async (req, res) => {
    const { keyword } = req.query; // lấy từ query string ?keyword=...
    // console.log(keyword);
    try {
        const result = await productService.searchProductService(keyword);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};