import React from "react";

import styles from "./styles.module.css";

const Loading = (props) => {
  return (
    <div className={`${styles.Loading} ${props.className}`}>
      <img className={styles.LoadingIcon} alt="" src="./svg/Loading.svg" />
    </div>
  );
};

export default Loading;

// <img className={styles.LoadingIcon} src={Load} alt="" />
