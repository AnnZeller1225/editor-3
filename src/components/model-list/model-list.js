import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";
import {
    selectReplaceBy, addModel,
} from "../../actions";
import "./model-list.css";


const ModelList = ({ modelList, selectReplaceBy, status, addModel }) => {

    const [select, setSelect] = useState(null);
    const handlerClick = (el, func) => {
        setSelect(el.id);
        func(el)
    }
    if (status === 'replace') {
        return (
            <div className="texture-block">
                <ul>
                    {modelList.map((el, ind) => (
                        <li key={ind}
                            className={el.id === select ? 'active' : ''}
                            onClick={() => { handlerClick(el, selectReplaceBy) }}

                        >{el.name}</li>
                    ))}
                </ul>
            </div>
        )
    } else if (status === 'add_model') {
        return (
            <div className="texture-block">
                <ul>
                    {modelList.map((el, ind) => (

                        <li key={ind}
                            className={el.id === select ? 'active' : ''}
                            onClick={() => { handlerClick(el, addModel) }}
                        >{el.name}</li>
                    ))}
                </ul>
            </div>
        )
    }

}
class ModelListContainer extends Component {
    render() {
        const {
            modelList,
            selectReplaceBy,
            addModel,
            status
        } = this.props;

        return (
            <div>
                <ModelList
                    status={status}
                    modelList={modelList}
                    selectReplaceBy={selectReplaceBy}
                    addModel={addModel}
                />
            </div>
        );
    }
}


const mapStateToProps = ({ modelList }) => {
    return {
        modelList
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        selectReplaceBy: (id) => dispatch(selectReplaceBy(id)),
        addModel: (id) => dispatch(addModel(id))
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    ModelListContainer
);
