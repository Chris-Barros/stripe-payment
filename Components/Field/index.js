import React from "react";

import styles from "./styles.module.css";

const feilds = ({
  name,
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={`${styles.FieldContainer}`}>
      <label className={styles.label}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={styles.input}
      />

      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};

export default feilds;
