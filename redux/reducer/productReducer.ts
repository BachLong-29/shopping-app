import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product } from "@/core/model/Product";

const initialState: {
  data: Product[];
  total: number;
} = {
  data: [],
  total: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (
      state,
      action: PayloadAction<{
        data: Product[];
        total: number;
      }>
    ) => {
      return action.payload;
    },
    updateProduct: (state, action: PayloadAction<Partial<Product>>) => {
      return { ...state, ...action.payload };
    },
    createProduct: (state, action: PayloadAction<Product>) => {
      return { data: [action.payload, ...state.data], total: state.total + 1 };
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const newData = state.data.filter((item) => item._id !== action.payload);
      return { data: newData, total: state.total - 1 };
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const newData = state.data.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      return { data: newData, total: state.total };
    },
  },
});

export const { setProduct, updateProduct, createProduct, deleteProduct } =
  productSlice.actions;
export default productSlice.reducer;
