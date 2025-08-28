// src/models/sanpham.js
export default (sequelize, DataTypes) => {
    const SanPham = sequelize.define(
        "SanPham",
        {
            ten_mon: { type: DataTypes.STRING, allowNull: false },
            anh: { type: DataTypes.STRING },
            gia: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            mo_ta: { type: DataTypes.TEXT },
            don_vi: { type: DataTypes.STRING },
            kich_co: { type: DataTypes.STRING }, // Lưu dạng CSV nếu nhiều size
            trang_thai: { type: DataTypes.ENUM("hien", "an"), defaultValue: "hien" },
            phan_loai: { type: DataTypes.STRING },
            chi_tiet_phan_loai: { type: DataTypes.STRING },
        },
        {
            sequelize,
            modelName: "SanPham",
            tableName: 'SanPhams',
            timestamps: true ,
        }
    );

    SanPham.associate = (models) => {
        // Ví dụ: SanPham.belongsTo(models.User);
    };

    return SanPham;
};
