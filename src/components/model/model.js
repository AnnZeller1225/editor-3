// import React from "react";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const Model = (url) => {
  let root;

  const gltfLoader = new GLTFLoader();
  gltfLoader.load(`${url}`, (gltf) => {
    root = gltf.scene;
    root.position.set(1, 2, 0);
    root.name = "red-chair";
    //   scene.add(root);
    //   checkCollisionModels.push(root);
    root.userData.currentPosition = new THREE.Vector3();
    //   initClick(root);
    console.log(root, "загрузили ");
    return root;
  });


};

export default Model;
