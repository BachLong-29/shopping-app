import { call, put, takeLatest } from "redux-saga/effects";
import { fetchCartTotal, setTotal } from "../reducer/cartReducer";

import { $FixType } from "@/core/types/FixType";
import cartService from "@/app/cart/services/cartServices";

const handleFetchTotalCart = (userId: string): Promise<$FixType> => {
  return cartService.getTotal(userId);
};

function* handleFetchCart(action: {
  type: string;
  payload: { userId: string };
}) {
  try {
    const { userId } = action.payload;
    const response: Response = yield call(handleFetchTotalCart, userId);
    yield put(setTotal(response as $FixType));
  } catch (error) {
    console.error({ error });
    yield put(
      setTotal({
        total: 0,
        productIds: [],
      })
    );
  }
}

export function* watchCartSaga() {
  yield takeLatest(fetchCartTotal.type, handleFetchCart);
}
