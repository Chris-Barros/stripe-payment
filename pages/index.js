import { Provider } from "react-redux";

import store from "../redux/store";

import CheckoutPage from "../Components/CheckoutPage";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <CheckoutPage />
      </div>
    </Provider>
  );
}
