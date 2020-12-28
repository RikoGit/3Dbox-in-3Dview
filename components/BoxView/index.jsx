import React, { useRef } from "react";

import { useBox } from "../../hooks.js";
import styles from "./styles.scss";

const BoxView = ({ triangles }) => {
  const canvasRef = useRef(null);
  useBox(triangles, canvasRef.current);

  return (
    <>
      <div className={styles.preview}>
        <canvas
          id="canvas"
          className={styles.canvas}
          width="500"
          height="500"
          ref={canvasRef}
        >
          Браузер не поддерживает Canvas
        </canvas>
      </div>
    </>
  );
};

export default BoxView;
