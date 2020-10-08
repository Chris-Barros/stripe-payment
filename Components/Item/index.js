import React from "react";

import store from "../../redux/store";
import { removeItem, addItem, loading } from "../../redux/action/cart.js";
import Button from "../Button/";

import styles from "./styles.module.css";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addOrRemove = (type) => {
    if (type === "add") {
      store.dispatch(loading());
      store.dispatch(addItem(this.props.itemData));
      store.dispatch(loading());
    } else {
      store.dispatch(loading());
      store.dispatch(removeItem(this.props.itemData));
      store.dispatch(loading());
    }
  };
  render() {
    const { name, count } = this.props.itemData;

    return (
      <div>
        {name ? <div>{name}</div> : null}
        {/*this.props.src ? <img src="./img/doughnut.jpeg" alt="" /> : null*/}
        {this.props.src ? (
          <img className={styles.img} src="./svg/mysteryBox.svg" alt="m"></img>
        ) : null}
        <div className={styles.ButtonContainer}>
          <Button value="-" onClick={() => this.addOrRemove("remove")} />
          <div>{count}</div>
          <Button value="+" onClick={() => this.addOrRemove("add")} />
        </div>
      </div>
    );
  }
}
