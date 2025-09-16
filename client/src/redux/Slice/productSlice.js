// src/redux/Slice/productSlice.js
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

// Lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async () => {
        const response = await axios.get(`${API_BASE}/alllistproducts`);
        return response.data;
    }
);

// lấy 6 sản phẩm nổi bật
export const fetchProduct = createAsyncThunk(
    "product/fetch",
    async () => {
        const response = await axios.get(`${API_BASE}/topproducts`);
        return response.data;
    }
)


// Thêm sản phẩm mới
export const addProduct = createAsyncThunk(
    "products/add",
    async (newProduct) => {
        // console.log(newProduct);
        const response = await axios.post(`${API_BASE}/addproducts`, newProduct, {
            headers: {"Content-Type": "multipart/form-data"},
        });
        return response.data;
    }
);


// sửa sản phẩm
export const editProduct = createAsyncThunk(
    "products/edit",
    async ({id, updatedProduct}) => {
        // console.log(Array.from(updatedProduct.entries()));
        const response = await axios.put(`${API_BASE}/editproduct/${id}`, updatedProduct, {
                headers: {"Content-Type": "multipart/form-data"},
            }
        );
        return response.data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // fetchProduct
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // addProduct
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                // state.list.push(action.payload.data); // thêm sản phẩm vừa tạo vào state
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // editProduct
            .addCase(editProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                // state.list.push(action.payload.data); // thêm sản phẩm vừa tạo vào state
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    },
});

export default productSlice.reducer;
