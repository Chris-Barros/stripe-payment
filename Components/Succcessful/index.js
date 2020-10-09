import React from "react";
import anime from "animejs/lib/anime.es/";
import styles from "./styles.module.css";
import Confetti from "react-confetti";
import { random } from "animejs";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const Successful = (props) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });
  const length = 30;

  const animationRef = React.useRef(null);
  React.useEffect(() => {
    animationRef.current = anime({
      targets: ".animate",
      duration: 7000,
      translateY: function () {
        return anime.random(-1000, 1000);
      },
      translateX: function () {
        return anime.random(-1000, 1000);
      },
      delay: function (el, i) {
        return i * 100;
      },
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });
  }, []);
  console.log("sucessfull props", props);
  return (
    <div className={styles.container}>
      <div className={styles.confetti}>
        <Confetti width={width} height={height} numberOfPieces={450} />
      </div>
      <div className={styles.centerContent}>
        <div className={styles.textContainer}>
          <div className={styles.text}>Congradulations.....</div>
          <div className={styles.text}>
            you've successfully made a purchase !
          </div>
          <div className={styles.text}>{`${
            props.count ? props.count : 0
          } Mystery Box:  ${props.cost ? props.cost : 0}$`}</div>
        </div>

        <div className={styles.animationContainer}>
          {Array.from(Array(length)).map((index, x) => (
            <div
              key={String(index) + String(x)}
              className={`${styles.candleContainer} `}
            >
              {Array.from(Array(length)).map((i, y) => (
                <div
                  key={+String(index) + String(x) + String(i) + String(y)}
                  className={`${styles.white} ${styles.animate} animate`}
                />
              ))}
            </div>
          ))}
          <img src="/svg/fish.svg" alt="fish" className={styles.fishimg} />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, null)(Successful);
