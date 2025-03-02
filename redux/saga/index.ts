import { testSaga } from "./testSaga";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initSagas = (sagaMiddleware: any) => {
  Object.values(testSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
