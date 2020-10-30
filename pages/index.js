
import Router from "next/router";

import CheckoutPage from "../Components/CheckoutPage";

export default function Home(e) {
  return (
    <CheckoutPage onSuccessfulCheckout={() => Router.push("/Successful")} />
  );
}
