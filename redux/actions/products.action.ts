/* eslint-disable @typescript-eslint/no-explicit-any */
export const addProductRedux = (payload: any) => {
  return { type: "Add", payload: payload };
};
export const removeProductRedux = (id: string) => {
  return { type: "Remove", payload: { id } };
};

export const editProductRedux = (data: any) => {
  return { type: "Edit", payload: { data } };
};

export const getAllProduct = () => {
  return { type: "Get all" };
};
