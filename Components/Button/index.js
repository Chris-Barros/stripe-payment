import React from "react";

import styles from "./styles.module.css";

const Button = ({
  image,
  className,
  label,
  value,
  onClick,
  disabled,
  type,
}) => {
  return (
    <div>
      {label ? <div>{label}</div> : null}
      <button
        onClick={onClick}
        src={image}
        className={`${styles.btn} ${className}`}
        disabled={disabled}
      >
        {value ? value : null}
      </button>
    </div>
  );
};

export default Button;
