import React, { useEffect, useRef, useMemo } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Geometry,
  Vector3,
  Face3,
  FaceColors,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import styles from "./styles.scss";

const useBox = (triangles, canvas) => {
  const { camera, renderer, scene, controls, material } = useMemo(() => {
    if (!canvas) return {};

    const camera = new PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      100
    );
    camera.position.set(30, 10, 30);

    const renderer = new WebGLRenderer({ canvas, alpha: true });

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new Scene();
    const geometry = new Geometry();

    const material = new MeshBasicMaterial({
      vertexColors: FaceColors,
    });

    return { camera, renderer, scene, geometry, controls, material };
  }, [canvas]);

  useEffect(() => {
    if (!triangles) return;

    const geometry = new Geometry();
    geometry.vertices = [];
    triangles.vertices.map((vertice) =>
      geometry.vertices.push(new Vector3(...vertice))
    );

    geometry.faces = [];
    triangles.faces.map((face) => geometry.faces.push(new Face3(...face)));

    geometry.faces.forEach((face) =>
      face.color.setHex(Math.random() * 0xffffff)
    );
    geometry.computeFaceNormals();

    const cube = new Mesh(geometry, material);
    scene.add(cube);

    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
      controls.update();
    };

    requestAnimationFrame(render);
    controls.update();

    return () => {
      geometry.dispose();
      material.dispose();
      scene.remove(cube);
    };
  }, [triangles]);
};

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
