import thunk from "redux-thunk";
import reducer from "../reducer/cart";
import { createStore, applyMiddleware } from "redux";
import { createPromise } from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = applyMiddleware(createPromise(), thunk);
const DevTools = composeWithDevTools(middleware);

export default createStore(reducer, DevTools);
