import React, { useState } from "react";

import Fields from "../Fields/index.jsx";
import BoxView from "../BoxView/index.jsx";

import styles from "./styles.scss";

const App = () => {
  const [box, setBox] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [triangles, setTriangles] = useState(null);

  const onChangeField = (name, value) => {
    setBox({
      ...box,
      [name]: value,
    });
  };

  const validate = () => {
    if (box === null) return false;

    let count = 0;
    for (const value of Object.values(box)) {
      if (value > 0 && value <= 15) count++;
      else {
        return false;
      }
    }
    if (count === 3) return true;
  };

  async function setBoxSize() {
    if (!validate()) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    try {
      const response = await fetch("/box", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(box),
      });
      setTriangles(await response.json());
    } catch (e) {
      console.log("error");
    }
  }

  return (
    <div className={styles.root}>
      <Fields onChange={onChangeField} onClick={setBoxSize} isValid={isValid} />
      <BoxView triangles={triangles} />
    </div>
  );
};

export default App;
