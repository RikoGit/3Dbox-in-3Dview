import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./styles.scss";

const BoxView = ({ triangles }) => {
  const canvasRef = useRef(null);

  console.log(triangles);
  useEffect(() => {
    if (triangles) {
      const canvas = canvasRef.current;
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(
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
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0.5, 2, 0);
        scene.add(light);
      }

      var renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setClearColor(new THREE.Color(0x545454));

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();

      const geometry = new THREE.Geometry();

      geometry.vertices = [];

      triangles.vertices.map((vertice) =>
        geometry.vertices.push(new THREE.Vector3(...vertice.split(",")))
      );

      /*geometry.vertices.push(
      new THREE.Vector3(-1, -1, 1), // 0
      new THREE.Vector3(1, -1, 1), // 1
      new THREE.Vector3(-1, 1, 1), // 2
      new THREE.Vector3(1, 1, 1), // 3
      new THREE.Vector3(-1, -1, -1), // 4
      new THREE.Vector3(1, -1, -1), // 5
      new THREE.Vector3(-1, 1, -1), // 6
      new THREE.Vector3(1, 1, -1) // 7
    );*/

      /*      geometry.faces = [];

      triangles.faces.map((face) =>
        geometry.faces.push(new THREE.Face3(...face.split(",")))
      );
*/
      geometry.faces.push(
        // front
        new THREE.Face3(0, 3, 2),
        new THREE.Face3(0, 1, 3),
        // right
        new THREE.Face3(1, 7, 3),
        new THREE.Face3(1, 5, 7),
        // back
        new THREE.Face3(5, 6, 7),
        new THREE.Face3(5, 4, 6),
        // left
        new THREE.Face3(4, 2, 6),
        new THREE.Face3(4, 0, 2),
        // top
        new THREE.Face3(2, 7, 6),
        new THREE.Face3(2, 3, 7),
        // bottom
        new THREE.Face3(4, 1, 0),
        new THREE.Face3(4, 5, 1)
      );

      geometry.computeFaceNormals();

      const material = new THREE.MeshPhongMaterial({ color: 0x828282 });
      //const material = new THREE.MeshBasicMaterial({ color: 0x828282 });

      const cube = new THREE.Mesh(geometry, material);
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
