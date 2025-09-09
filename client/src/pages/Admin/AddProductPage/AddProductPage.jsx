import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {NavLink, Routes, Route} from "react-router-dom";
import "./AddProductPage.css"

import * as productSlice from "../../../redux/Slice/productSlice";

const AddProductPage = () => {
    const [phanloai, setPhanLoai] = useState("");
    const [chi_tiet_phan_loai, setChiTiet] = useState("");
    const [kichCo, setKichCo] = useState([]);
    const [trang_thai, setTrangThai] = useState("hien");
    const dispatch = useDispatch();
    // Dữ liệu chi tiết phân loại
    const chiTietOptions = {
        "1": ["Cơm", "Mì", "Lẩu", "Bún"],
        "2": ["Nước ngọt", "Bia", "Rượu"],
        "3": ["Bánh ngọt", "Kem", "Trái cây"],
    };
    const phanLoaiMapping = {
        "1": "Đồ ăn",
        "2": "Đồ uống",
        "3": "Tráng miệng"
    };

    // Xử lý chọn kích cỡ
    const handleKichCoChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setKichCo([...kichCo, value]);
        } else {
            setKichCo(kichCo.filter((k) => k !== value));
        }
    };

    // Submit form (demo)
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const phan_loai = phanLoaiMapping[phanloai];
        const kich_co = kichCo.join(","); // "S,M"// ví dụ "Đồ ăn"
        const formData = new FormData();
        formData.append("ten_mon", form.elements.ten_mon.value);
        formData.append("gia", form.elements.gia.value);
        formData.append("mo_ta", form.elements.mo_ta.value);
        formData.append("don_vi", form.elements.don_vi.value);
        formData.append("kich_co", kich_co);
        formData.append("trang_thai", trang_thai);
        formData.append("phan_loai", phan_loai);
        formData.append("chi_tiet_phan_loai", chi_tiet_phan_loai);

        const file = form.elements.anh.files[0];
        if (file) {
            formData.append("anh", file); // gửi file thật
        }
        // console.log(formData);
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        dispatch(productSlice.addProduct(formData))
    };
    return (
        <div>
            {/* Add Sản Phẩm */}
            <div className="container ">
                <h2 className="mb-4 text-center">Thêm Sản Phẩm</h2>
                <form className="p-4 shadow rounded bg-light" onSubmit={handleSubmit}>
                    {/* Tên món */}
                    <div className="mb-3">
                        <label className="form-label">Tên món</label>
                        <input type="text" name="ten_mon" className="form-control" required/>
                    </div>

                    {/* Ảnh */}
                    <div className="mb-3">
                        <label className="form-label">Ảnh</label>
                        <input type="file" name="anh" className="form-control"/>
                    </div>

                    {/* Giá */}
                    <div className="mb-3">
                        <label className="form-label">Giá</label>
                        <input type="number" name="gia" className="form-control" required/>
                    </div>

                    {/* Mô tả */}
                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <textarea name="mo_ta" className="form-control" rows="3"></textarea>
                    </div>

                    {/* Đơn vị */}
                    <div className="mb-3">
                        <label className="form-label">Đơn vị</label>
                        <input type="text" name="don_vi" className="form-control"/>
                    </div>

                    {/* Kích cỡ */}
                    <div className="mb-3">
                        <label className="form-label">Kích cỡ</label>
                        <div>
                            {["S", "M", "L"].map((size) => (
                                <div className="form-check form-check-inline" key={size}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={size}
                                        onChange={handleKichCoChange}
                                    />
                                    <label className="form-check-label">{size}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trạng thái */}
                    <div className="mb-3">
                        <label className="form-label">Trạng thái</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="trang_thai"
                                    value="hien"
                                    checked={trang_thai === "hien"}
                                    onChange={() => setTrangThai("hien")}
                                />
                                <label className="form-check-label">Hiện</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="trang_thai"
                                    value="an"
                                    checked={trang_thai === "an"}
                                    onChange={() => setTrangThai("an")}
                                />
                                <label className="form-check-label">Ẩn</label>
                            </div>
                        </div>
                    </div>

                    {/* Phân loại */}
                    <div className="mb-3">
                        <label htmlFor="phanLoai" className="form-label">
                            Phân loại
                        </label>
                        <select
                            className="form-select"
                            id="phanLoai"
                            value={phanloai}
                            onChange={(e) => {
                                setPhanLoai(e.target.value);
                                setChiTiet("");
                            }}
                        >
                            <option value="" disabled>
                                Chọn phân loại
                            </option>
                            <option value="1">Đồ ăn</option>
                            <option value="2">Đồ uống</option>
                            <option value="3">Tráng miệng</option>
                        </select>
                    </div>

                    {/* Chi tiết phân loại */}
                    {phanloai && (
                        <div className="mb-3">
                            <label className="form-label">Chi tiết phân loại</label>
                            <select
                                className="form-select"
                                value={chi_tiet_phan_loai}
                                onChange={(e) => setChiTiet(e.target.value)}
                            >
                                <option value="" disabled>
                                    Chọn chi tiết
                                </option>
                                {chiTietOptions[phanloai].map((ct, idx) => (
                                    <option key={idx} value={ct}>
                                        {ct}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Add sản phẩm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;