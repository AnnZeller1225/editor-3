import React from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./home-page.css";
import hand from "../../img/icons/drag.png";
import rotate from "../../img/icons/rotate.png";
import rotate2 from "../../img/icons/arrow-rotate.png";
import Navigation from "../navigation";
import addImg from "../../img/icons/add.png";
import handImg from "../../img/icons/hand.svg";
import textureImg from "../../img/icons/texture.png";

import arrowImg from "../../img/icons/arrow.png";
import FloorList from "../floor-list";
import Modal from "../modal-window";

import { bindActionCreators } from "redux";
import * as actions from "../../actions";

const HomePage = ({
  selectTypeOfChange,
  changeStatusCamera,
  activeObject,
  camera, 
  selectActionModel
}) => {
  return (
    <div>
      <Modal />
      <Navigation />
      <div className="main">
        <div className="instrum">
          <div className="controls">
            <div
              className={
                camera.status === "panorama"
                  ? "controls-btn hand controls-btn__active-cam"
                  : "controls-btn hand"
              }
              onClick={() => changeStatusCamera("panorama")}
            >
              <img src={handImg} alt="Logo" />
            </div>{" "}


            <div
              className={
                camera.status === "default"
                  ? "controls-btn hand controls-btn__active-cam"
                  : "controls-btn hand"
              }
              onClick={() => changeStatusCamera("default")}
            >
              <img src={arrowImg} alt="Logo" />
            </div>{" "}

            <div
              className={
                activeObject.action === "drag"
                  ? "controls-btn hand controls-btn__active"
                  : "controls-btn hand"
              }
              onClick={() => selectActionModel("drag")}
            >
              <img src={hand} alt="Logo" />
            </div>{" "}
            <div
              className={
                activeObject.action === "rotate"
                  ? "controls-btn controls-btn__active"
                  : "controls-btn"
              }
              onClick={() => selectActionModel("rotate")}
            >
              {" "}
              <img src={rotate} alt="Logo" />
            </div>{" "}
            <div
              className="controls-btn"
              // onClick={() => selectTypeOfChange("cancel")}
            >
              <img src={rotate2} alt="Logo" />
            </div>{" "}
            {/* <div
              className="controls-btn"
              onClick={() => selectTypeOfChange("replace")}
            >
              <img src={change} alt="Logo" />
            </div>{" "} */}
            {/* <div
              className="controls-btn"
              onClick={() => selectTypeOfChange("change_texture")}
            >
              <img src={textureImg} alt="Logo" />
            </div> */}
            <div
              className="controls-btn"
              onClick={() => selectTypeOfChange("add_model")}
            >
              <img src={addImg} alt="Logo" />
            </div>

           

          </div>

        </div>
      </div>{" "}
      <FloorList />
    </div>
  );
};


const mapStateToProps = ({ activeObject, camera }) => {
  return {
    activeObject,
    camera,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...actions,
  }, dispatch);
}


export default compose(connect(mapStateToProps, mapDispatchToProps))(
  HomePage
);
