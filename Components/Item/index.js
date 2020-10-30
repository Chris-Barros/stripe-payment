import React from "react";

import store from "../../redux/store";
import {
  removeItemFromCart,
  addItemToCart,
  loading,
} from "../../redux/action/cart.js";
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
      store.dispatch(addItemToCart(this.props.item));
      store.dispatch(loading());
    } else {
      store.dispatch(loading());
      store.dispatch(removeItemFromCart(this.props.item));
      store.dispatch(loading());
    }
  };
  render() {
    const { name, count, cost } = this.props.item;

    return (
      <div className={styles.itemContainer}>
        {name ? <div>{name}</div> : null}
        {this.props.src ? (
          <div>
            <img className={styles.img} src={this.props.src} alt="m" />
            <div>{`${cost}$`}</div>
          </div>
        ) : null}
        <div className={styles.ButtonContainer}>
          <Button
            value="-"
            onClick={() => this.addOrRemove("remove")}
            disabled={this.props.loading}
          />
          <div>{count}</div>
          <Button
            value="+"
            onClick={() => this.addOrRemove("add")}
            disabled={this.props.loading}
          />
        </div>
      </div>
    );
  }
}
