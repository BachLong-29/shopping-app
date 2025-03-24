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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchCartTotal: (state, action) => {
      return { ...state };
    },
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

export const { fetchCartTotal, setTotal, addToCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
