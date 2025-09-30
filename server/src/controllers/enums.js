import { CategoryLevel1, CategoryLevel2, thongTin } from "../common/enum/index.js";

export const enums = async (req, res) => {
    try {
        res.status(201).json({CategoryLevel1,CategoryLevel2});
    } catch (err) {
        res.status(500).json(err);
    }
};

export const ThongTin = async (req, res) => {
    try {
        res.status(201).json({thongTin});
    } catch (err) {
        res.status(500).json(err);
    }
};