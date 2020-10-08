let cartState = {
  items: {},
  totalItems: 0,
  cost: 0,
  loading: false,
};

const cartReducer = (state = cartState, { type, payload }) => {
  let tempState;
  switch (type) {
    case "ADD_ITEM":
      tempState = { ...state };

      if (!tempState.items[payload.Item.id]) {
        tempState.items[payload.Item.id] = payload.Item;
      }
      tempState.items[payload.Item.id].count += 1;

      tempState.cost += payload.Item.cost;
      tempState.totalItems = tempState.totalItems + 1;
      console.log("reducer", tempState);
      return tempState;
    case "REMOVE_ITEM":
      tempState = { ...state };
      if (tempState.items[payload.Item.id]) {
        tempState.items[payload.Item.id].count -= 1;
        if (tempState.items[payload.Item.id].count < 1) {
          delete tempState.items[payload.Item.id];
        }
        tempState.cost -= payload.Item.cost;
        tempState.totalItems = tempState.totalItems - 1;
        console.log("reducer", tempState);
      }

      return tempState;
    case "GET_CART":
      tempState = { ...state };
      return tempState;
    case "LOADING":
      tempState = { ...state };
      tempState.loading = !tempState.loading;
      return tempState;
  }
};

export default cartReducer;
