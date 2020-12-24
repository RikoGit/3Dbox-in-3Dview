import React from "react";

import Invalid from "../Invalid/index.jsx";
import styles from "./styles.scss";

const Fields = ({ onChange, onClick, isValid }) => (
  <div className={styles.root}>
    <label className={styles.label}>
      Width
      <input
        className={styles.input}
        type="number"
        min="1"
        max="15"
        onChange={(event) => {
          onChange("width", Number(event.target.value));
        }}
      />
      <span className={styles.text}>от 1 до 15</span>
    </label>
    <label className={styles.label}>
      Height
      <input
        className={styles.input}
        type="number"
        min="1"
        max="15"
        onChange={(event) => {
          onChange("height", Number(event.target.value));
        }}
      />
      <span className={styles.text}>от 1 до 15</span>
    </label>
    <label className={styles.label}>
      Length
      <input
        className={styles.input}
        type="number"
        min="1"
        max="15"
        onChange={(event) => {
          onChange("length", Number(event.target.value));
        }}
      />
      <span className={styles.text}>от 1 до 15</span>
    </label>
    <div className={styles.valid}>
      {!isValid && <Invalid />}
      <button type="button" onClick={onClick} className={styles.button}>
        Display
      </button>
    </div>
  </div>
);

export default Fields;
