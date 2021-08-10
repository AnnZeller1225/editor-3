import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { InteractionManager } from "three.interactive";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import CameraControls from "camera-controls";
import Wall from "../wall";
import { bindActionCreators } from "redux";
import * as actions from "../../actions";
import {
  initScene,
  initCamera,
  initPointLight,
  initRenderer,
  findModel,
  isCollision,
  getMouseCoord,
  hideTransformControl,
  createFloor,
  replaceModelFromCollision,
  replaceElemFromArr,
  changeVisibility, changeTextureWall,
  getChangeTextureFloor, removeAllHightLight
} from "../scripts/initBasicScene.js";

import outlineParam from '../settings/outline';

let scene,
  cameraPersp,
  renderer,
  checkCollisionModels,
  control,
  gltfLoader,
  updateUseEffectReplace,
  updateUseEffectVisible,
  updateForAddModel,
  updateUseEffectForDrag,
  updateUseEffectForRotate,
  updateUseEffectCameraPanorama,
  updateUseEffectCameraDefault,
  updateUseEffectTexture,
  updateUseEffectTexture__floor,
  updateUseEffectInstrum,
  updateUseEffectDelete,
  updateUseEffectListClick,
  updateUseEffectLock,
  clock,
  cameraControls,
  // axesHelper,
  outlinedArr,
  movingStatus,
  needOutline,
  composer,
  effectFXAA,
  outlinePass,
  raycaster,
  wallList,
  selectedObjects,
  transformControledModel,
  mouse, cameraStatus;
initGlobalLets();
initUseEffects(); // список useEffect
// initDispatchers()
let selectWallDispatch, selectSurfaceDispatch, resetSelectedModelDispatch, changePositionModelDispatch, selectModelDispatch;
let canvas = renderer.domElement;
let clickManager = new InteractionManager(
  renderer,
  cameraPersp,
  renderer.domElement
);
let controlStatus = false;
// addTransformControl упростить, дублируется при каждом клике 
// может сделать два отдельных диспатча для блокировки? потом соединить 
// resetSelectedModel переименовать в resetSelectedActive - сброс стен и пола тоже
//  УБРАТЬ ДОП ПРОВЕРКИ ПО USEeFFECT 
// СНЯТЬ ОБРАБОТЧИКИ СОБЫТИЙ С УДАЛЯЕМЫХ И ЗАМЕНЯЕМЫХ МОДЕЛЕЙ

