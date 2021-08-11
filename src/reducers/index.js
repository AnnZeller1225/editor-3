import cloneDeep from "lodash/cloneDeep";
// import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
const initialState = {
    project_1: {
        surfaces: [
   
            {
                id: "4",
                name: "Стул красный",
                type: "MODEL",
                url: "./models/chair_03_red.glb",
                dots: { x: "-1", y: "0", z: "-3.5" },
                rotate: 0,
                moveOnly: "XZ",
                visible: true,
                locked: false,
            },
            {
                id: "2",
                name: "Двери",
                type: "MODEL",
                url: "./models/doors.glb",
                scale: "1",
                dots: { x: "1", y: "0", z: "-1" },
                rotate: 1.5,
                moveOnly: "XZ",
                visible: true,
                locked: false,
            },
            // {
            //     id: "1",
            //     name: "Стол круглый",
            //     type: "MODEL",
            //     url: "./models/table_03.glb",
            //     dots: { x: "1", y: "0", z: "0" },
            //     rotate: 0,
            //     moveOnly: "XZ",
            //     visible: true,
            //     locked: true,
            // },
            // {
            //     id: "3",
            //     name: "Телевизор",
            //     type: "MODEL",
            //     url: "./models/TV.glb",
            //     dots: { x: "1.5", y: "0", z: "-2" },
            //     rotate: 0,
            //     moveOnly: "XZ",
            //     visible: true,
            //     locked: false,
            // },

            // {
            //     id: "5",
            //     name: "Стол-пианино",
            //     type: "MODEL",
            //     url: "./models/table_04.glb",
            //     dots: { x: "0.1", y: "0", z: "-2.5" },
            //     rotate: 0,
            //     moveOnly: "XZ",
            //     visible: true,
            //     locked: false,
            // },
            // {
            //   id: "6",
            //   name: "TV",
            //  type: "MODEL",
            //   url: "./models/TV.glb",
            //   dots: { x: "1.5", y: "0", z: "-2.5" },
            //   rotate: 0,
            //   moveOnly: "XZ",
            //   visible: true,
            //   locked: false,
            // },
            // {
            //   id: "7",
            //   name: "red chair",
            //  type: "MODEL",
            //   url: "./models/chair_03_red.glb",
            //   dots: { x: "-1", y: "0", z: "-2.5" },
            //   rotate: 0,
            //   moveOnly: "XZ",
            //   visible: true,
            //   locked: false,
            // },
            // {
            //   id: "8",
            //   name: "bezh chair",
            //  type: "MODEL",
            //   url: "./models/chair_04_bezh.glb",
            //   dots: { x: "1", y: "0", z: "-3.5" },
            //   rotate: 0,
            //   moveOnly: "XZ",
            //   visible: true,
            //   locked: false,
            // }
        ],
        walls: [
            // {
            //     name: "wall_1",
            //     type: "wall",
            //     id: "100",
            //     dots: { x: "0", z: "0", x2: "0", z2: "2" },
            //     width: "0.1",
            //     height: "1",
            //     textures: [{
            //         // боковые часть 
            //         id: "1",
            //         width: "0.5",
            //         height: "0.5",
            //         url: "обои2.jpg",
            //     },
            //     {
            //         // потолок
            //         id: "2",
            //         width: "0.2", //длина кирпича
            //         height: "0.1", // ширина
            //         url: "kirp.jpg",
            //     },
            //     {
            //         //   индекс 4
            //         id: "3",
            //         width: "1",
            //         height: "1",
            //         url: "обои.jpg",
            //     },
            //     {
            //         // внутренная часть индекс 5
            //         id: "1",
            //         width: "0.5",
            //         height: "0.5",
            //         url: "камень2.jpg",
            //     },
            //     ],
            // },
            // {
            //   name: "wall_2",
            //   id: "101",
            //   type: "wall",
            //   dots: { x: "0", z: "2", x2: "3", z2: "2" },
            //   width: "0.1",
            //   height: "1",
            //   textures: [
            //     {
            //       // фронтальная часть
            //       id: "1",
            //       width: "0.5",
            //       height: "0.5",
            //       url: "50.jpg",
            //     },
            //     {
            //       // потолок
            //       id: "2",
            //       width: "0.2", //длина кирпича
            //       height: "0.1", // ширина
            //       url: "kirp.jpg",
            //     },
            //     {
            //       //  боковые
            //       id: "3",
            //       width: "0.1",
            //       height: "0.1",
            //       url: "2323.jpg",
            //     },
            //     {
            //       // внутренная часть
            //       id: "1",
            //       width: "0.5",
            //       height: "0.5",
            //       url: "50.jpg",
            //       // url: "Inkedplitka-long_LI.jpg",
            //     },
            //   ],
            // },
        ],
        floor: {
            id: "1",
            type: "FLOOR_SHAPE",
            texture: {
                width: "0.5",
                // url: "lam2.jpeg",
                //  url: "кирпич.jpg",
                // url: "камень4.jpg",
                url: "lam2.jpeg",
                // url: "50.jpg",
                // url: "laminat.jpg",
                // 
            },

            dots: [
                { x: "0", y: "0", z: "0" },
                { x: "0", y: "0", z: "15" },
                { x: "20", y: "0", z: "15" },
                { x: "20", y: "0", z: "10" },
                { x: "10", y: "0", z: "0" },
                { x: "0", y: "0", z: "0" },
            ],
        },
    },

    activeObject: {
        wall: '',
        surface: {},
        replaceBy: '',
        action: '',
        isSave: false,
        newTexture: {},
        newModel: {},
        selectedModel: {},
        lockModel: {},
    },
    // выбранные из списков а не по клику
    activeInList: {
        wall: '',
        surface: {},
        replaceBy: '',
        action: '',
        isSave: false,
        newTexture: {},
        newModel: {},
        selectedModel: {},
        lockModel: {},
    },
    changingModels: {
        typeOfChange: "",
        prev: {},
        next: {},
    },
    // модели для замены
    modelList: [{
        id: "20",
        name: "Стул серый",
        type: "MODEL",
        url: "./models/chair_02.glb",
        scale: "1",
        texture: "./url",
        texture_width: "1",
        rotate: 0,
        dots: { x: "0", y: "0", z: "0" },
        visible: true,
        locked: false,
    },
    {
        id: "21",
        name: "Стол черный ",
        type: "MODEL",
        url: "./models/table_03.glb",
        dots: { x: "3", y: "0", z: "0" },
        rotate: 0,
        moveOnly: "XZ",
        visible: true,
        locked: false,
    },
    {
        id: "31",
        name: "Стол-пианино",
        type: "MODEL",
        url: "./models/table_04.glb",
        scale: "1",
        rotate: 0,
        dots: { x: "0", y: "0", z: "0" },
        visible: true,
        locked: false,
    },
    {
        id: "22",
        name: "Диван бежевый",
        type: "MODEL",
        url: "./models/sofa_02.glb",
        scale: "1",
        rotate: 0,
        dots: { x: "0", y: "0", z: "0" },
        visible: true,
        locked: false,
    },
    {
        id: "26",
        name: "Тумба",
        type: "MODEL",
        url: "./models/tumba.glb",
        width: "0.1",
        texture: "red",
        texture_width: "1",
        texture2: "blue",
        dots: { x: "2", y: "0", z: "2" },
        color: "red",
        visible: true,
        locked: false,
    },
    ],
    textureList: [
        // {
        //   name: "плитка",
        //   id: "1",
        //   width: "0.5",
        //   height: "0.5",
        //   url: "50.jpg",
        // },
        // {
        //   name: "кирпич", // кирпич
        //   id: "2",
        //   width: "0.2", //длина кирпича
        //   height: "0.1", // ширина
        //   url: "kirp.jpg",
        // },

        // {
        //   name: "кирпич красный", // кирпич
        //   id: "3",
        //   width: "1", //длина кирпича
        //   height: "1", // ширина
        //   url: "кирпич.jpg",
        // },

        // {
        //   name: "паркет-темный", // кирпич
        //   id: "4",
        //   width: "0.2", //длина кирпича
        //   height: "0.1", // ширина
        //   url: "паркет-темный.jpg",
        // },
        {
            name: "паркет", // кирпич
            id: "5",
            width: "1", //длина кирпича
            height: "1", // ширина
            url: "паркет.jpg",
        },
        {
            name: "обои", // кирпич
            id: "6",
            width: "1", //длина кирпича
            height: "1", // ширина
            url: "обои.jpg",
        },
        {
            name: "обои2", // кирпич
            id: "7",
            width: "1", //длина кирпича
            height: "1", // ширина
            url: "обои2.jpg",
        },
        {
            name: "обои3", // кирпич
            id: "11",
            width: "1", //длина кирпича
            height: "1", // ширина
            url: "обои3.jpg",
        }, // 
        {
            name: "камень4", // кирпич
            id: "8",
            width: "1", //длина кирпича
            height: "1", // ширина
            url: "камень4.jpg",
        },
        // {
        //   name: "камень3", // кирпич
        //   id: "9",
        //   width: "1", //длина кирпича
        //   height: "1", // ширина
        //   url: "камень3.jpg",
        // },
        // {
        //   name: "камень2", // кирпич
        //   id: "10",
        //   width: "1", //длина кирпича
        //   height: "1", // ширина
        //   url: "камень2.jpg",
        // },
        //   url:  
    ],
    // addedModel: {},
    camera: {
        status: "default",
    },
    modal: {
        isOpen: false,
        typeOfChange: '',
    },
    modalForConfirm: {
        isOpen: false,
        confirmed: false
    },
    resetTransformControl: false
};



