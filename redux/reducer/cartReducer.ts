import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CartState = {
  total: number;
  productIds: string[];
};

const initialState: CartState = {
  total: 0,
  productIds: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotal: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    addToCart: (state, action: PayloadAction<string>) => {
      const isExisted = state.productIds.includes(action.payload);
      return {
        total: isExisted ? state.total : state.total + 1,
        productIds: isExisted
          ? state.productIds
          : [...state.productIds, action.payload],
      };
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const newProductIds = state.productIds.filter(
        (productId) => productId !== action.payload
      );
      return {
        total: state.total - 1,
        productIds: newProductIds,
      };
    },
  },
});

export const { setTotal, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
