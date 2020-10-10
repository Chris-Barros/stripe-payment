import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getCart } from "../../redux/action/cart";
import store from "../../redux/store";
import CheckoutForm from "../CheckoutForm/";
import Modal from "../Modal/";

import styles from "./styles.module.css";

const stripePromise = loadStripe("");

export default class checkoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: { isOpen: false, title: "", message: "" },
      errors: {},
      BillingInfo: {
        Name: "",
        Email: "",
        Address: "",
        City: "",
        State: "",
        Phone: "",
        Zip: "",
      },
      itemData: {
        id: 123,
        name: "Mystery Box!!",
        count: 1,
        cost: 2.33,
      },

      BillingFields: {
        Name: {
          name: "Name",
          label: "Name:",
          type: "text",
          placeholder: "Jane Doe",
          required: true,
        },
        Email: {
          name: "Email",
          label: "Email:",
          type: "text",
          placeholder: "example@example.com",
          required: true,
        },
        Address: {
          name: "Address",
          label: "Address:",
          type: "text",
          placeholder: "123 sessamie st",
          required: true,
        },
        City: {
          name: "City",
          label: "City:",
          type: "text",
          placeholder: "Los Angeles",
          required: true,
        },
        State: {
          name: "State",
          label: "State:",
          type: "text",
          placeholder: "LA",
          required: true,
        },
        Phone: {
          name: "Phone",
          label: "Phone:",
          type: "number",
          placeholder: "1234567890",
          required: true,
        },
        Zip: {
          name: "Zip",
          label: "Zip:",
          type: "text",
          placeholder: "Jane Doe",
          required: true,
        },
      },
    };
  }
  componentDidMount() {
    store.dispatch(getCart());
  }
  validateInput = (callback) => {
    let Errors = {};

    console.log("validating");
    const { BillingInfo, errors } = this.state;
    Object.keys(BillingInfo).map((name) => {
      if (!BillingInfo[name]) {
        Errors[name] = `${name} is required`;
      }
    });
    this.setState({ errors: Errors }, () => {
      if (Object.keys(this.state.errors).length !== 0) {
        callback(true);
      } else callback(false);
    });
  };
  handleOpenModal = (values) => {
    this.setState(
      { modal: { title: values.title, message: values.message } },
      () => this.setState({ modal: { ...this.state.modal, isOpen: true } })
    );
  };
  handleCloseModal = () => {
    this.setState({ modal: { isOpen: false } });
  };
  handleChange = (e) => {
    const { BillingInfo } = this.state;
    this.setState({
      BillingInfo: { ...BillingInfo, [e.target.name]: e.target.value },
    });
  };

  render() {
    const { modal, BillingInfo, BillingFields, itemData, errors } = this.state;
    return (
      <div className={styles.pageContainer}>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            BillingInfo={BillingInfo}
            BillingFields={BillingFields}
            itemData={itemData}
            handleChange={this.handleChange}
            errors={Object.keys(errors).length !== 0 ? errors : false}
            validate={this.validateInput}
            onSuccessfulCheckout={this.props.onSuccessfulCheckout}
            openModal={this.handleOpenModal}
          />
        </Elements>
        {modal.isOpen ? (
          <Modal
            title={modal.title}
            message={modal.message}
            closeModal={this.handleCloseModal}
          />
        ) : null}
      </div>
    );
  }
}
