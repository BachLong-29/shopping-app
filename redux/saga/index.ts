import { testSaga } from "./testSaga";

export const initSagas = (sagaMiddleware) => {
  Object.values(testSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
