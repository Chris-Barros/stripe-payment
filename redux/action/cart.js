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
export const loading = () => {
  return {
    type: "LOADING",
  };
};
const CartActions = {
  addItem,
  removeItem,
  getCart,
};
export default CartActions;
