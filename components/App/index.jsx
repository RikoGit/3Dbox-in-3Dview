import React, { useState } from "react";

import Fields from "../Fields/index.jsx";
import BoxView from "../BoxView/index.jsx";

import styles from "./styles.scss";

const App = () => {
  const [box, setBox] = useState(null);
  const [triangles, setTriangles] = useState(null);

  const onChangeField = (name, value) => {
    setBox({
      ...box,
      [name]: value,
    });
  };

  async function setBoxSize() {
    //проверку на наличие всех свойств
    console.log("post");
    console.log(box);

    try {
      let response = await fetch("/box", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(box),
      });

      console.log(response);
      setTriangles(JSON.parse(await response.json()));
      //console.log(result);
    } catch (e) {
      console.log("error"); //error
    }
  }

  //console.log(box);

  return (
    <div className={styles.root}>
      <Fields onChange={onChangeField} onClick={setBoxSize} />
      <BoxView triangles={triangles} />
    </div>
  );
};

export default App;
