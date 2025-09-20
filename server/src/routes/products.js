import express from "express";
import multer from "multer";
import path from "path";

import * as productController from "../controllers/product.js";

const router = express.Router();

// Cấu hình multer để lưu ảnh vào public/images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images"); // nơi lưu file
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName);
    },
});

const upload = multer({ storage });
router.post("/addproducts",upload.single("anh"),productController.addproduct )
router.get("/alllistproducts",productController.getlistproduct)
router.get("/alllistproductscline",productController.getlistproductcline)
router.get("/topproducts",productController.gettopproduct)
router.put("/editproduct/:id",upload.single("anh"),productController.editproduct)
router.delete("/deleteproduct/:id", productController.deleteProduct)
router.get("/searchproduct", productController.searchProducts);


export default router;