const changeVisibilityModel = (state, payload) => {
    const { project_1, activeObject } = state;
    // console.log("changeVisibility");
    const index = findIndex(project_1.surfaces, payload.id);
    const model = project_1.surfaces[index];
    model.visible = !model.visible;
    let updateState = { ...project_1 };
    updateState.surfaces[index] = { ...model };

    return {
        ...state,
        project_1: updateState,
        activeObject: { ...activeObject, selectedModel: model, action: "change_visibility" }
    };
};

// const replaceModel = (state) => {
//     return {
//         ...state,
//         changingModels: { typeOfChange: "", prev: {}, next: {} },
//     };
// };
// на что меняем
const selectReplaceBy = (state, payload) => {
    const { activeObject } = state;
    let newModel = payload;

    return {
        ...state,
        activeObject: { ...activeObject, newModel: newModel }
    }
};
const selectModel = (state, payload, from) => {
    const { activeObject, activeInList } = state;
    let { id, name, type, url, dots, rotate, moveOnly, visible, locked } = payload;

    let updateModel = {
        id: id,
        name: name,
        type: type,
        url: url,
        dots: dots,
        rotate: rotate,
        moveOnly: moveOnly,
        visible: visible,
        locked: locked
    }


    // тут сбрасывает на пустой массив когда кликаешь по одному и тому же
    let activeModel;
    if (from) {
        activeModel = updateModel;
    } else {
        activeModel = payload.id !== activeObject.selectedModel?.id ? updateModel : {};
    }
 
    if (activeModel?.id) {
        return {
            ...state,
            activeObject: { ...activeObject, selectedModel: activeModel },
            activeInList: { ...activeInList, selectedModel: {} }
        };

    } else {
        return {
            ...state,
            activeObject: { ...activeObject, selectedModel: activeModel },
            activeInList: { ...activeInList, selectedModel: {} }
        };
    }
    // let action = activeObject.action === "change_locked" ? '' : activeObject.action;
};
const findIndex = (arr, modelId) => {
    const findIndex = arr.findIndex(({ id }) => id === modelId);
    return findIndex;
};

