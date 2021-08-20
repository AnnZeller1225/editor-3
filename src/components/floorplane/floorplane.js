import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { InteractionManager } from "three.interactive";
import Wall from "../wall";
import { bindActionCreators } from "redux";
import * as actions from "../../actions";
import {
  initScene,
  initPointLight,
  initRenderer,
  findModel,
  isCollision,
  getMouseCoord,
  hideTransformControl,
  polygonShape,
  replaceModelFromCollision,
  replaceElemFromArr,
  changeVisibility, changeTextureWall,
  getChangeTextureFloor, removeAllHightLight,
  onWindowResize,
  addSurfaces
} from "../scripts/initBasicScene.js";
import {
  initCamera,
  cameraControlsEnable, cameraControls, initControls, changeMovingCamera
} from "../scripts/camera.js";
import { initOutlineComposer, composer, outlinePass } from "../scripts/outline"

let scene,
  cameraPersp,
  renderer,
  checkCollisionModels,
  control,
  gltfLoader,
  updateUseEffectReplace,
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
  // axesHelper,
  outlinedArr,
  movingStatus,
  needOutline,
  raycaster,
  wallList,
  selectedObjects,
  transformControledModel,
  mouse, cameraStatus;
initGlobalLets();
initUseEffects();
// список useEffect
let selectWallDispatch, selectSurfaceDispatch, resetSelectedModelDispatch, changePositionModelDispatch, selectModelDispatch;
const canvas = renderer.domElement;

let clickManager = new InteractionManager(
  renderer,
  cameraPersp,
  renderer.domElement
);
let needArrow = true;
let prevChangeVisible = {
  obj: {},
  action: ''
}
let ref;
// текстура стен не высчитывается height 
// добавлять новю генераци. id для новой моддели 
// перенести проверку на обновления к самим useeffecct 
// как насчет названий диспатчеров - dispatchSelectModel, a если мне нужно глобаное имя - dispatchGlobalSelectModel ? -   ПЕРЕПИСАТЬ 
// что если на каждый клик делать сравнение пред модели и следующей, так можно отследивать и снятие выделение при клике на модельи стрелке одновренменно 

// addTransformControl упростить, дублируется при каждом клике 
// resetSelectedModel переименовать в resetSelectedActive - сброс стен и пола тоже
//  УБРАТЬ ДОП ПРОВЕРКИ ПО USEeFFECT 
// СНЯТЬ ОБРАБОТЧИКИ СОБЫТИЙ С УДАЛЯЕМЫХ И ЗАМЕНЯЕМЫХ МОДЕЛЕЙ