// привязка к control событий каждый раз дублируется при перерендере
const FloorPlane = ({
  project_1,
  changePositionModel,
  camera,
  changeStatusCamera,
  selectWall,
  selectModel,
  selectSurface,
  activeObject,
  resetNewModel,
  modalForConfirm,
  resetSelectedModel,
  resetLockModel, selectedInModelList, activeInList
}) => {
  const { surfaces } = project_1;
  cameraStatus = camera.status;

  const ref = useRef();
  const [replaceModel, setReplaceModel] = useState(null);
  const [visibleModel, setVisibleModel] = useState(null);
  const [addModel, setAddModel] = useState(null);
  const [moveModel, setMoveModel] = useState(null);
  const [rotateModel, setRotateModel] = useState(null);
  const [cameraPanorama, setCameraPanorama] = useState(null);
  const [cameraDefault, setCameraDefault] = useState(null);


  const [changeTexture, setChangeTexture] = useState(null);
  const [changeTextureFloor, setChangeTextureFloor] = useState(null);
  const [resetInstr, setResetInstr] = useState(null);
  const [deleteModel, setDeleteModel] = useState(null);
  const [lockModel, setLockModel] = useState(null);
  const [clickListModel, setClickListModel] = useState(null);

  updateDispatches(); // локальные диспатчеры переносим в глобальные
  checkUpdateForReplace();
  checkUpdateForVisibility();
  checkUpdateForAddModel();
  checkUpdateForMovingModel(); // эти две функции рендерят компонент дважды
  checkUpdateForRotateModel();
  checkUpdateForCameraPanorama();
  checkUpdateForCameraDef();
  checkUpdateTexture__wall();
  checkUpdateTexture__floor();
  checkUpdateInstrum();
  checkUpdateDeleteModel();
  checkUpdateLockModel();

  checkUpdateClickListModel();



  // isSelected(activeInList.selectedModel)
  // создать функцию, которая отлавливает был ли клик по модели, если был вызываем addHightLight 

  // отрисовывает сцену и свет
  useEffect(() => {
    // console.log(" useEffect_1  ");
    main();
    function main() {
      init();
      animate();
    }

    function init() {
      initRenderer(renderer);
      initScene(scene);
      initCamera(cameraPersp);
      initPointLight(scene);
      // initFloor(scene);
      initControls();
      initOutlineComposer(); // для обводки
      ref.current.appendChild(renderer.domElement);
    }
  }, []);

  // если меняется visible model
  useEffect(() => {
    if (activeObject.selectedModel.id && activeObject.action === 'change_visibility' && updateUseEffectVisible) {
      updateUseEffectVisible = false;
      console.log(' visible UF ');
      let model = changeVisibility(activeObject.selectedModel, scene.children);
      let updateCheckCollision = [];

      if (!activeObject.selectedModel.visible) {
        updateCheckCollision = replaceElemFromArr(checkCollisionModels, activeObject.selectedModel.id);
        checkCollisionModels = updateCheckCollision;
      } else {
        checkCollisionModels.push(model)
      }


    }
  }, [visibleModel]);  // eslint-disable-line react-hooks/exhaustive-deps

  // если добавляем модель
  useEffect(() => {
    if (activeObject.newModel.id && activeObject.isSave && updateForAddModel) {
      loadModel2(activeObject.newModel);
      updateForAddModel = false;
      resetNewModel(); // после загрузки модели сбрасываем выбранну. модели в модалке
    }

  }, [addModel]);  // eslint-disable-line react-hooks/exhaustive-deps

  // режим камеры - панорама
  useEffect(() => {
    if (camera.status === "panorama") {
      console.log("panorama");
      changeMovingCamera(camera.status);
      updateUseEffectCameraPanorama = false;
      // resetCamera(changeStatusCamera);
    }
  }, [cameraPanorama]);  // eslint-disable-line react-hooks/exhaustive-deps

  // режим камеры - по умолчанию 
  useEffect(() => {
    // console.log(" камера по ум");
    if (camera.status === "default" && updateUseEffectCameraDefault) {
      // console.log(" камера по ум");
      updateUseEffectCameraDefault = false;
      changeMovingCamera(camera.status);
      // resetCamera(changeStatusCamera);
      // changeStatusCamera("default");
    }
  }, [cameraDefault]);  // eslint-disable-line react-hooks/exhaustive-deps



  // добавляем перемещение
  useEffect(() => {
    if (activeObject.action === "drag" && updateUseEffectForDrag) {
      showAxesControl(activeObject.action, control);
      movingStatus = "drag";
    }
  }, [moveModel]);  // eslint-disable-line react-hooks/exhaustive-deps
  // добавляем вращение
  useEffect(() => {
    if (activeObject.action === "rotate") {
      console.log('rotate UF');

      showAxesControl(activeObject.action, control);
      movingStatus = "rotate";
    }
  }, [rotateModel]);  // eslint-disable-line react-hooks/exhaustive-deps
  // обновление текстуры для стен
  useEffect(() => {
    if (updateUseEffectTexture) {
      console.log(" меняем текстуру в юз эф   ");
      updateUseEffectTexture = !updateUseEffectTexture;

      changeTextureWall(activeObject.wall, activeObject.newTexture, scene);
      resetSelectedModel();
    }
  }, [changeTexture]);  // eslint-disable-line react-hooks/exhaustive-deps
  // текстура для пола
  useEffect(() => {
    if (updateUseEffectTexture__floor) {
      updateUseEffectTexture__floor = !updateUseEffectTexture__floor;
      getChangeTextureFloor(activeObject, scene);
      resetSelectedModel();
    }
  }, [changeTextureFloor]);  // eslint-disable-line react-hooks/exhaustive-deps

  // добавление стен, пола и моделей
  useEffect(() => {
    addWalls(project_1.walls);
    let floor = createFloor(project_1.floor);

    floor.userData = {
      type: project_1.floor.type,
      ...floor.userData,
      id: project_1.floor.id,
      name: project_1.floor.name,
      click: 0,
      outlinePass: true,
    };
    scene.add(floor);
    wallList.push(floor);
    surfaces.forEach(el => {
      loadModel(el);
    });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps


  // замена модели
  useEffect(() => {
    if (
      activeObject.action === "replace" &&
      activeObject.newModel.id && updateUseEffectReplace
    ) {
      updateUseEffectReplace = false;
      replaceModelToScene(activeObject)

    }
  }, [replaceModel]);  // eslint-disable-line react-hooks/exhaustive-deps


  // удаление модели
  useEffect(() => {
    if (
      activeObject.action === "delete_model" && activeObject.selectedModel?.id && updateUseEffectDelete
    ) {
      updateUseEffectDelete = false;
      deleteModelFromScene(activeObject.selectedModel);
      resetSelectedModel(); // диспатч 
      // удаляем стрелки
      showAxesControl(activeObject.action, control);
      movingStatus = "reset";

    }
  }, [deleteModel]);  // eslint-disable-line react-hooks/exhaustive-deps


  // сброс стрелок для моделей
  useEffect(() => {
    if (updateUseEffectInstrum) {
      console.log(' cброс всех стрелок UF');
      // movingStatus = null;
      hideTransformControl(control);
      updateUseEffectInstrum = !updateUseEffectInstrum;
      movingStatus = null;
    }
  }, [resetInstr]);  // eslint-disable-line react-hooks/exhaustive-deps

  // блокировка модели
  useEffect(() => {
    if (
      activeObject.lockModel?.id && updateUseEffectLock
    ) {
      console.log(' lock UF ');
      updateUseEffectLock = false;

      getChangeLock(activeObject.lockModel)
      // диспач сброса блокированной модели в activeObject 
    }
  }, [lockModel]);  // eslint-disable-line react-hooks/exhaustive-deps

  // если кликнули по списку моделей
  useEffect(() => {
    if (
      activeInList.selectedModel?.id && updateUseEffectListClick
    ) {
      console.log(' click model list UF');
      updateUseEffectListClick = false;
      let root = findModel(scene.children, activeInList.selectedModel?.id);
      addHightLight(root)
    }
  }, [clickListModel]);  // eslint-disable-line react-hooks/exhaustive-deps


  function getChangeLock(mod) {

    let model = findModel(scene.children, mod.id);
    model.userData.locked = !model.userData.locked;
    if (mod.locked) {
      movingStatus = null;
      hideTransformControl(control);
      // console.log( scene.children[4][0]._plane.object.userData);
      // console.log(scene.children[4]._plane.object);

      resetLockModel();
    } else {
      if (movingStatus) {
        showAxesControl("drag", control)
      }
    }
    // console.log('getChangeLock');
  }



  function updateDispatches() {
    selectWallDispatch = selectWall; // для передачи локального dispach в addEventListener внешний
    selectSurfaceDispatch = selectSurface;
    // selectTypeOfChangeDispatch = selectTypeOfChange;
    changePositionModelDispatch = changePositionModel;
    selectModelDispatch = selectModel;
    resetSelectedModelDispatch = resetSelectedModel;
  }


  function checkUpdateForReplace() {
    if (
      activeObject.action === "replace" &&
      updateUseEffectReplace === false &&
      activeObject.newModel?.id && activeObject.isSave
    ) {
      setReplaceModel(replaceModel + 1);
      updateUseEffectReplace = true;
    }
  }

  function checkUpdateForVisibility() {
    if (
      activeObject.selectedModel?.id &&
      updateUseEffectVisible === false &&
      activeObject.action === "change_visibility"
    ) {
      setVisibleModel(visibleModel + 1);
      updateUseEffectVisible = true;
    }
  }

  function checkUpdateForAddModel() {
    if (activeObject.newModel.id && updateForAddModel === false && activeObject.isSave && activeObject.action === 'add_model') {
      setAddModel(addModel + 1);
      updateForAddModel = true;
    }
  }

  function checkUpdateForMovingModel() {
    if (
      activeObject.action === "drag" &&
      updateUseEffectForDrag === false && !activeObject.selectedModel.locked

    ) {
      setMoveModel(moveModel + 1);
      updateUseEffectForDrag = true;
      updateUseEffectForRotate = false;
      // console.log(' is Moving in check');
    }
  }

  function checkUpdateForRotateModel() {
    if (
      activeObject.action === "rotate" &&
      updateUseEffectForRotate === false
    ) {
      setRotateModel(rotateModel + 1);
      updateUseEffectForRotate = true;
      updateUseEffectForDrag = false;
    }
  }

  function checkUpdateForCameraPanorama() {
    if (camera.status === "panorama" && updateUseEffectCameraPanorama === false) {
      setCameraPanorama(cameraPanorama + 1);
      updateUseEffectCameraPanorama = true;
    }
  }

  function checkUpdateForCameraDef() {
    if (camera.status === "default" && updateUseEffectCameraDefault === false) {
      setCameraDefault(cameraDefault + 1);
      updateUseEffectCameraDefault = true;
      // console.log(' меняем ');
    }
  }

  function checkUpdateTexture__wall() {
    if (
      updateUseEffectTexture === false &&
      activeObject.action === "change_texture" &&
      activeObject.wall.id &&
      activeObject.newTexture && activeObject.isSave
    ) {
      console.log(' меняем текстуру стены ');
      setChangeTexture(changeTexture + 1);
      updateUseEffectTexture = true;
    }
  }

  function checkUpdateTexture__floor() {
    if (
      updateUseEffectTexture__floor === false && activeObject.action === "change_texture" &&
      activeObject.surface.id &&
      activeObject.newTexture && activeObject.isSave
    ) {
      setChangeTextureFloor(changeTextureFloor + 1);
      updateUseEffectTexture__floor = true;
    }
  }
  function checkUpdateInstrum() {
    if (
      activeObject.action === "reset" &&
      updateUseEffectInstrum === false
    ) {

      setResetInstr(resetInstr + 1);
      updateUseEffectInstrum = true;
    }
  }

  function checkUpdateDeleteModel() {
    if (
      activeObject.action === "delete_model" && activeObject.selectedModel?.id &&
      updateUseEffectDelete === false && modalForConfirm.confirmed
    ) {

      setDeleteModel(deleteModel + 1);
      updateUseEffectDelete = true;
    }
  }

  // наверно тут нужна проверка на действие которое мы выполняем или - после изменений в three js отправить диспач, который почистит lock model в сторе 
  function checkUpdateLockModel() {
    if (
      activeObject.lockModel?.id &&
      updateUseEffectLock === false
    ) {

      setLockModel(lockModel + 1);
      updateUseEffectLock = true;
      // prevLocked = activeObject.lockModel.locked
    }
  }
  function checkUpdateClickListModel() {
    if (
      activeInList.selectedModel?.id &&
      updateUseEffectListClick === false
    ) {

      setClickListModel(clickListModel + 1);
      updateUseEffectListClick = true;
    }
  }

  return (
    <>
      <div ref={ref} />

      {

      // console.count()
      /* 
      
      
       */}

    </>
  );
};


const mapStateToProps = ({
  project_1,
  changingModels,
  currentModel,
  addedModel,
  camera,
  modal,
  activeObject,
  modalForConfirm,
  activeInList
}) => {
  return {
    project_1,
    changingModels,
    currentModel,
    addedModel,
    camera,
    modal,
    activeObject,
    modalForConfirm, activeInList
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...actions,
  }, dispatch);
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  FloorPlane
);

function addWalls(arr) {
  // тут решить вопрос с правильным поворотом груп - перепутала угол поворота
  // const group = new THREE.Group();
  arr.forEach((wall) => {
    let addedWall = Wall(wall);

    addedWall.userData = {
      ...addedWall.userData,
      id: wall.id,
      name: wall.name,
      type: "WALL",
      click: 0,
      outlinePass: true,
    };
    addedWall.material.side = THREE.DoubleSide;
    wallList.push(addedWall);

    scene.add(addedWall);
  });
}

// при добавлении новой модели
function loadModel2(modelJson) {
  // сделать сброс модакли или чегто
  console.log(' загрузили модель ');
  gltfLoader.load(`${modelJson.url}`, (gltf) => {
    let root = gltf.scene;
    const { x, y, z } = modelJson.dots;
    root.rotation.y = modelJson.rotate;
    root.userData = {
      ...root.userData,
      type: modelJson.type,
      name: modelJson.name,
      id: modelJson.id,
      startPosition: { x, y, z },
      click: 0,
    };

    root.position.set(0, 0, 0);
    root.addEventListener("click", (event) => {
      root.userData.click += 1;
      transformControledModel = root;
      addTransformControl(root);
      highlightModel(root, modelJson);

      // тут отправлять диспач про выбранную модель
    });
    clickManager.add(root);
    checkCollisionModels.push(root);
    wallList.push(root);
    outlinedArr.push(root);
    scene.add(root);
  });
}


function loadModel(modelJson) {
  gltfLoader.load(`${modelJson.url}`, (gltf) => {
    let root = gltf.scene;
    const { x, y, z } = modelJson.dots;
    root.rotation.y = modelJson.rotate;
    root.userData = {
      ...root.userData, ...modelJson,
      click: 0,
    };

    root.position.set(Number(x), Number(y), Number(z));
    scene.add(root);
    // выбивало ошибку при удалении моделей, делаем проверку на то, состоит ли в сцене модель
    if (root.parent && root.visible) {
      root.addEventListener("click", () => addHightLight(root));
      clickManager.add(root);
      checkCollisionModels.push(root);
      wallList.push(root);
      outlinedArr.push(root);
    }

  });
}
// реакция на клик модели => подсветка и transform control
function addHightLight(root) {
  console.log('addHightLight');
  if (!controlStatus) {
    if (root?.visible && root.parent && cameraStatus !== 'panorama') {
      // console.log('addHightLight');
      root.userData.click += 1;


      highlightModel(root);

      if (!root.userData.locked) {
        transformControledModel = root;
        addTransformControl(root);

      } else {
        console.log('elem blocked');
      }
    }
    // controlStatus = false;
  } else {
    // console.log(controlStatus, 'controlStatus true');
  }
  controlStatus = false

}


function deleteModelFromScene(modelLson) {
  let model = findModel(scene.children, modelLson.id);
  model.material = undefined;
  model.geometry = undefined;

  model.traverse(function (obj) {
    if (obj.type === 'Mesh') {
      obj.geometry.dispose();
      obj.material.dispose();
    }
  })
  model.removeEventListener("click", () => addHightLight(model));
  scene.remove(model);
  checkCollisionModels = replaceModelFromCollision(checkCollisionModels, modelLson.id)
  control.detach();
}








function initOutlineComposer() {
  composer = new EffectComposer(renderer);
  composer.setSize(window.innerWidth, window.innerHeight);

  const renderPass = new RenderPass(scene, cameraPersp);
  composer.addPass(renderPass);

  outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    cameraPersp
  );
  composer.addPass(outlinePass);
  effectFXAA = new ShaderPass(FXAAShader);

  effectFXAA.uniforms["resolution"].value.set(
    1 / window.innerWidth,
    1 / window.innerHeight
  );
  composer.addPass(effectFXAA);
  renderer.domElement.style.touchAction = "none";
  outlinePass.edgeStrength = outlineParam.edgeStrength;
  outlinePass.edgeGlow = outlineParam.edgeGlow;
  outlinePass.edgeThickness = outlineParam.edgeThickness;
  outlinePass.visibleEdgeColor.set(outlineParam.visibleEdgeColor);
  outlinePass.hiddenEdgeColor.set(outlineParam.hiddenEdgeColor);
}
function initUseEffects() {
  updateUseEffectReplace = false;
  updateUseEffectVisible = false;
  updateForAddModel = false;
  updateUseEffectForDrag = false;
  updateUseEffectForRotate = false;
  updateUseEffectCameraPanorama = false;
  updateUseEffectCameraDefault = false;
  updateUseEffectTexture = false;
  updateUseEffectTexture__floor = false;
  updateUseEffectInstrum = false;
  updateUseEffectDelete = false;
  updateUseEffectLock = false;
  updateUseEffectListClick = false;
}
function initGlobalLets() {
  scene = new THREE.Scene();
  cameraPersp = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  cameraPersp.position.set(0, 0, 8);
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  checkCollisionModels = []; // массив всех объектов для пересечения
  control = new TransformControls(cameraPersp, renderer.domElement);
  gltfLoader = new GLTFLoader();
  // axesHelper = new THREE.AxesHelper(15);
  movingStatus = null;
  clock = new THREE.Clock();
  wallList = []; // список стен доступных для клика
  selectedObjects = []; // для обводки
  outlinedArr = []; // обводка
}