const changePositionModel = (state, payload) => {
    const { project_1, activeObject, } = state;
    const index = findIndex(project_1.surfaces, payload.id);
    const model = project_1.surfaces[index];
    let x = payload.dots.x;
    let y = payload.dots.y;
    let z = payload.dots.z;
    if (activeObject.selectedModel?.id && model) {
        model.dots = { x, y, z };
        model.rotate = payload.rotate;
        project_1.surfaces[index] = { ...model };

        let selectedModel = activeObject.selectedModel;
        selectedModel.dots = model.dots;
        selectedModel.rotate = payload.rotate;
        let updateActiveObject = {
            ...activeObject, selectedModel: {
                ...selectedModel
            }
        }
        return {
            ...state,
            project_1: project_1,
            activeObject: updateActiveObject
        }
    } else if (model) {
        model.dots = { x, y, z };
        model.rotate = payload.rotate;
        project_1.surfaces[index] = { ...model };
        return {
            ...state,
            project_1: project_1
        };
    } else {
        console.log("exseption changePositionModel ");
        return {
            ...state
        }
    }
};

const selectTypeOfChange = (state, payload) => {
    const { modal, activeObject, modalForConfirm } = state;

    if (payload === 'delete_model' && activeObject.selectedModel?.id) {
        return {
            ...state,
            modal: { ...modal, typeOfChange: payload, isOpen: true },
            activeObject: { ...activeObject, action: payload },
            modalForConfirm: {
                ...modalForConfirm,
                isOpen: true
            }
        };
    } else {
        let status = modal.typeOfChange === payload ? 'reset' : payload;
        return {
            ...state,
            modal: { ...modal, typeOfChange: status, isOpen: true },
            activeObject: { ...activeObject, action: status }
        };
    }

};
const addModel = (state, payload) => {
    const { activeObject } = state;
    return {
        ...state,
        activeObject: { ...activeObject, newModel: payload },
    };
}
const resetSelectedModel = (state) => {
    const { activeObject, modalForConfirm } = state;
    return {
        ...state,
        activeObject: {
            ...activeObject,
            // action: '',
            selectedModel: {},
            wall: '',
            surface: {},
            newModel: {},
            isSave: false
        },
        modalForConfirm: {
            ...modalForConfirm,
            confirmed: false
        }
    };
};
const changeStatusCamera = (state, status) => {
    const { camera, activeObject } = state;
    // console.log(status, 'status');

    return {
        ...state,
        camera: { ...camera, status: status },
        // activeObject: { ...activeObject, action: 'reset' }
    };
};
const selectTexture = (state, id) => {
    const { textureList, activeObject } = state;
    const index = findIndex(textureList, id);
    const texture = textureList[index];
    return {
        ...state,
        activeObject: { ...activeObject, newTexture: texture }

    };
}
const selectWall = (state, id, sideIndex) => {
    const { project_1, activeObject } = state;
    const index = findIndex(project_1.walls, id);
    const wall = project_1.walls[index];
    // console.log(' выбрали стену ', wall, sideIndex)
    return {
        ...state,
        activeObject: {
            ...activeObject,
            wall: { ...wall, sideInd: sideIndex },
        },
    };
};
const selectSurface = (state, id) => {
    const { activeObject, project_1 } = state;
    if (activeObject.surface.id === project_1.floor.id) {
        return {
            ...state,
            activeObject: { ...activeObject, surface: {} },
        };
    } else {
        return {
            ...state,
            activeObject: { ...activeObject, surface: project_1.floor },
        };
    }

};
const resetModal = (state) => {
    const { modal } = state;
    return {
        ...state, modal: { ...modal, isOpen: false }
    }
}

