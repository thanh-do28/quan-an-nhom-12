import express from "express";
import * as enums from "../controllers/enums.js";
const router = express.Router();

router.get("/enums", enums.enums)


export default router;