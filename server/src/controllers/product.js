import * as productService from '../services/product.js';

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