// нельзя переносить
const showAxesControl = (typeOfChange, control) => {
  if (typeOfChange === "drag") {
    updateUseEffectForDrag = false;
    control.setMode("translate");
    control.showY = false;
    control.showX = true;
    control.showZ = true;
  } else if (typeOfChange === "rotate") {
    updateUseEffectForRotate = false;
    control.setMode("rotate");
    hideTransformControl(control);
    control.showY = true;
  } else {
    // console.log(' скрываем стрелки в show axes control');
    hideTransformControl(control);
  }
};



function changeMovingCamera(status) {
  cameraControls.mouseButtons.left = CameraControls.ACTION.TRUCK;
  status === "panorama"
    ? (cameraControls.mouseButtons.left = CameraControls.ACTION.TRUCK)
    : (cameraControls.mouseButtons.left = CameraControls.ACTION.ROTATE);
}


function addSelectedObject(object) {
  // для обведения модели
  selectedObjects = [];
  selectedObjects.push(object);
}
// ОСНОВНЫЕ ФУНКЦИИ РАБОТЫ С ОБЪЕКТАМИ ОСНОВНЫЕ ФУНКЦИИ РАБОТЫ С ОБЪЕКТАМИ ОСНОВНЫЕ ФУНКЦИИ РАБОТЫ С ОБЪЕКТАМ И ОСНОВНЫЕ ФУНКЦИИ РАБОТЫ С ОБЪЕКТАМИ ОСНОВНЫЕ ФУНКЦИИ РАБОТЫ С ОБЪЕКТАМИ

