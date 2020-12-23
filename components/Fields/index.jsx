import React from "react";

import styles from "./styles.scss";

const Fields = ({ onChange, onClick }) => (
  <div className={styles.root}>
    <input
      className={styles.input}
      type="number"
      min="1"
      max="15"
      placeholder="width"
      onChange={(event) => {
        onChange("width", Number(event.target.value));
      }}
    />
    <input
      className={styles.input}
      type="number"
      min="1"
      max="15"
      placeholder="height"
      onChange={(event) => {
        onChange("height", Number(event.target.value));
      }}
    />
    <input
      className={styles.input}
      type="number"
      min="1"
      max="15"
      placeholder="length"
      onChange={(event) => {
        onChange("length", Number(event.target.value));
      }}
    />
    <button type="button" onClick={onClick}>
      Display 3D box in 3D view
    </button>
  </div>
);

export default Fields;
