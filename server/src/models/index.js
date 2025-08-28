// src/models/index.js
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import Sequelize from "sequelize";

// --- Tạo __filename và __dirname chuẩn ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Load config ---
const env = process.env.NODE_ENV || "development";
const configPath = path.resolve(__dirname, "../config/config.json");
const configFile = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const config = configFile[env];

// --- Khởi tạo Sequelize ---
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

// --- Khởi tạo db object ---
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// --- Load tất cả model ---
const basename = path.basename(__filename);
const files = fs
    .readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            file.indexOf(".test.js") === -1
    );

for (const file of files) {
    const modulePath = path.join(__dirname, file);
    const moduleURL = pathToFileURL(modulePath).href; // chuyển sang file:// URL
    const modelModule = await import(moduleURL);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
}

// --- Gọi associate nếu có ---
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;
