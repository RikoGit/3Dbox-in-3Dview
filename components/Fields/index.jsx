import React from "react";

import styles from "./styles.scss";

const Fields = ({ onChange, onClick }) => (
  <div className={styles.root}>
    <input
      className={styles.input}
      type="text"
      placeholder="length"
      onChange={(event) => {
        onChange("length", event.target.value);
      }}
    />
    <input
      className={styles.input}
      type="text"
      placeholder="width"
      onChange={(event) => {
        onChange("width", event.target.value);
      }}
    />
    <input
      className={styles.input}
      type="text"
      placeholder="height"
      onChange={(event) => {
        onChange("height", event.target.value);
      }}
    />
    <button type="button" onClick={onClick}>
      Display 3D box in 3D view
    </button>
  </div>
);

export default Fields;