const getSurface = (obj, state) => {
    const { project_1 } = state;
    // const index = findIndex(project_1.surface, wall.id);
    let surf = project_1.floor;
    surf.texture = obj.newTexture

    return surf
}

const getWall = (obj, state, index) => {
    const { project_1 } = state;

    const newWall = project_1.walls[index];
    if (obj.wall.sideInd === 4) {
        newWall.textures[3] = obj.newTexture
    } else if (obj.wall.sideInd === 5) {
        newWall.textures[4] = obj.newTexture
    }
    return newWall;
}
function replaceArr(arr, ind, el) {
    let newArr = [
        ...arr.slice(0, ind - 1), 
        ...arr.slice(ind + 1),
    ]; //список оставшихся массивов
    return newArr
}
// тут меняем сам стор в зависимости от статуса модалки
const saveChanges = (state) => {
    const { modal, activeObject, project_1 } = state;
    let updateObject;
    const surfaces = project_1.surfaces;
    // меняем текстуру в редаксе 
    if (activeObject.action === 'change_texture') {
        if (activeObject.surface.id) {
            updateObject = getSurface(activeObject, state)
            return {
                ...state,
                project_1: {
                    ...project_1, floor: updateObject
                },
                activeObject: {
                    ...activeObject,
                    isSave: true,
                },
                modal: { ...modal, isOpen: false, typeOfChange: '' }
            }
        } else if (activeObject.wall.id) {
            let updateState = cloneDeep(project_1);
            const index = findIndex(project_1.walls, activeObject.wall.id);
            updateState.walls[index] = getWall(activeObject, state, index);

            return {
                ...state,
                project_1: { ...updateState },
                activeObject: {
                    ...activeObject,
                    isSave: true
                },
                modal: { ...modal, isOpen: false, typeOfChange: '' }
            }
        }
        else {
            return {
                ...state,
                activeObject: {
                    ...activeObject,
                    isSave: true
                },
                modal: { ...modal, isOpen: false, typeOfChange: '' }
            }
        }


    } else if (activeObject.action === 'add_model') {
        return {
            ...state,
            project_1: {
                ...project_1, surfaces: [...project_1.surfaces, activeObject.newModel],
            },
            activeObject: {
                ...activeObject,
                isSave: true
            },
            modal: { ...modal, isOpen: false, typeOfChange: '' }
        }

    } else if (activeObject.action === 'replace') {

        let newModel = activeObject.newModel;
        newModel.dots = activeObject.selectedModel.dots;

        let updateSurfaces = filterArr(surfaces, activeObject.selectedModel.id);
        updateSurfaces.push(newModel);
        return {
            ...state,
            project_1: {
                ...project_1, surfaces: updateSurfaces
            },
            activeObject: {
                ...activeObject,
                isSave: true
            },
            modal: { ...modal, isOpen: false, typeOfChange: '' }
        }
    } else {
        console.log('another action');
        return {
            ...state
        }
    }
}
// что делать с моделью - крутить - перемещать?
const selectActionModel = (state, payload) => {
    const { activeObject } = state;
    let action = payload === activeObject.action ? 'reset' : payload

    return {
        ...state, activeObject: { ...activeObject, action: action }
    }
}
const resetNewModel = (state) => {
    const { activeObject } = state;
    return {
        ...state,
        activeObject: { ...activeObject, newModel: {}, isSave: false }
    }
}