// привязка к control событий каждый раз дублируется при перерендере
const FloorPlane = ({
  project_1,
  changePositionModel,
  camera,
  selectWall,
  selectModel,
  selectSurface,
  activeObject,
  resetNewModel,
  modalForConfirm,
  resetSelectedModel,
  resetLockModel, activeInList,
}) => {
  cameraStatus = camera.status;
  ref = useRef();

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

  updateDispatches(); // локальные диспатчеры в глобальные
  checkUpdateForReplace();
  checkUpdateForAddModel();
  checkUpdateForCameraPanorama();
  checkUpdateForCameraDef();
  checkUpdateTexture__wall();
  checkUpdateTexture__floor();
  checkUpdateInstrum();
  checkUpdateDeleteModel();
  checkUpdateForMovingModel(); // эти две функции рендерят компонент дважды
  checkUpdateForRotateModel();
  checkUpdateLockModel();
  checkUpdateForVisibility();

  checkUpdateClickListModel();

  // отрисовывает сцену и свет, 
  // добавление стен, пола и моделей
  useEffect(() => {
    // console.log(" useEffect_1  ");
    main();
    addWalls(project_1.walls);
    addSurfaces(project_1.floorCeiling, wallList, scene);
    addFurniture(project_1.surfaces)
  }, []);// eslint-disable-line react-hooks/exhaustive-deps


  // если меняется visible model
  // делат сравнение такой же пришел нам changevisible или нет
  useEffect(() => {

    if (activeObject.changeVisible.obj?.id) {

      let model = changeVisibility(activeObject.changeVisible.obj, scene.children);
      let updateCheckCollision = [];
      if (!activeObject.changeVisible.obj.visible) {
        updateCheckCollision = replaceElemFromArr(checkCollisionModels, activeObject.changeVisible.obj.id);
        checkCollisionModels = updateCheckCollision;
        hideTransformControl(control)
      } else {
        checkCollisionModels.push(model);
        if (activeObject.changeVisible.obj.id === activeObject.selectedModel.id) {
          addTransformControl(model)
        }
      }
    }
  }, [visibleModel]);  // eslint-disable-line react-hooks/exhaustive-deps

  function checkUpdateForVisibility() {
    if (activeObject.changeVisible.obj?.id && prevChangeVisible.obj !== activeObject.changeVisible.obj) {
      // console.log(' обновляем');
      prevChangeVisible = activeObject.changeVisible;
      setVisibleModel(visibleModel + 1);
    }
  }
  // если добавляем модель
  useEffect(() => {
    if (activeObject.newModel.id && activeObject.isSave && updateForAddModel) {
      // loadModel2(activeObject.newModel);
      loadModel(activeObject.newModel);
      updateForAddModel = false;
      resetNewModel(); // после загрузки модели сбрасываем выбранну. модели в модалке
    }

  }, [addModel]);  // eslint-disable-line react-hooks/exhaustive-deps

  function checkUpdateForAddModel() {
    if (activeObject.newModel.id && updateForAddModel === false && activeObject.isSave && activeObject.typeOfChange === 'add_model') {
      setAddModel(addModel + 1);
      updateForAddModel = true;
    }
  }
  // режим камеры - панорама
  useEffect(() => {
    if (camera.status === "panorama") {
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

      movingStatus = "drag";
      showAxesControl(activeObject.action, control, activeObject, 'uf drag');
      // console.log(' move useEffect ');

    }
  }, [moveModel]);  // eslint-disable-line react-hooks/exhaustive-deps
  // добавляем вращение
  useEffect(() => {
    if (activeObject.action === "rotate") {
      movingStatus = "rotate";
      showAxesControl(activeObject.action, control, activeObject, 'uf rotate');

    }
  }, [rotateModel]);  // eslint-disable-line react-hooks/exhaustive-deps
  // обновление текстуры для стен
  useEffect(() => {
    if (updateUseEffectTexture) {
      // console.log(" меняем текстуру в юз эф   ");
      updateUseEffectTexture = !updateUseEffectTexture;

      changeTextureWall(activeObject.wall, activeObject.newTexture, scene);
      resetSelectedModel();
    }
  }, [changeTexture]);// eslint-disable-line react-hooks/exhaustive-deps

  function checkUpdateTexture__wall() {
    if (
      updateUseEffectTexture === false &&
      activeObject.typeOfChange === "change_texture" &&
      activeObject.wall.id &&
      activeObject.newTexture && activeObject.isSave
    ) {
      // console.log(' меняем текстуру стены ');
      setChangeTexture(changeTexture + 1);
      updateUseEffectTexture = true;
    }
  }
  // текстура для пола
  useEffect(() => {
    if (updateUseEffectTexture__floor) {
      updateUseEffectTexture__floor = !updateUseEffectTexture__floor;
      getChangeTextureFloor(activeObject, scene);
      resetSelectedModel();
    }
  }, [changeTextureFloor]);  // eslint-disable-line react-hooks/exhaustive-deps



  // замена модели
  useEffect(() => {
    if (
      activeObject.typeOfChange === "replace" &&
      activeObject.newModel.id && updateUseEffectReplace
    ) {
      updateUseEffectReplace = false;
      replaceModelToScene(activeObject)

    }
  }, [replaceModel]);  // eslint-disable-line react-hooks/exhaustive-deps

  function checkUpdateForReplace() {
    if (
      activeObject.typeOfChange === "replace" &&
      updateUseEffectReplace === false &&
      activeObject.newModel?.id && activeObject.isSave
    ) {
      setReplaceModel(replaceModel + 1);
      updateUseEffectReplace = true;
    }
  }

  // удаление модели
  useEffect(() => {
    if (
      activeObject.typeOfChange === "delete_model" && activeObject.deleting?.id && updateUseEffectDelete
    ) {
      updateUseEffectDelete = false;
      deleteModelFromScene(activeObject.deleting);
      resetSelectedModel(); // диспатч 
      // удаляем стрелки
      // showAxesControl(activeObject.typeOfChange, control);
      // movingStatus = "reset";

    }
  }, [deleteModel]);  // eslint-disable-line react-hooks/exhaustive-deps

  function checkUpdateDeleteModel() {
    if (
      activeObject.typeOfChange === "delete_model" && activeObject.deleting?.id &&
      updateUseEffectDelete === false && modalForConfirm.confirmed
    ) {
      console.log('delete');
      setDeleteModel(deleteModel + 1);
      updateUseEffectDelete = true;
    }
  }

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



  // если кликнули по списку 
  useEffect(() => {
    const { selectedModel, wall, surface } = activeInList;
    if (
      (activeInList.selectedModel?.id || activeInList.wall?.id || activeInList.surface?.id) &&
      updateUseEffectListClick
    ) {
      console.log('click');
      let active;
      let activeObj;
      if (selectedModel?.id) {
        console.log('active is model');
        active = selectedModel
        activeObj = findModel(scene.children, active);
      } else if (wall?.id) {
        console.log('active is wall');
        active = wall
      } else if (surface?.id) {
        active = surface
        console.log('active is surface');
        activeObj = findSurface(scene.children, active);
      } else {
        console.log(' не нашли тип активного в списке');
      }

      addHightLight(activeObj, 'modelList');
      // debugger;
      updateUseEffectListClick = false;
    }
  }, [clickListModel]);  // eslint-disable-line react-hooks/exhaustive-deps

  function checkUpdateClickListModel() {
    if (
      (activeInList.selectedModel?.id || activeInList.wall?.id || activeInList.surface?.id) &&
      updateUseEffectListClick === false
    ) {

      setClickListModel(clickListModel + 1);
      updateUseEffectListClick = true;
    }
  }

  function findSurface(arr, active) {
    let elem;
    arr.forEach((el) => {
      if (el.type === "Mesh" && el.userData.type === active.type && el.userData.id === active.id) {
        elem = el;
      }
    });
    return elem;
  }

  // блокировка модели
  useEffect(() => {
    if (
      (activeObject.lockModel?.id || activeObject.locking) && updateUseEffectLock
    ) {
      // console.log(' lock UF ');
      updateUseEffectLock = false;

      if (activeObject.lockModel?.id) {
        getChangeLock(activeObject, true);

      } else if (
        activeObject.locking?.id
      ) {

        // console.log(' блокируем не актив ');
        getChangeLock(activeObject, false)
      }
      // диспач сброса блокированной модели в activeObject 
    }
  }, [lockModel]);  // eslint-disable-line react-hooks/exhaustive-deps

  function checkUpdateLockModel() {
    if (
      (activeObject.lockModel?.id || activeObject.locking?.id) &&
      updateUseEffectLock === false
    ) {
      setLockModel(lockModel + 1);
      updateUseEffectLock = true;
    }
  }

  function getChangeLock(activeObject, isActive) {
    //isActive - является ли он активным в сцене или мы кликнули в список, не активируя его, лишь меняя lock
    let model = isActive ?
      findModel(scene.children, activeObject.lockModel.id) : findModel(scene.children, activeObject.locking.id);

    model.userData.locked = !model.userData.locked;
    if (isActive) {

      if (activeObject.lockModel.locked) {
        console.log(' блокируем стрелки ');
        hideTransformControl(control);
        resetLockModel();
      } else {
        console.log('добавим стрелки');
        addTransformControl(model);
        resetLockModel();
      }
    } else {
      console.log(' блокируем стрелки у не активного');
      // model.userData.locked = true;
      resetLockModel();
    }
  }







  function updateDispatches() {
    selectWallDispatch = selectWall; // для передачи локального dispach в addEventListener внешний
    selectSurfaceDispatch = selectSurface;
    // selectTypeOfChangeDispatch = selectTypeOfChange;
    changePositionModelDispatch = changePositionModel;
    selectModelDispatch = selectModel;
    resetSelectedModelDispatch = resetSelectedModel;
  }








  function checkUpdateForMovingModel() {
    if (
      activeObject.action === "drag" &&
      updateUseEffectForDrag === false && !activeObject.selectedModel.locked

    ) {
      setMoveModel(moveModel + 1);
      updateUseEffectForDrag = true;
      updateUseEffectForRotate = false;
      // if (clicked) {
      //   console.log(' clicked');
      // } else {
      //   setMoveModel(moveModel + 1);
      //   updateUseEffectForDrag = true;
      //   updateUseEffectForRotate = false;
      // }

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



  return (
    <>
      <div ref={ref} />
      {
        // console.count()
      }
    </>
  );
};

// function getTypeOfObject(obj){
//   return type, id
// }

const mapStateToProps = ({
  project_1,
  changingModels,
  currentModel,
  addedModel,
  camera,
  modal,
  activeObject,
  modalForConfirm,
  activeInList,
  resetTransformControl
}) => {
  return {
    project_1,
    changingModels,
    currentModel,
    addedModel,
    camera,
    modal,
    activeObject,
    modalForConfirm, activeInList,
    resetTransformControl
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
// можно перенести 
function addWalls(arr) {
  // тут решить вопрос с правильным поворотом груп - перепутала угол поворота
  // const group = new THREE.Group();
  arr.forEach((wall) => {
    let addedWall = Wall(wall);

    addedWall.userData = {
      ...addedWall.userData,
      id: wall.id,
      name: wall.name,
      type: wall.type,
      click: 0,
      outlinePass: true,
    };
    addedWall.material.side = THREE.DoubleSide;
    wallList.push(addedWall);

    scene.add(addedWall);
  });
}


function addFurniture(arr) {
  arr.forEach(el => {
    loadModel(el);
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
      root.addEventListener("mousedown", () => addHightLight(root));
      clickManager.add(root);
      checkCollisionModels.push(root);
      wallList.push(root);
      outlinedArr.push(root);
    }

  });
}


function isSameModel(prev, next) {
  if (prev === next) {
    return true
  }
}

// реакция на клик модели => подсветка и transform control
function addHightLight(root, status) {
  if (root?.visible && root.parent && cameraStatus !== 'panorama' && !control.userData.active) {
    root.userData.click += 1;
    console.log(' add HL');
    highlightModel(root, status);
// если это модель,  не заблочена и если ей нужны стрелки 
    if (needArrow && !root.userData.locked && (root.userData.type !== "WALL" || root.userData.type !== "FLOOR_SHAPE" )) {
      transformControledModel = root;
      addTransformControl(root);
    } else {
      console.log(' скрываем остальные  стрелки');
      hideTransformControl(control)
    }
  }

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


function initUseEffects() {
  updateUseEffectReplace = false;
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
const showAxesControl = (typeOfChange, control, obj, text) => {
  // console.log(typeOfChange, 'typeOfChange', text, 'text');
  if (typeOfChange === "drag") {
    updateUseEffectForDrag = false;
    control.setMode("translate");
    control.showY = false;
    control.showX = true;
    control.showZ = true;
  } else if (typeOfChange === "rotate") {
    updateUseEffectForRotate = false;
    control.setMode("rotate");
    control.showX = false;
    control.showZ = false;
    control.showY = true;
  } else {
    hideTransformControl(control);
  }
};





function addSelectedObject(object) {
  // для обведения модели
  selectedObjects = [];
  selectedObjects.push(object);
}


// ОСНОВНЫЕ ФУНКЦИИ РАБОТЫ С ОБЪЕКТАМИ
function addTransformControl(model) {

  if (model.parent && !model.userData.locked) {

    model.userData.currentPosition = new THREE.Vector3();
    // реагирует на все изменения 
    control.addEventListener("change", render);

    control.addEventListener("mouseDown", () => {
      control.userData.active = true;
      console.log(' active');
    });
    // при перетягивании
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
    control.addEventListener(
      "dragging-changed",
      (event) => cameraControlsEnable(event, cameraControls),
      false
    );

    control.addEventListener(
      "dragging-changed", () => {
        control.userData.active = false;
        console.log(' dont active');

      }
    );

    control.userData.name = "transformControl";


    scene.add(control);
    showAxesControl(movingStatus, control, 'add TC');
    control.attach(model);

  } else {
    console.log('elem blocked');
    // возмоно понадобится тут удалить стрелки хз как правда
    // showAxesControl(null);
  }

}
// отправляет данные в стор 
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
  if (model.userData.type === 'MODEL' || model.userData.type === 'FLOOR_SHAPE') {
    resetSelectedModelDispatch();
    hideTransformControl(control);
  }
}

function isModel(model) {
  if (model.userData.type === 'MODEL') {
    return true
  }
}
function isSurface(model) {
  if (model.userData.type === 'FLOOR_SHAPE') {
    return true
  }
}
function isSelected(model) {
  if (model.userData.selected) {
    return true
  } else {
    return false
  }
}

// status для modellist чтоб понимать откуда клик 
function highlightModel(model) {
  if (cameraStatus !== 'panorama') {
    // если клик не четный и если модель уже не была выбранна
    if (model.userData.click % 2 > 0 && isSelected(model) === false) {

      if (isModel(model)) {
        selectModelDispatch(model.userData);
      } else if (isSurface(model)) {
        selectSurfaceDispatch(model.userData.id)
      
        // break
      }
      // debugger;
      removeAllHightLight(scene.children, model);
      console.log(" добавляем подсветку, удаляя предыдущие ");
      needArrow = true;
      needOutline = true;
      model.userData.selected = true;
      addSelectedObject(model);
      outlinePass.selectedObjects = selectedObjects;

    }
    else if (model.userData.click % 2 === 0 && model.userData.click > 1) {

      if (isModel(model)) {
        selectModelDispatch(model.userData);

      } 
      else if (isSurface(model)) {
        selectSurfaceDispatch(model.userData.id)
      }
      console.log(" кликнутая модель");
      model.userData.selected = true;
      needOutline = true;
      removeAllHightLight(scene.children, model);
    } else if (isSelected(model)) {
      if (isModel(model)) {
        selectModelDispatch(model.userData);
      } else if (isSurface(model)) {
        selectSurfaceDispatch(model.userData.id)
      }
      // если повторно кликаем на одну и ту же модель
      console.log("кликаем на одну и ту же модель");
      needArrow = false;
      needOutline = false;
      removeHightLight(model);
      model.userData.selected = false;
      movingStatus = null; // если нужно оставлять стрелки после снятия выделения - убрать null 
      // resetSelectedModelDispatch()
    }
  }

}


// function onClick(event) {
//   if (cameraStatus !== 'panorama') {
//     getMouseCoord(event, canvas, mouse);
//     checkingClick();
//   } else {
//     // нужно выделять както стену после того как двигали модель
//   }
// }


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


//  для клика по стенам и полу
function onClick(event) {
  if (cameraStatus !== 'panorama') {
    getMouseCoord(event, canvas, mouse);

    raycaster.setFromCamera(mouse, cameraPersp);
    var intersects = raycaster.intersectObjects(wallList, true);

    if (intersects.length > 0) {
      let event = intersects[0];
      // isClickForTC(event)
      if (event.object.userData.type === "FLOOR_SHAPE") {
        const root = intersects[0].object;
        let eventId = root.userData.id;
        // console.log(' светим пол ');
        if (!control.userData.active) {
          root.userData.click += 1;
          // console.log(' светим пол ');
          highlightModel(root, null);
          needOutline = true;
          hideTransformControl(control);
          // selectSurfaceDispatch(eventId);
        }
      } else if (event.object.userData.type === "WALL") {
        let eventId = intersects[0].object.userData.id;
        let side = Math.floor(event.faceIndex / 2);
        selectWallDispatch(eventId, side);
        const root = intersects[0].object;
        root.userData.click += 1;
        highlightModel(root, null);
        hideTransformControl(control)
      } else if (event.object.type === "MODEL") {
        console.log(' в checking click нашел модель ');
        // const root = intersects[0].object.children[0];
        // root.userData.click += 1;
        // highlightModel(root, null);
      }
    }

  }
}
//  ОБРАБОТЧИКИ СОБЫТИЙ

control.addEventListener("mouseUp", (event) => sendPosition(event, transformControledModel));
window.addEventListener("resize", () => onWindowResize(cameraPersp, renderer));
canvas.addEventListener("mousedown", onClick);

// функции только для three js 
function main() {
  init();
  animate();
}
function render() { // не переносится 
  renderer.render(scene, cameraPersp);
}
function init() {
  initRenderer(renderer);
  initScene(scene);
  initCamera(cameraPersp);
  initPointLight(scene);
  // initFloor(scene);
  initControls(cameraPersp, renderer.domElement);
  initOutlineComposer(scene, cameraPersp, renderer); // для обводки
  ref.current.appendChild(renderer.domElement);
}

function animate() {

  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  const hasControlsUpdated = cameraControls.update(delta);
  clickManager.update();
  // для обводки
  if (hasControlsUpdated) {
    renderer.render(scene, cameraPersp);
    composer.render();
  } else if (needOutline) {
    composer.render();
  } else {
    renderer.render(scene, cameraPersp);
  }
}

export { clickManager };