function addTransformControl(model) {
  // 
  // console.log(model);
  // model.material.depthTest = false;
  if (model.parent && !model.userData.locked) {
    // console.log('addTransformControl');
    // console.log(movingStatus, 'movingStatus tc');
    // console.log(model.userData.locked, 'locked in TC');
    model.userData.currentPosition = new THREE.Vector3();
    model.index = 100
    control.addEventListener("change", render);

    control.addEventListener(
      "objectChange",
      function (el) {
        isCollision(el, checkCollisionModels);
        el.target.children[0].object.userData.currentPosition.copy(
          el.target.children[0].object.position
        );
      },
      false
    );
    control.userData.name = "transformControl";
    control.addEventListener(
      "dragging-changed",
      (event) => onDraginigchange(event, model),
      false
    );
    control.addEventListener(
      "mouseDown",
      () => console.log( ' mouse down Control')
      // () => controlStatus = true
    );

    // control.addEventListener(
    //   "click",
    //   // () => console.log(' up  Control')
    //   () => controlStatus = false
    // );

    scene.add(control);
    showAxesControl(movingStatus, control);
    control.attach(model);
    clickManager.add(control);



  } else {
    console.log('elem blocked');
    // возмоно понадобится тут удалить стрелки хз как правда
    // showAxesControl(null);
  }
}