// const deleteItem = (arr, idx) => {
//     return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
// };


const filterArr = (arr, id) => {
    return arr = arr.filter(el => el.id !== id);
}
// подтверждение удаления модели 
const confirmModal = (state, payload) => {
    const { project_1, activeObject } = state;
    let updateSurfaces;
    const selectedId = activeObject.selectedModel.id;

    updateSurfaces = payload ? updateSurfaces = filterArr(project_1.surfaces, selectedId) : project_1.surfaces;

    return {
        ...state,
        project_1: {
            ...project_1, surfaces: updateSurfaces
        },
        modalForConfirm: {
            isOpen: false,
            confirmed: payload
        }
    }
}

const lockModel = (state, id) => {
    const { project_1, activeObject } = state;
    const index = findIndex(project_1.surfaces, id);
    const model = project_1.surfaces[index];
    model.locked = !model.locked;
    let updateState = { ...project_1 };
    updateState.surfaces[index] = { ...model };

    return {
        ...state,
        project_1: updateState,
        activeObject: { ...activeObject, lockModel: model }
    };

}

const resetLockModel = (state) => {
    const { activeObject } = state;

    return {
        ...state,
        activeObject: { ...activeObject, lockModel: {} }
    };

}
const selectedInModelList = (state, payload) => {

    const { activeInList, activeObject } = state;
    let { id, name, type, url, dots, rotate, moveOnly, visible, locked } = payload;

    let updateModel = {
        id: id,
        name: name,
        type: type,
        url: url,
        dots: dots,
        rotate: rotate,
        moveOnly: moveOnly,
        visible: visible,
        locked: locked
    }

    let activeModel = payload.id !== activeInList.selectedModel?.id ? updateModel : {};


    if (activeModel?.id) {
        return {
            ...state,
            activeInList: { ...activeInList, selectedModel: activeModel },
            activeObject: { ...activeObject, selectedModel: {} }
        };
    } else {
        return {
            ...state,
            activeInList: { ...activeInList, selectedModel: {} },
            activeObject: { ...activeObject, action: '' }
        };
    }


}
const resetTC = (state, payload)=> {
    const { resetTransformControl} = state;

    return {
        ...state,
        resetTransformControl: payload
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_POSITION_MODEL":
            return changePositionModel(state, action.payload);
        case "SELECT_MODEL":
            return selectModel(state, action.payload, action.from);
        case "SELECT_REPLACED_BY":
            return selectReplaceBy(state, action.payload);
        case "SELECT_TYPE_OF_CHANGE":
            return selectTypeOfChange(state, action.payload);
        // case "REPLACE_MODEL":
        //     return replaceModel(state);
        case "CHANGE_VISIBILITY_MODEL":
            return changeVisibilityModel(state, action.payload);
        case "ADD_MODEL":
            return addModel(state, action.payload);
        case "MOVE_CAMERA":
            return changeStatusCamera(state, action.payload);
        case "RESET_SELECTED_MODEL":
            return resetSelectedModel(state);
        case "SELECT_WALL":
            return selectWall(state, action.payload, action.index);
        case "SELECT_TEXTURE":
            return selectTexture(state, action.payload);
        case "SELECT_SURFACE":
            return selectSurface(state, action.payload);
        case "RESET_MODAL":
            return resetModal(state);
        case "SAVE_CHANGES":
            return saveChanges(state);
        case "SELECT_ACTION_MODEL":
            return selectActionModel(state, action.payload);
        case "RESET_NEW_MODEL":
            return resetNewModel(state);
        case "CONFIRM_MODAL":
            return confirmModal(state, action.payload);
        // 
        case "LOCK_MODEL":
            return lockModel(state, action.payload);

        case "RESET_LOCK_MODEL":
            return resetLockModel(state);
        case "SELECTED_IN_MODELLIST":
            return selectedInModelList(state, action.payload);
        case "RESET_TC":
            return resetTC(state, action.payload);
        default:
            return state;
    }
};
export default reducer;

