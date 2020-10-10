export const addItems = (item) => {
  return {
    type: "ADD_ITEMS",
    payload: { Item: item },
  };
};
export const addItemToCart = (item) => {
  return {
    type: "ADD_ITEM_TO_CART",
    payload: { Item: item },
  };
};

export const removeItemFromCart = (item) => {
  return {
    type: "REMOVE_ITEM_FROM_CART",
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
  addItems,
  addItemToCart,
  removeItemFromCart,
  getCart,
  loading,
};
export default CartActions;