// отправляет данные в стор как то переименовать
function sendPosition(event, model) {

  model.userData.click = 2; // после переноса чтобы подсветка могла пропасть
  let { x, y, z } = event.target._plane.object.userData.currentPosition;
  model.userData.dots = event.target._plane.object.userData.currentPosition;
  let modelInfo = {
    dots: { x, y, z },
    rotate: event.target._plane.object.rotation.y,
    id: event.target._plane.object.userData.id,
  };
  changePositionModelDispatch(modelInfo);
}
function removeHightLight(model) {
  control.visible = false;
  model.userData.click = 0;

  selectedObjects = [];
  outlinePass.selectedObjects = selectedObjects;
  addSelectedObject(model);
  if (model.userData.type === 'MODEL') {
    resetSelectedModelDispatch();
  }
}
function removeHightLight_2(model) {
  control.visible = false;
  model.userData.click = 0;
  console.log(' снять выделение ');

  selectedObjects = [];
  outlinePass.selectedObjects = [];
  addSelectedObject(model);
  if (model.userData.type === 'MODEL') {
    // resetSelectedModelDispatch();
  }
}
function highlightModel(model) {
  if (cameraStatus !== 'panorama') {

    // сделать доп проверку на то, что жто первый клик по модели, чтобы не перебирать лишний раз 
    if (model.userData.type === 'MODEL') {
      selectModelDispatch(model.userData)
    }
    // если клик не четный и если модель уже не была выбранна
    if (model.userData.click % 2 > 0 && model.userData.selected !== true) {
      removeAllHightLight(scene.children, model);
      // console.log(" добавляем подсветку, удаляя предыдущие ");
      needOutline = true;
      model.userData.selected = true;
      addSelectedObject(model);
      outlinePass.selectedObjects = selectedObjects;
    } // 
    else if (model.userData.click % 2 === 0 && model.userData.click > 1) {
      // console.log(" кликнутая модель");
      model.userData.selected = true;
      needOutline = true;
      removeAllHightLight(scene.children, model);
    } else if (model.userData.selected === true) {
      // если повторно кликаем на одну и ту же модель
      // console.log("была true");
      needOutline = false;
      removeHightLight(model);
      model.userData.selected = false;
      movingStatus = null; // если нужно оставлять стрелки после снятия выделения - убрать null 
    }
  }

}

