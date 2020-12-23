import React, { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  WebGLRenderer,
  Geometry,
  Vector3,
  Face3,
  FaceColors,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./styles.scss";

const BoxView = ({ triangles }) => {
  const canvasRef = useRef(null);

  console.log(triangles);
  useEffect(() => {
    if (triangles) {
      const canvas = canvasRef.current;
      var scene = new Scene();
      var camera = new PerspectiveCamera(
        75,
        canvas.width / canvas.height,
        0.1,
        100
      );
      camera.position.z = 30;
      camera.position.x = 30;
      camera.position.y = 10;

      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new DirectionalLight(color, intensity);
        light.position.set(0.5, 2, 0);
        scene.add(light);
      }

      var renderer = new WebGLRenderer({ canvas, alpha: true });
      //renderer.setClearColor(new THREE.Color(0x545454));

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();

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

      //const material = new THREE.MeshPhongMaterial({ color: 0x828282 });
      const material = new MeshBasicMaterial({
        vertexColors: FaceColors,
      });

      const cube = new Mesh(geometry, material);
      scene.add(cube);

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      function render(time) {
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();
      }

      requestAnimationFrame(render);
      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
    }
  }, [triangles]);

  return (
    <>
      <div className="preview">
        <canvas id="canvas" width="400" height="500" ref={canvasRef}>
          Браузер не поддерживает Canvas
        </canvas>
      </div>
    </>
  );
};

export default BoxView;
