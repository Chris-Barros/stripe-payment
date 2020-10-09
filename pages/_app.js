import { Provider } from "react-redux";
import store from "../redux/store";

import "../styles/globals.css";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