function highlightModel_2(model) {
  console.log(' hlModel 2 ', model.userData.click, model.userData.selected);
  // если клик не четный и если модель уже не была выбранна
  if (model.userData.click % 2 > 0 && model.userData.selected !== true) {
    removeAllHightLight(scene.children, model);
    console.log(" добавляем подсветку, удаляя предыдущие ");
    needOutline = true;
    model.userData.selected = true;
    addSelectedObject(model);
    outlinePass.selectedObjects = selectedObjects;
  } // 
  else if (model.userData.click % 2 === 0 && model.userData.click > 1) {
    console.log(" кликнутая модель");
    model.userData.selected = true;
    needOutline = true;
    // removeAllHightLight(scene.children, model);
  } else if (model.userData.selected === true) {
    // если повторно кликаем на одну и ту же модель
    console.log("кликнули по выбранной");
    needOutline = false;
    removeHightLight_2(model);
    model.userData.selected = false;
    movingStatus = null; // если нужно оставлять стрелки после снятия выделения - убрать null 
  } else {
    console.log("exseption highlightModel");
  }
}

function onClick(event) {

  // console.log(cameraStatus, 'cameraStatus');
  if (cameraStatus !== 'panorama' && (control.showX === false || control.visible === false)) {
    getMouseCoord(event, canvas, mouse);
    checkingClick();
  } else {
    // нужно выделять както стену после того как двигали модель
  }
}


