import React, {useState, useEffect} from "react";
import "./EditProductModal.css";

const EditProductModal = ({isOpen, onClose, product, onSave}) => {
    const [formData, setFormData] = useState(product || {});
    const [phan_loai, setPhanLoai] = useState("");
    const [chi_tiet_phan_loai, setChiTiet] = useState("");
    const [kich_co, setKichCo] = useState([]);
    const [trang_thai, setTrangThai] = useState("hien");
    useEffect(() => {
        setFormData(product || {});
    }, [product]);

    if (!isOpen) return null;
    // Dữ liệu chi tiết phân loại
    const chiTietOptions = {
        "1": ["Cơm", "Mì", "Lẩu"],
        "2": ["Nước ngọt", "Bia", "Rượu"],
        "3": ["Bánh ngọt", "Kem", "Trái cây"],
    };
    // Xử lý chọn kích cỡ
    const handleKichCoChange = (e) => {
        const {value, checked} = e.target;
        if (checked) {
            setKichCo([...kich_co, value]);
        } else {
            setKichCo(kich_co.filter((k) => k !== value));
        }
    };

    // sự kiện sửa input
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        // console.log(name, value, checked,type);
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // bắt sự kiện thay ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setFormData({
                ...formData,
                anh: file, // Lưu file vào state (sau này gửi API sẽ dùng FormData)
            });
        }
    };

    // đóng modal
    const handleModalClose = () => {
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("ten_mon", formData.ten_mon);
        form.append("gia", formData.gia);
        form.append("mo_ta", formData.mo_ta);
        form.append("don_vi", formData.don_vi);
        form.append("kich_co", kich_co.join(",")); // mảng -> string
        form.append("trang_thai", trang_thai);
        form.append("phan_loai", phan_loai);
        form.append("chi_tiet_phan_loai", chi_tiet_phan_loai);

        // Nếu người dùng chọn ảnh mới thì append
        if (formData.anh instanceof File) {
            form.append("anh", formData.anh);}
        for (let [key, value] of form.entries()) {
            console.log(key, ":", value);
        }
    };

    return (
        <div id='editProductModal'>
            <div className="modal-overlay">
                <div className="modal-contents">
                    <h2 className="modal-header text-center">Sửa sản phẩm</h2>
                    <form className="p-4 shadow rounded bg-light" onSubmit={handleSubmit}>
                        {/* Tên món */}
                        <div className="mb-1">
                            <label className="form-label">Tên món</label>
                            <input type="text" name="ten_mon" className="form-control" required
                                   value={formData.ten_mon || ""} onChange={handleChange}/>
                        </div>

                        {/* Ảnh */}
                            <div className="mb-1">
                                <label className="form-label">Ảnh</label>
                                <input type="file" name="anh" className="form-control" onChange={handleFileChange}/>
                                {formData.anh instanceof File ? "" : <img src={`http://localhost:8080/images/${formData.anh}`} alt="preview"/>}
                            </div>

                        <div className="d-flex">
                            {/* Giá */}
                            <div className="mb-1 me-2">
                                <label className="form-label">Giá</label>
                                <input type="number" name="gia" className="form-control" required
                                       value={formData.gia || ""} onChange={handleChange}/>
                            </div>
                            {/* Đơn vị */}
                            <div className="mb-1 me-2">
                                <label className="form-label">Đơn vị</label>
                                <input type="text" name="don_vi" className="form-control" value={formData.don_vi || ""}
                                       onChange={handleChange}/>
                            </div>
                            {/* Kích cỡ */}
                            <div className="mb-1 me-2">
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
                            <div className="mb-1">
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
                        </div>


                        {/* Mô tả */}
                        <div className="mb-1">
                            <label className="form-label">Mô tả</label>
                            <textarea name="mo_ta" className="form-control" rows="3" value={formData.mo_ta || ""}
                                      onChange={handleChange}></textarea>
                        </div>

                        {/* Phân loại */}
                        <div className="mb-1">
                            <label htmlFor="phanLoai" className="form-label">
                                Phân loại
                            </label>
                            <select
                                className="form-select"
                                id="phanLoai"
                                value={phan_loai}
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
                        {phan_loai && (
                            <div className="mb-1">
                                <label className="form-label">Chi tiết phân loại</label>
                                <select
                                    className="form-select"
                                    value={chi_tiet_phan_loai}
                                    onChange={(e) => setChiTiet(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Chọn chi tiết
                                    </option>
                                    {chiTietOptions[phan_loai].map((ct, idx) => (
                                        <option key={idx} value={ct}>
                                            {ct}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Button */}
                        <div className="d-flex">
                            <button type="" className="btn btn-primary w-100 me-2" onClick={handleModalClose}>
                                Đóng
                            </button>
                            <button type="submit" className="btn btn-primary w-100 ms-2">
                                Edit sản phẩm
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
// <button type="button" className="btn-close" onClick={onClose}>Đóng</button>