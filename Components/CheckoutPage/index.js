import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/";
import styles from "./styles.module.css";

const stripePromise = loadStripe("");

export default class checkoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        count: 0,
        cost: 2.33,
        // src: doughnut,
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
  validateInput = () => {
    let Errors = {};
    console.log("validating");
    const { BillingInfo, errors } = this.state;
    Object.keys(BillingInfo).map((name) => {
      if (!BillingInfo[name]) {
        Errors[name] = `${name} is required`;
      }
    });
    this.setState({ errors: Errors }, () =>
      console.log("errors", this.state.errors)
    );
  };

  handleChange = (e) => {
    const { BillingInfo } = this.state;
    this.setState({
      BillingInfo: { ...BillingInfo, [e.target.name]: e.target.value },
    });
  };

  render() {
    const { BillingInfo, BillingFields, itemData, errors } = this.state;
    return (
      <div className={styles.pageContainer}>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            BillingInfo={BillingInfo}
            BillingFields={BillingFields}
            itemData={itemData}
            handleChange={this.handleChange}
            errors={errors}
            validate={this.validateInput}
          />
        </Elements>
      </div>
    );
  }
}