// старый стор
//   {
//   id: "2",
//   name: "tumba",
//  type: "MODEL",
//   url: "./models/tumba.glb",
//   width: "0.1",
//   scale: '2',
//   texture: "red",
//   texture_width: "1",
//   texture2: "blue",
//   dots: { x: "1.9", y: "0", z: "-2" },
//   color: "red",
//   visible: true,
//   locked: false,
// },
// {
//   id: "3",
//   name: "Lamp",
//  type: "MODEL",
//   url: "./models/Lamp.glb",
//   width: "0.1",
//   texture: "red",
//   texture_width: "1",
//   texture2: "blue",
//   dots: { x: "0", y: "0", z: "-3.5" },
//   color: "red",
//   visible: true,
//   locked: false,
// },
//

// {
//   id: "6",
//   name: "door",
//  type: "MODEL",
//   url: "./models/table_04.glb",
//   scale: "1",
//   texture: "./url",
//   texture_width: "1",
//   dots: { x: "2", y: "0", z: "4" },
//   visible: true,
//   locked: true,
// },
// {
//   id: "7",
//   name: "Lamp_02",
//  type: "MODEL",
//   url: "./models/table_02.glb",
//   width: "0.1",
//   texture: "red",
//   texture_width: "1",
//   texture2: "blue",
//   dots: { x: "3", y: "0", z: "1" },
//   color: "red",
//   visible: true,
//   locked: false,
// },

// {
//   id: "8",
//   name: "table_03",
//  type: "MODEL",
//   url: "./models/table_03.glb",
//   scale: "1",
//   texture: "./url",
//   texture_width: "1",
//   dots: { x: "0", y: "0", z: "1" },
//   visible: true,
//   locked: false,
// },
// {
//   id: "9",
//   name: "door",
//  type: "MODEL",
//   url: "./models/table_04.glb",
//   scale: "1",
//   texture: "./url",
//   texture_width: "1",
//   dots: { x: "-2", y: "0", z: "5" },
//   visible: true,
//   locked: true,
// },
// {
//   id: "10",
//   name: "Lamp_02",
//  type: "MODEL",
//   url: "./models/table_02.glb",
//   width: "0.1",
//   texture: "red",
//   texture_width: "1",
//   texture2: "blue",
//   dots: { x: "-3", y: "0", z: "1" },
//   color: "red",
//   visible: true,
//   locked: false,
// },

// {
//   id: "11",
//   name: "door",
//  type: "MODEL",
//   url: "./models/doors.glb",
//   scale: "1",
//   texture: "./url",
//   texture_width: "1",
//   dots: { x: "-1.5", y: "0", z: "0" },
//   visible: true,
//   locked: true,
// },
// {
//   id: "12",
//   name: "tumba",
//  type: "MODEL",
//   url: "./models/tumba.glb",
//   width: "0.1",
//   scale: '2',
//   texture: "red",
//   texture_width: "1",
//   texture2: "blue",
//   dots: { x: "-3.5", y: "0", z: "2" },
//   color: "red",
//   visible: true,
//   locked: false,
// },
// {
//   id: "13",
//   name: "Lamp",
//  type: "MODEL",
//   url: "./models/Lamp.glb",
//   width: "0.1",
//   texture: "red",
//   texture_width: "1",
//   texture2: "blue",
//   dots: { x: "-1", y: "0", z: "4" },
//   color: "red",
//   visible: true,
//   locked: false,
// },
// //
// {
//   id: "14",
//   name: "TV",
//  type: "MODEL",
//   url: "./models/TV.glb",
//   width: "0.1",
//   texture: "red",
//   texture_width: "1",
//   texture2: "blue",
//   dots: { x: "3.7", y: "0", z: "-4.5" },
//   color: "red",
//   visible: true,
//   locked: false,
// },
// {
//   id: "15",
//   name: "table_03",
//  type: "MODEL",
//   url: "./models/table_03.glb",
//   scale: "1",
//   texture: "./url",
//   texture_width: "1",
//   dots: { x: "0", y: "0", z: "6" },
//   visible: true,
//   locked: false,
// },
// {
//   id: "16",
//   name: "door",
//  type: "MODEL",
//   url: "./models/table_04.glb",
//   scale: "1",
//   texture: "./url",
//   texture_width: "1",
//   dots: { x: "5", y: "0", z: "4" },
//   visible: true,
//   locked: true,
// },
// {
//   id: "17",
//   name: "Lamp_02",
//  type: "MODEL",
//   url: "./models/table_02.glb",
//   width: "0.1",
//   texture: "red",
//   texture_width: "1",
//   texture2: "blue",
//   dots: { x: "4.9", y: "0", z: "3.7" },
//   color: "red",
//   visible: true,
//   locked: false,
// },

