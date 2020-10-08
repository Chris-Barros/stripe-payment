import React from "react";

import styles from "./styles.module.css";

const Button = ({ image, className, label, value, onClick }) => {
  return (
    <div>
      {label ? <div>{label}</div> : null}
      <button
        onClick={onClick}
        src={image ? image : null}
        className={styles.btn}
      >
        {value ? value : null}
      </button>
    </div>
  );
};

export default Button;
