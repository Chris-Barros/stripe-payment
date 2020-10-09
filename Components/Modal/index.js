import React from "react";

import styles from "./styles.module.css";

const Modal = ({ closeModal, title, message }) => {
  return (
    <div
      className={styles.Modal}
      onClick={() => {
        closeModal();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.Container} ${styles.grounds}`}
      >
        <div className={styles.titleContainer}>
          <img src="/svg/alert.svg" className={styles.img} />{" "}
          <div>{title ? title : "We are sorry :("}</div>
          <button onClick={closeModal}>x</button>
        </div>

        <div className={styles.content}>
          {message
            ? message
            : "an error has occured. please refresh the page and try again "}
        </div>
      </div>
    </div>
  );
};

export default Modal;