function loadReplaceableModel(activeObject) {
  gltfLoader.load(`${activeObject.newModel.url}`, (gltf) => {
    let root = gltf.scene;
    root.userData = {
      ...activeObject.selectedModel,
      name: activeObject.newModel.name,
      id: activeObject.newModel.id,
      click: 0,
    };
    let { x, y, z } = activeObject.selectedModel.dots;
    root.position.set(Number(x), Number(y), Number(z));
    scene.add(root);

    root.addEventListener("click", () => addHightLight(root, 'in replace'))

    clickManager.add(root);
    checkCollisionModels.push(root);

    checkCollisionModels = replaceElemFromArr(checkCollisionModels, activeObject.selectedModel.id);
    wallList.push(root);
    outlinedArr.push(root);

  })
}

function replaceModelToScene(activeObject) {

  loadReplaceableModel(activeObject); // загружаем новую модель на место старой
  deleteModelFromScene(activeObject.selectedModel);
  console.log(' удаляем модель');
  resetSelectedModelDispatch();
}





function resetCamera(changeStatusCamera) {
  canvas.addEventListener("mouseup", function (event) {
    changeStatusCamera("default");
  });
}
// клик по trancsform control внутри модели?
function isClickForTC(ev) {
  console.log(ev.object);
  if (ev.object.type === 'Line') {
    console.log(' click по TC');
    controlStatus = true;

  }
}
// ПОДКЛЮЧИТЬ ОДНОВРЕМЕННО КЛИК И КЛИК МЕНЕДЖЕР И ДЕЛАТЬ ПРОВЕРКУ НА СУЩЕСТВОВАНИЕ В ЮЗЕР ДАТЕ СВОЙСТВ, ЕСДИ ИХ НЕТ ПСТЬ РАБОТАЕТ КЛИК МЕНЕДЖЕР
// сделано для клика по стенам и модели  - нужно чтобы было различие
function checkingClick() {

  raycaster.setFromCamera(mouse, cameraPersp);
  var intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    let event = intersects[0];
    // isClickForTC(event)
    // console.log(intersects);
    // если это line то ...

    if (event.object.userData.type === "FLOOR_SHAPE") {
      const root = intersects[0].object;
      let eventId = root.userData.id;
      root.userData.click += 1;
      highlightModel(root, null);
      // console.log('FLOOR_SHAPE', root)

      //  needOutline = true;
      selectSurfaceDispatch(eventId);
    } else if (event.object.userData.type === "WALL") {
      let eventId = intersects[0].object.userData.id;
      let side = Math.floor(event.faceIndex / 2);
      console.log(side, 'side in floorp');
      selectWallDispatch(eventId, side);
      const root = intersects[0].object;
      root.userData.click += 1;
      highlightModel(root, null);
    } else if (event.object.userData.type === "MODEL") {
      console.log(' в checking click нашел модель ');
      // const root = intersects[0].object.children[0];
      // root.userData.click += 1;
      // highlightModel(root, null);
    } else {
      // console.log("event exception  ");
    }

  }

}
//  ОБРАБОТЧИКИ СОБЫТИЙ
// РАЗОБРАТЬСЯ С ТЕМ КАК ПРИВЯЗАНЫ СОБЫТИЯ ВНУТРИ КОМПОНЕНТА - ОНИ ПРИ ПЕРЕРЕНДЕРЕ ЗАНОВО ПОДВЯЗЫВВАЮТСЯ?
control.addEventListener("mouseUp", (event) => sendPosition(event, transformControledModel));
window.addEventListener("resize", onWindowResize);
canvas.addEventListener("mousedown", onClick);

















// функции только для three js 

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  cameraPersp.aspect = width / height;
  cameraPersp.updateProjectionMatrix();
  renderer.setSize(width, height);
  // для обводки
  composer.setSize(width, height);
  effectFXAA.uniforms["resolution"].value.set(
    1 / window.innerWidth,
    1 / window.innerHeight
  );
}

function render() {
  renderer.render(scene, cameraPersp);
}

function initControls() {
  CameraControls.install({ THREE: THREE });
  cameraControls = new CameraControls(cameraPersp, renderer.domElement);
  // scene.add(axesHelper);
}

function animate() {

  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  const hasControlsUpdated = cameraControls.update(delta);
  clickManager.update();

  if (hasControlsUpdated) {
    renderer.render(scene, cameraPersp);
    composer.render();
  } else if (needOutline) {
    composer.render();
  } else {
    renderer.render(scene, cameraPersp);
  }
}
function onDraginigchange(event) {
  cameraControls.enabled = !event.value;
  // controlStatus = false;
}

export { clickManager };
