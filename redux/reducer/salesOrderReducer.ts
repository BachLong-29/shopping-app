import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SalesOrder } from "@/core/model/SO";

const initialState: {
  data: SalesOrder[];
  total: number;
} = {
  data: [],
  total: 0,
};

const salesOrderSlice = createSlice({
  name: "sales-order",
  initialState,
  reducers: {
    setSOList: (
      state,
      action: PayloadAction<{
        data: SalesOrder[];
        total: number;
      }>
    ) => {
      return action.payload;
    },
    updateSOList: (state, action: PayloadAction<Partial<SalesOrder>>) => {
      return { ...state, ...action.payload };
    },
    createSalesOrder: (state, action: PayloadAction<SalesOrder>) => {
      return { data: [action.payload, ...state.data], total: state.total + 1 };
    },
    deleteSalesOrder: (state, action: PayloadAction<string>) => {
      const newData = state.data.filter((item) => item._id !== action.payload);
      return { data: newData, total: state.total - 1 };
    },
    editSalesOrder: (state, action: PayloadAction<SalesOrder>) => {
      const newData = state.data.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      return { data: newData, total: state.total };
    },
  },
});

export const {
  setSOList,
  updateSOList,
  createSalesOrder,
  deleteSalesOrder,
  editSalesOrder,
} = salesOrderSlice.actions;
export default salesOrderSlice.reducer;
