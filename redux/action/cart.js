export const addItem = (item) => {
  return {
    type: "ADD_ITEM",
    payload: { Item: item },
  };
};

export const removeItem = (item) => {
  return {
    type: "REMOVE_ITEM",
    payload: { Item: item },
  };
};
export const getCart = (item) => {
  return {
    type: "GET_CART",
    payload: { Item: item },
  };
};
export const loading = (item) => {
  return {
    type: "LOADING",
    payload: { Item: item },
  };
};
const CartActions = {
  addItem,
  removeItem,
  getCart,
};
export default CartActions;
