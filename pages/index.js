// import { Provider } from "react-redux";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Router from "next/router";

// import store from "../redux/store";

import CheckoutPage from "../Components/CheckoutPage";

export default function Home(e) {
  return (
    <CheckoutPage onSuccessfulCheckout={() => Router.push("/Successful")} />
  );
}
