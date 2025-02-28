/* eslint-disable @typescript-eslint/no-explicit-any */

import { cloneDeep } from "lodash";

const initialState: any[] = [];
const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "ADD_STUDENT":
      return state.concat(action.payload);
    case "REMOVE_STUDENT":
      return state.filter((item: any) => item.id !== action.payload.id);
    case "EDIT_STUDENT":
      const cloneData = cloneDeep(state);
      return cloneData.map((item: any) => {
        if (item.id === action.payload.data.studentId) {
          return {
            id: item.id,
            ...action.payload.data.data,
          };
        }
        return item;
      });
    default:
      return state;
  }
};

export default reducer;
