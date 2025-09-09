import React, { useState } from "react";
import { menuData } from "./menuData";
import "./ProductsPage.css";

const ProductsPage = () => {
    const [activeMenu, setActiveMenu] = useState("bento");

    return (
        <div className="container mt-4 d-flex" id="thaydoi">
            {/* Cột menu */}
            <div className="menu-list me-4">
                <div className="menu-item menu-title fw-bold mb-2">DANH SÁCH MÓN</div>
                {Object.keys(menuData).map((key) => (
                    <div
                        key={key}
                        className={`menu-item ${activeMenu === key ? "active" : ""}`}
                        onClick={() => setActiveMenu(key)}
                    >
                        {key
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())} {/* Hiển thị tên đẹp */}
                    </div>
                ))}
            </div>

            {/* Cột món ăn dạng card */}
            <div className="dish-list flex-grow-1">
                <div className="row g-3">
                    {menuData[activeMenu].length > 0 ? (
                        menuData[activeMenu].map((dish, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card">
                                    <img
                                        src={dish.img}
                                        className="card-img-top"
                                        alt={dish.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{dish.title}</h5>
                                        <p className="card-text">{dish.description}</p>
                                        <p className="text-danger fw-bold">{dish.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Chưa có món nào trong danh mục này.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
