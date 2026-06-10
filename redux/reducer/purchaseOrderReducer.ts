import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { PurchaseOrder } from "@/core/model/PO";

const initialState: {
  data: PurchaseOrder[];
  total: number;
} = {
  data: [],
  total: 0,
};

const purchaseOrderSlice = createSlice({
  name: "purchase-order",
  initialState,
  reducers: {
    setPOList: (
      state,
      action: PayloadAction<{ data: PurchaseOrder[]; total: number }>
    ) => {
      return action.payload;
    },
    createPurchaseOrder: (state, action: PayloadAction<PurchaseOrder>) => {
      return { data: [action.payload, ...state.data], total: state.total + 1 };
    },
    deletePurchaseOrder: (state, action: PayloadAction<string>) => {
      return {
        data: state.data.filter((item) => item._id !== action.payload),
        total: state.total - 1,
      };
    },
    editPurchaseOrder: (state, action: PayloadAction<PurchaseOrder>) => {
      return {
        data: state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        total: state.total,
      };
    },
  },
});

export const {
  setPOList,
  createPurchaseOrder,
  deletePurchaseOrder,
  editPurchaseOrder,
} = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
