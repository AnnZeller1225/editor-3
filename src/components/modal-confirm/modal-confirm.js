import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "../../utils";
import "./modal-confirm.css";
// import { confirmModal } from "../../actions";
import * as actions from "../../actions"


const ModalForConfirm = ({ modalForConfirm, confirmModal }) => {
  console.log(modalForConfirm, 'modalForConfirm');
  return (
    <div className={(modalForConfirm.isOpen) ? "phone-confirm" : "hide"}>
      <div className="confirm-w">
        <p>Вы уверены, что хотите удалить элемент?</p>
        <div className="confirm-btns">
          <button className="modal-item" onClick={() => confirmModal(true)}>
            Да
          </button>
          <button className="modal-item" onClick={() => confirmModal(false)}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ modalForConfirm }) => {
  return {
    modalForConfirm,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...actions,
  }, dispatch);
}

// export default ModalForConfirm
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ModalForConfirm
);
