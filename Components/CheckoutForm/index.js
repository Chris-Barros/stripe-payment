import React, { useState, useEffect } from "react";

import { loading } from "../../redux/action/cart.js";

import axios from "axios";
import { connect } from "react-redux";
import Field from "../Field/";
import Item from "../Item/";
import Loading from "../Loading/";

import styles from "./styles.module.css";
import styled from "@emotion/styled";
import {
  PaymentRequestButtonElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import anime from "animejs/lib/anime.es/";

import Button from "../Button";
import store from "../../redux/store";
import { getCart } from "../../redux/action/cart";

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#fff",
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: { color: "#ffc7ee", iconColor: "#ffc7ee" },
  },
  hidePostalCode: true,
};

const CheckoutForm = (props) => {
  const btnAnimation = React.useRef(null);
  const [isProcessing, setProcessingTo] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  React.useEffect(() => {
    btnAnimation.current = anime({
      targets: ".animateSubmutBtn",
      duration: 1000,
      translateX: 950,

      easing: "easeInOutSine",
      loop: false,
    });
  }, []);

  const validateInput = () => {
    setProcessingTo(true);

    store.dispatch(loading(true));
    props.validate((status) => {
      if (!status) {
        console.log("initiating payment intent", status);
        handlePaymentIntent();
      } else {
        setProcessingTo(false);
        store.dispatch(loading(false));
        console.log("cant initiating payment intent", status);
      }
    });
  };
  const handlePaymentIntent = async (ev) => {
    const billingDetails = {
      name: props.BillingInfo.Name,
      email: props.BillingInfo.Email,
      phone: props.BillingInfo.Phone,
      address: {
        city: props.BillingInfo.City,
        line1: props.BillingInfo.Address,
        state: props.BillingInfo.State,
        postal_code: props.BillingInfo.Zip,
      },
    };
    try {
      console.log("after intent", props)
      const { data: clientSecret } = await axios.post(
        "/api/payment_intents",
        props.cart
        
      );
      

      const cardElement = elements.getElement(CardElement);

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      const confirmCardPayment = await stripe.confirmCardPayment(
        String(clientSecret),
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );

      stripe
        .retrievePaymentIntent(String(clientSecret))
        .then(function (result) {
          if (result.error) {
            store.dispatch(loading(false));
            console.log("payment intent secret was invalid");
            // PaymentIntent client secret was invalid
          } else {
            if (result.paymentIntent.status === "succeeded") {
              store.dispatch(loading(false));
              console.log("payment was successfull");
              props.onSuccessfulCheckout();
              // Show your customer that the payment has succeeded
            } else if (
              result.paymentIntent.status === "requires_payment_method"
            ) {
              store.dispatch(loading(false));
              console.log("payment method failed...");
              // Authentication failed, prompt the customer to enter another payment method
            }
          }
        });
    } catch (err) {
      console.log("error in confirmCardPayment  catch block", err);
      const values = {
        title: "An error has occued!",
        message:
          "Make sure your payment information is accurate, and then try again",
      };
      props.openModal(values);
      store.dispatch(loading(false));
      setProcessingTo(true);
    }
  };

  console.log("props", props);
  return (
    <div className={styles.formContainer}>
      <div className={styles.itemContainer}>
        {props.allItems
          ? Object.keys(props.allItems).map((id) => (
              <Item
                key={id}
                item={props.allItems[id]}
                src="./svg/mysteryBox.svg"
              />
            ))
          : null}
      </div>
      <div className={styles.billingContainer}>
        {Object.keys(props.BillingFields).map((id) => (
          <Field
            key={id}
            label={props.BillingFields[id].label}
            name={props.BillingFields[id].name}
            placeholder={props.BillingFields[id].placeholder}
            type={props.BillingFields[id].type}
            value={props.BillingInfo[id]}
            onChange={props.handleChange}
            error={props.errors[id]}
          />
        ))}
      </div>

      <div className={styles.cardContainer}>
        <CardElementContainer>
          <CardElement options={cardElementOptions} />
        </CardElementContainer>
      </div>
      <div>
        <Button
          value={`pay $ ${props.cost ? props.cost : 0} `}
          type={"submit"}
          className={`${styles.submitBtn} ${
            isProcessing ? "animateSubmutBtn" : null
          }`}
          onClick={validateInput}
          disabled={isProcessing}
        />
      </div>
      {props.loading ? <Loading /> : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

// const mapDispatchToProps = {
//   getCart,
// };

export default connect(mapStateToProps, null)(CheckoutForm);
