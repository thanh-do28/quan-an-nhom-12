import express from "express";
import productRouter from "./products.js";
import enums from "./enums.js";


const initRoutes = (app) => {

    // Cho phép public/images truy cập trực tiếp
    app.use("/images", express.static("public/images"));
    app.use("/api", enums);
    app.use('/api', productRouter);

    return app.use('/', (req, res) => {
        res.send("server on ...");
    })
}

export default initRoutes;