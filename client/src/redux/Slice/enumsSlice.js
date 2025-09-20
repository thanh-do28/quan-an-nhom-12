import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

// Lấy danh sách sản phẩm
export const fetchEnums = createAsyncThunk(
    "enums/fetch",
    async () => {
        const response = await axios.get(`${API_BASE}/enums`);
        return response.data;
    }
);


const enumsSlice = createSlice({
    name: "enums",
    initialState: {
        enumList: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchEnums.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEnums.fulfilled, (state, action) => {
                state.loading = false;
                state.enumList = action.payload;
            })
            .addCase(fetchEnums.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default enumsSlice.reducer;