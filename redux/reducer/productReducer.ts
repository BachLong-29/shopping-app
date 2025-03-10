import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product } from "@/core/model/Product";

const initialState: Product[] = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
    updateProduct: (state, action: PayloadAction<Partial<Product>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