// {
//   id: "18",
//   name: "table_03",
//  type: "MODEL",
//   url: "./models/table_03.glb",
//   scale: "1",
//   texture: "./url",
//   texture_width: "1",
//   dots: { x: "5", y: "0", z: "-4" },
//   visible: true,
//   locked: false,
// },
// {
//   id: "19",
//   name: "door",
//  type: "MODEL",
//   url: "./models/table_04.glb",
//   scale: "1",
//   texture: "./url",
//   texture_width: "1",
//   dots: { x: "-5", y: "0", z: "5" },
//   visible: true,
//   locked: true,
// },

// {
//   id: "1",
//   type: "wall",
//   dots: { x: "0", z: "0", x2: "2", z2: "0" },
//   width: "0.1",
//   height: "1",
//   textures: [
//     {
//       // фронтальная часть
//       id: "1",
//       width: "0.5",
//       height: "0.5",
//       url: "50.jpg",
//     },
//     { // потолок
//       id: "2",
//       width: "0.2", //длина кирпича
//       height: "0.1", // ширина
//       url: "kirp.jpg",
//     },
//     {
//       //  боковые
//       id: "3",
//       width: "0.1",
//       height: "0.1",
//       url: "2323.jpg"
//     },

//   ],
// },
// {
//   id: "4",
//   type: "wall",
//   dots: { x: "-1", z: "0", x2: "-2", z2: "1" },
//   width: "0.1",
//   height: "1",
//   textures: [
//     {
//       // фронтальная часть
//       id: "1",
//       width: "0.5",
//       height: "0.5",
//       url: "50.jpg",
//     },
//     { // потолок
//       id: "2",
//       width: "0.2", //длина кирпича
//       height: "0.1", // ширина
//       url: "kirp.jpg",
//     },
//     {
//       //  боковые
//       id: "3",
//       width: "0.1",
//       height: "0.1",
//       url: "2323.jpg"
//     },

//   ],
// },

// {
//   id: "7",
//   type: "wall",
//   dots: { x: "-1", z: "2", x2: "-1", z2: "3" },
//   width: "0.1",
//   height: "1",
//   textures: [
//     {
//       // фронтальная часть
//       id: "1",
//       width: "0.5",
//       height: "0.5",
//       url: "50.jpg",
//     },
//     { // потолок
//       id: "2",
//       width: "0.2", //длина кирпича
//       height: "0.1", // ширина
//       url: "kirp.jpg",
//     },
//     {
//       //  боковые
//       id: "3",
//       width: "0.1",
//       height: "0.1",
//       url: "2323.jpg"
//     },

//   ],
// },

// СТАРЫЙ КОД ДЛЯ ПРИМЕРА РАБОТЫ СО СТЕЙТОМ

// ид для добавления новых ворклогов, точка отсчета
// const deleteWorklog = (state, worklogId, data) => {
//   const { worklogList, favorites } = state;
//   if (data) {
//     const worklogIndex = worklogList[data].findIndex(
//       ({ id }) => id === worklogId
//     );
    // let newWorklog = [
    //   ...worklogList[data].slice(0, worklogIndex),
    //   ...worklogList[data].slice(worklogIndex + 1),
    // ]; //список оставшихся массивов

//     let newWorklogList = worklogList;
//     newWorklogList[data] = newWorklog;
//     return {
//       ...state,
//       worklogList: { ...newWorklogList },
//     };
//   } else {
//     const worklogIndex = favorites.findIndex(({ id }) => id === worklogId);
//     return {
//       ...state,
//       favorites: deleteItem(favorites, worklogIndex),
//     };
//   }
// };

