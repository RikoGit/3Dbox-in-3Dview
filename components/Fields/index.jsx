import React from "react";

import styles from "./styles.scss";

const Fields = ({ onChange, onClick }) => (
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
    <button type="button" onClick={onClick} className={styles.button}>
      Display 3D box in 3D view
    </button>
  </div>
);

export default Fields;
