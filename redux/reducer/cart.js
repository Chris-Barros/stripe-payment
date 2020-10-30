let cartState = {
  allItems: {},
  totalItems: 0,
  cart: {},
  cost: 0,
  loading: false,
};

const cartReducer = (state = cartState, { type, payload }) => {
  let tempState = { ...state };
  switch (type) {

    case "ADD_ITEMS":
      tempState.allItems = payload.Item;
      return tempState;

    case "ADD_ITEM_TO_CART":
      payload.Item.count += 1;
      tempState.cart[payload.Item.id] = payload.Item;
      tempState.cost += payload.Item.cost;
      tempState.totalItems += 1;
      return tempState;

    case "REMOVE_ITEM_FROM_CART":
      if (payload.Item.count >= 1) {
        payload.Item.count -= 1;
        tempState.cart[payload.Item.id] = payload.Item;
        tempState.cost -= payload.Item.cost;
        tempState.totalItems -= 1;
        if (payload.Item.count === 0) {
          delete tempState.cart[payload.Item.id];
        }
      }
      return tempState;

    case "GET_CART":
      return tempState;
      
    case "LOADING":
      tempState.loading = payload.Item;
      return tempState;
  }
};

export default cartReducer;
