import React, {useState} from 'react';
import "./OrderPage.css"

const OrderPage = () => {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("SET");

    const categories = [
        "SET",
        "KHAI VỊ",
        "SASHIMI CÁ HỒI",
        "SASHIMI CÁ TRÍCH",
        "SASHIMI BỤNG CÁ HỒI",
        "SASHIMI BẠCH TUỘC",
        "SASHIMI SÒ ĐỎ",
        "SASHIMI CÁ TRẮNG",
        "SASHIMI SÒ ĐIỆP",
        "SASHIMI CÁ SABA NGÂM DẤM",
        "SASHIMI",
    ];

    const items = [
        {name: "Món sashimi mix A", price: 868000, img: "/images/a.jpg"},
        {name: "Món sashimi mix B", price: 658000, img: "/images/b.jpg"},
        {name: "Món sashimi mix C", price: 288000, img: "/images/c.jpg"},
        {name: "Món sashimi mix D", price: 368000, img: "/images/d.jpg"},
        {name: "Set sushi chay", price: 198000, img: "/images/e.jpg"},
        {name: "Set 288k", price: 288000, img: "/images/f.jpg"},
    ];

    const addToCart = (item) => {
        const exist = cart.find((c) => c.name === item.name);
        if (exist) {
            setCart(
                cart.map((c) =>
                    c.name === item.name ? {...c, qty: c.qty + 1} : c
                )
            );
        } else {
            setCart([...cart, {...item, qty: 1}]);
        }
    };

    const totalQty = cart.reduce((sum, c) => sum + c.qty, 0);
    const totalPrice = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

    // Tăng số lượng
    const increaseQty = (item) => {
        setCart(
            cart.map((c) =>
                c.name === item.name ? {...c, qty: c.qty + 1} : c
            )
        );
    };

    // Giảm số lượng
    const decreaseQty = (item) => {
        setCart(
            cart
                .map((c) =>
                    c.name === item.name ? {...c, qty: c.qty - 1} : c
                )
                .filter((c) => c.qty > 0) // Xóa nếu qty = 0
        );
    };
    return (
        <div>
            <div className="container-fluid order-page">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-2 bg-light sidebar">
                        <h5 className="mt-3">Thực đơn</h5>
                        <ul className="list-unstyled">
                            {categories.map((cat, index) => (
                                <li
                                    key={index}
                                    className={`py-2 ${selectedCategory === cat ? "fw-bold text-warning" : ""}`}
                                    role="button"
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Menu list */}
                    <div className="col-6">
                        <input
                            type="text"
                            placeholder="Bạn đang cần tìm món gì ?"
                            className="form-control my-3"
                        />
                        <h5>SET</h5>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center justify-content-between border-bottom py-2"
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        width="80"
                                        className="me-3 rounded"
                                    />
                                    <div>
                                        <div>{item.name}</div>
                                        <div className="text-warning fw-bold">
                                            {item.price.toLocaleString()}đ
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-outline-warning rounded-circle"
                                    onClick={() => addToCart(item)}
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Cart */}
                    <div className="col-4 bg-light p-3">
                        <h5 className="d-flex justify-content-between">
                            <span>Món bạn đã chọn</span>
                            <span role="button" className="text-danger">🗑</span>
                        </h5>

                        {cart.length === 0 ? (
                            <p className="text-muted">Không có món ăn trong giỏ hàng</p>
                        ) : (
                            <>
                                {cart.map((item, index) => (
                                    <div key={index} className="card mb-2 shadow-sm">
                                        <div className="card-body d-flex justify-content-between align-items-center">
                                            <div>
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => decreaseQty(item)}
                                                >
                                                    -
                                                </button>
                                                <span className="badge bg-light text-dark me-2">
                        {item.qty}
                      </span>
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => increaseQty(item)}
                                                >
                                                    +
                                                </button>
                                                {item.name}
                                            </div>
                                            <div className="text-end">
                      <span className="text-warning fw-bold">
                        {(item.price * item.qty).toLocaleString()}đ
                      </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="d-flex justify-content-between fw-bold border-top pt-2">
                                    <span>Thành tiền {totalQty} phần</span>
                                    <span>{totalPrice.toLocaleString()}đ</span>
                                </div>

                                <button className="btn btn-warning w-100 mt-3 text-white fw-bold">
                                    Tiếp tục
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;