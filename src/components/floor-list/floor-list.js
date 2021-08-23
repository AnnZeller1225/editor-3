import React from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";
import FloorPlane from "../floorplane";
import hideEye from "../../img/icons/hidden.png";
import visibleEye from "../../img/icons/visible.png";
import lockImg from "../../img/icons/lock.png";
import unlockImg from "../../img/icons/unlock.png";
import editImg from "../../img/icons/edit.png";
import basketImg from "../../img/icons/basket.png";
import { bindActionCreators } from "redux";
import * as actions from "../../actions";
import "./floor-list.css";

const FloorList = ({
  project_1,
  dispatchSelectModel,
  dispatchChangeVisibilityModel,
  dispatchLocModel, activeInList,
  activeObject, selectedInModelList, dispatchSelectTypeOfChange, dispatchSelectSurface, dispatchSelectWall
}) => {
  // по скользку есть ошибка с позиционированием всего блока стен, индексы берутся примерные - при перерасчетах будем переделывать ( не соблюден угол поворота стен, ошибка в 45градусов)

  const insideWallInd = 4; // внутренняя сторона
  const outsideWallInd = 5;  // внешняя сторона


  let activeModelId = activeInList.selectedModel.id ? activeInList.selectedModel.id : activeObject.selectedModel.id;
  // let activeModel2 = activeObject.selectedModel.id;

  let activeFloorId = activeInList.surface.id ? activeInList.surface.id : activeObject.surface.id;

  let activeWallId = activeObject.wall.id ? activeObject.wall.id : activeInList.wall.id;
  let indexWall = activeObject.wall.id ? activeObject.wall.sideInd : activeInList.wall.sideInd
  const { surfaces, walls } = project_1;
  const { floorCeiling } = project_1;

  const handlerCLickModel = (el) => {
    if (el.id !== activeModelId) {
      dispatchSelectModel(el, 'from-list');
      dispatchSelectTypeOfChange('replace')

    } else {
      dispatchSelectTypeOfChange('replace')
    }
  }
  const handlerCLickSurface = (el, sideInd) => {
    if (!sideInd) { // если это не стена
      if (el.id !== activeFloorId) {
        dispatchSelectSurface(el.id, 'from-list');
        dispatchSelectTypeOfChange('change_texture')

      } else {
        dispatchSelectTypeOfChange('change_texture')
      }
    } else {
      if (el.id !== activeWallId) {
        dispatchSelectWall(el.id, sideInd);
        dispatchSelectTypeOfChange('change_texture')

      } else {
        dispatchSelectTypeOfChange('change_texture')
      }
    }


  }
  return (
    <div className="floor-list-wrap">
      <div className="floor-w">
        <div className="block">
          <span className="block-title">Мебель</span>
          <div className="list">
            {/* МЕБЕЛЬ */}
            {surfaces.map((el, index) => (

              <div className="list-item-w" key={index}>
                <div
                  className={el.id === activeModelId ? "list-item active" : "list-item"}

                  id={el.id}
                  onClick={() => selectedInModelList(el)}
                >
                  {el.name}
                </div>
                <div className="list-item-wrap-img">
                  <div
                    className="list-item-img"
                    onClick={() => dispatchLocModel(el.id)}
                  >
                    <img src={el.locked ? lockImg : unlockImg} alt="Logo" />
                  </div>
                  <div
                    className="list-item-img"
                    onClick={() => dispatchChangeVisibilityModel(el)}
                  >
                    <img src={el.visible ? visibleEye : hideEye} alt="Logo" />
                  </div>


                  <div
                    className="list-item-img"
                    onClick={() => handlerCLickModel(el)}
                  >
                    <img src={editImg} alt="Logo" />
                  </div>
                  <div
                    className="list-item-img"
                    onClick={() => dispatchSelectTypeOfChange("delete_model", el)}
                  >
                    <img src={basketImg} alt="Logo" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* СТЕНЫ И ПОЛ */}
        <div className="block">
          <span className="block-title">Комната</span>
          <div className="list">
            {walls.map((el, index) => (

              <div className={el.id === activeWallId ? "list-item-w active-t" : "list-item-w"} key={index}>
                <p className="list-item__title">{el.name}</p>

                <div
                  className={el.id === activeWallId && indexWall === insideWallInd ? "list-item active-t2" : "list-item"}
                >
                  <span onClick={() => handlerCLickSurface(el, insideWallInd)}>
                  {el.textures[2].name}
                </span>
                  <div
                    className="list-item-img"
                    onClick={() => handlerCLickSurface(el, insideWallInd)}
                  >
                    <img src={editImg} alt="Logo" />
                  </div>
                </div>
                <div
                  className={el.id === activeWallId && indexWall === outsideWallInd ? "list-item active-t2" : "list-item"}

                  // onClick={() => handlerCLickSurface(el, outsideWallInd)}

                >
                  <span onClick={() => handlerCLickSurface(el, outsideWallInd)}>
                    {el.textures[3].name}
                    </span>
                  {/* {el.textures[3].name} */}

                  <div
                    className="list-item-img"
                    onClick={() => handlerCLickSurface(el, outsideWallInd)}
                  >
                    <img src={editImg} alt="Logo" />
                  </div>
                </div>
                {/* {el.name}
                  <div className="list-item__sub">
                    {el.textures[2].name}
                    </div>
                  <div className="list-item__sub">
                    {el.textures[3].name}</div> */}

                {/* <div className="list-item-wrap-img">
                  <div
                    className="list-item-img"
                    onClick={() => handlerCLickSurface(el)}
                  >
                    <img src={editImg} alt="Logo" />
                  </div>
                </div> */}
              </div>
            ))}

            {/* ПОЛ  */}
            {floorCeiling.map((el, index) => (
              <div className="list-item-w" key={index}>
                <div
                  className={el.id === activeFloorId ? "list-item active" : "list-item"}
                  id={el.id}
                  onClick={() => selectedInModelList(el)}
                >
                  {el.name}
                </div>
                <div className="list-item-wrap-img">
                  <div
                    className="list-item-img"
                    onClick={() => handlerCLickSurface(el)}
                  >
                    <img src={editImg} alt="Logo" />
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
      <FloorPlane />
    </div>
  );
};

const mapStateToProps = ({ project_1, changingModels, currentWall, textureList, activeObject, activeInList }) => {
  return {
    project_1, activeInList,
    changingModels,
    currentWall,
    textureList,
    activeObject
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...actions,
  }, dispatch);
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  FloorList
);
