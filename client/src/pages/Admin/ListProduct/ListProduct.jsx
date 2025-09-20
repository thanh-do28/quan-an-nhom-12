import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import * as productSlice from "../../../redux/Slice/productSlice";

import EditProductModal from "./EditProductModal";
import "./ListProduct.css"

const ListProduct = () => {
    const {list, loading, error, searchList} = useSelector((state) => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const dispatch = useDispatch();

    const displayList = searchKeyword.trim() ? searchList : list;

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchKeyword(value); // cập nhật input ngay

        if (value.trim() !== "") {
            dispatch(productSlice.searchProducts(value)); // gọi API tìm kiếm ngay
        } else {
            dispatch({ type: "products/clearSearch" }); // reset nếu input rỗng
        }
    };



    // Hàm sửa
    const onEdit = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        // console.log(isModalOpen);
    };

    // Hàm xoá
    const onDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            dispatch(productSlice.deleteProduct(id));
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div id="list-product">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>

                {/* Realtime Search */}
                <div className="mb-4 flex gap-2">
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        placeholder="Nhập tên sản phẩm..."
                        className="border border-gray-300 px-2 py-1 rounded"
                    />
                </div>

                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Id</th>
                        <th className="border border-gray-300 px-4 py-2">Tên món</th>
                        <th className="border border-gray-300 px-4 py-2">Ảnh</th>
                        <th className="border border-gray-300 px-4 py-2">Giá</th>
                        <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                        <th className="border border-gray-300 px-4 py-2">Đơn vị</th>
                        <th className="border border-gray-300 px-4 py-2">Kích cỡ</th>
                        <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                        <th className="border border-gray-300 px-4 py-2">Phân loại</th>
                        <th className="border border-gray-300 px-4 py-2">Chi tiết phân loại</th>
                        <th className="border border-gray-300 px-4 py-2">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayList && displayList.length > 0 ? (
                        displayList.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.ten_mon}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img
                                        src={`http://localhost:8080/images/${item.anh}`}
                                        alt={item.ten_mon}
                                        className="w-16 h-16 object-cover"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{item.gia}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.mo_ta}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.don_vi}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.kich_co}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.trang_thai}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.phan_loai}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.chi_tiet_phan_loai}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        className="btn btn-primary "
                                        onClick={() => onEdit(item)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-primary "
                                        onClick={() => onDelete(item.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center py-4">
                                Không có sản phẩm nào
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <EditProductModal
                    isOpen={isModalOpen}
                    product={selectedProduct}
                    onClose={() => setIsModalOpen(false)}  // để đóng modal
                />
            )}
        </div>
    );
};

export default ListProduct;