// const deleteItem = (arr, idx) => {
//   return [...arr.slice(0, idx), ...arr.slice(idx + 1)]; // тут мы удаляем массив
// };

// const copyWorklog = (state, worklogId, data, nowDate) => {
//   id++;
//   const { worklogList, activeWorklogs, modal } = state;
//   const worklogIndex = worklogList[data].findIndex(
//     ({ id }) => id === worklogId
//   );
//   const worklog = [worklogList[data][worklogIndex]];
//   // нашли копируемый wl
//   let newWorklogList = cloneDeep(worklogList);
//   let newWorklog = worklog;
//   let seconds = nowDate.h * 60 * 60 + nowDate.min * 60;
//   let dateToday = nowDate.d + "." + nowDate.m + "." + nowDate.y;
//   const newIndex = newWorklog.findIndex(({ id }) => id === worklogId);

//   newWorklog[newIndex].isStarting = true;
//   newWorklog[newIndex].id = id;
//   newWorklog[newIndex].timeStart = seconds;
//   newWorklog[newIndex].timeStop = nowDate.h + "-" + nowDate.min; // тут число гетдэй

//   if (newWorklogList[`${dateToday}`]) {
//     newWorklogList[`${dateToday}`].push(worklog[0]);
//   } else {
//     newWorklogList[`${dateToday}`] = newWorklog;
//   }

//   let newActive = newWorklog;
//   newActive[0].data = `${dateToday}`;
//   // console.log(modal.status);
//   modal.status = "edit";
//   if (activeWorklogs.id) {
//     return {
//       ...state,
//     };
//   } else {
//     return {
//       ...state,
//       worklogList: newWorklogList,
//       activeWorklogs: newActive[0],
//       modal: changeModal(modal, "edit", false),
//     };
//   }
// };

// const addNewWl = (state, name, title, planingTime, seconds, todayDate) => {
//   id++;
//   const { worklogList, timeCounter } = state;
//   // let newPlaningTime = planingTime.split(".");
//   let newWorklogList = cloneDeep(worklogList);
//   console.log(seconds);
//   const worklog = {
//     id: id,
//     info: name,
//     title: title,
//     allTime: timeCounter,
//     timeStart: seconds,
//     timeStop: seconds + timeCounter,
//     isStarting: true,
//   };
//   if (newWorklogList[`${todayDate}`]) {
//     newWorklogList[`${todayDate}`].push({ ...worklog });
//   } else {
//     newWorklogList[`${todayDate}`] = [{ ...worklog }];
//   }

//   let newActive = [{ ...worklog }];
//   newActive[0].data = `${todayDate}`;
//   return {
//     ...state,
//     worklogList: newWorklogList,
//     activeWorklogs: newActive[0],
//   };
// };
// const changeModal = (modal, status, changeIsOpen) => {
//   let newModal;
//   if (status) {
//     newModal = {
//       isOpen: modal.isOpen,
//       status: `${status}`,
//     };
//   }
//   if (changeIsOpen) {
//     newModal = {
//       isOpen: !modal.isOpen,
//       status: modal.status,
//     };
//   }
//   if (status && changeIsOpen) {
//     newModal = {
//       isOpen: !modal.isOpen,
//       status: `${status}`,
//     };
//   } else {
//     // console.log(" нет совпадений  в cgangeModal");
//   }

//   return newModal;
// };
// const addToEditWl = (state, worklogId, data) => {
//   if (data) {
//     const { modal } = state;
//     const worklog = findWorklog(state, data, worklogId);
//     worklog.data = data;
//     return {
//       ...state,
//       editWorklog: [worklog],
//       modal: changeModal(modal, "edit", true),
//     };
//   } else {
//     const { favorites, modal } = state;
//     const worklogIndex = favorites.findIndex(({ id }) => id === worklogId);
//     const worklog = favorites[worklogIndex];
//     return {
//       ...state,
//       editWorklog: [worklog],
//       modal: changeModal(modal, "edit", true),
//     };
//   }
// };
// const findWorklog = (state, data, worklogId) => {
//   const { worklogList } = state;

//   const worklogIndex = worklogList[data].findIndex(
//     ({ id }) => id === worklogId
//   );
//   const worklog = worklogList[data][worklogIndex];
//   return worklog;
// };