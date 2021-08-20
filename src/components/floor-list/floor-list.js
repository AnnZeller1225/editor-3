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
  selectModel,
  changeVisibilityModel,
  lockModel, activeInList,
  activeObject, selectedInModelList, selectTypeOfChange
}) => {
// вывести в 1 переменную 
  let activeModel = activeInList.selectedModel.id;
  let activeModel2 = activeObject.selectedModel.id;


  let activeWall = activeInList.wall.id;
  let activeWall2 = activeObject.wall.id;

  let activeFloor = activeInList.surface.id;
  let activeFloor2 = activeObject.surface.id;

  const { surfaces, walls } = project_1;
  const { floorCeiling } = project_1;

  const handlerCLickModel = (el) => {
    selectModel(el, 'from-list');
    selectTypeOfChange('replace')
  }
  const handlerCLickSurface = (el) => {
    selectModel(el, 'from-list');
    selectTypeOfChange('change_texture')
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
                  className={el.id === (activeModel || activeModel2) ? "list-item active" : "list-item"}

                  id={el.id}
                  onClick={() => selectedInModelList(el)}
                >
                  {el.name}
                </div>
                <div className="list-item-wrap-img">
                  <div
                    className="list-item-img"
                    onClick={() => lockModel(el.id)}
                  >
                    <img src={el.locked ? lockImg : unlockImg} alt="Logo" />
                  </div>
                  <div
                    className="list-item-img"
                    onClick={() => changeVisibilityModel(el)}
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
                    onClick={() => selectTypeOfChange("delete_model", el)}
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
              <div className="list-item-w" key={index}>
                <div
                  className={el.id === (activeWall || activeWall2) ? "list-item active" : "list-item"}
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

            {/* ПОЛ  */}
            {floorCeiling.map((el, index) => (
              <div className="list-item-w" key={index}>
                <div
                  className={el.id === (activeFloor || activeFloor2) ? "list-item active" : "list-item"}
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

            {/* <div className="list-item-w" key="0">
              <div
                className={floor.id === (activeFloor || activeFloor2) ? "list-item active" : "list-item"}
                id={floor.id}
                onClick={() => selectedInModelList(floor)}
              >
                {floor.name}
              </div>
              <div className="list-item-wrap-img">
                <div
                  className="list-item-img"
                  onClick={() => handlerCLickSurface(floor)}
                >
                  <img src={editImg} alt="Logo" />
                </div>
              </div>
            </div> */}


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
