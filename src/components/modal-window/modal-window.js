import "./styles.css";

import React from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { resetModal, saveChanges } from "../../actions";
import TextureList from "../texture-list/texture-list";
import ModelList from "../model-list/model-list";
import ModalForConfirm from "../modal-confirm";

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
  } else {
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


const mapStateToProps = ({ modal,
}) => {
  return {
    modal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => dispatch(resetModal()),
    saveChanges: () => dispatch(saveChanges())
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ModalWindow
);
