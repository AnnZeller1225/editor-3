import "./styles.css";

import React from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";
import TextureList from "../texture-list/texture-list";
import ModelList from "../model-list/model-list";
import ModalForConfirm from "../modal-confirm";
import { bindActionCreators } from "redux";
import * as actions from "../../actions";
const ModalWindow = ({
  modal,
  resetModal,
  saveChanges
}) => {

  let text;
  if (modal.typeOfChange === "replace") {
    text = "заменить элемент";
  } else if (modal.typeOfChange === "add_model") {
    text = "добавить элемент";
  } else if (modal.typeOfChange === "change_texture") {
    text = "изменить текстуру";
  } 
  else if (modal.typeOfChange === "add_furnishings_wall") {
    text = "добавить предмет интерьера на стену";
  }else {
    text = "другое действие";
  }

  if (modal.typeOfChange === "delete_model") {
    return <ModalForConfirm />
  } else {
    return (

      <div className={modal.isOpen ? "modal-w" : "hide"}>
        <div className="modal">
          <h2>{text}</h2>
          {modal.typeOfChange === "change_texture" ? <TextureList /> : null}
          {modal.typeOfChange === "replace" ? <ModelList status={modal.typeOfChange} /> : null}
          {modal.typeOfChange === "add_model" ? <ModelList status={modal.typeOfChange} /> : null}

          {modal.typeOfChange === "add_furnishings_wall" ? <ModelList status={modal.typeOfChange} /> : null}


          <div className="btn-w">
            <button className="modal-btn" onClick={() => saveChanges()}>
              Сохранить изменения
            </button>
            <button className="modal-btn btn-reset" onClick={() => resetModal()}>
              Отмена
            </button>
          </div>
        </div>
      </div>


    );
  }
};


const mapStateToProps = (state) => {
  return {
    modal: state.main.modal
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...actions,
  }, dispatch);
}
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ModalWindow
);
