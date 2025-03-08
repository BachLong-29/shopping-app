import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductState {
  id: string;
  name: string;
  price: number;
}

const initialState: ProductState[] = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductState[]>) => {
      return action.payload;
    },
    updateProduct: (state, action: PayloadAction<Partial<ProductState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
