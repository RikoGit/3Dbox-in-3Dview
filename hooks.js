import { useEffect, useMemo } from "react";
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

export const useBox = (triangles, canvas) => {
  const { camera, renderer, scene, controls, material } = useMemo(() => {
    if (!canvas) return {};

    const cameraBox = new PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      100
    );
    cameraBox.position.set(30, 10, 30);

    const rendererBox = new WebGLRenderer({ canvas, alpha: true });

    const controlsBox = new OrbitControls(cameraBox, canvas);
    controlsBox.target.set(0, 0, 0);
    controlsBox.update();

    const sceneBox = new Scene();
    const materialBox = new MeshBasicMaterial({
      vertexColors: FaceColors,
    });

    return {
      camera: cameraBox,
      renderer: rendererBox,
      scene: sceneBox,
      controls: controlsBox,
      material: materialBox,
    };
  }, [canvas]);

  useEffect(() => {
    if (!triangles) return {};

    let geometry = new Geometry();
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

    let cube = new Mesh(geometry, material);
    scene.add(cube);

    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
      controls.update();
    };

    requestAnimationFrame(render);
    controls.update();

    return () => {
      cube.geometry.dispose();
      cube.geometry = undefined;
      cube.material.dispose();
      cube.material = undefined;
      scene.remove(cube);
      geometry.dispose();
      geometry = undefined;
      cube = undefined;
    };
  }, [triangles]);
};

export const noop = () => {};
