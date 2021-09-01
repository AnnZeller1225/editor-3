
const initialState = {
    project_1: {
        // модели
        surfaces: [

            // {
            //     id: "4",
            //     name: "Стул красный",
            //     type: "MODEL",
            //     url: "./models/chair_03_red.glb",
            //     dots: { x: "-1", y: "0", z: "-3.5" },
            //     rotate: 0,
            //     moveOnly: "XZ",
            //     visible: true,
            //     locked: false,
            // },
            // {
            //     id: "2",
            //     name: "Двери",
            //     type: "MODEL",
            //     url: "./models/doors.glb",
            //     scale: "1",
            //     dots: { x: "1", y: "0", z: "-2" },
            //     rotate: 1.5,
            //     moveOnly: "XZ",
            //     visible: true,
            //     locked: false,
            // },
            // {
            //     id: "81",
            //     name: "Стол круглый",
            //     type: "MODEL",
            //     url: "./models/table_03.glb",
            //     dots: { x: "-2", y: "0", z: "0" },
            //     rotate: 0,
            //     moveOnly: "XZ",
            //     visible: true,
            //     locked: false,
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
        // стены  
        walls: [
            {
                name: "Стена_1",
                type: "WALL",
                id: "100",
                dots: { x: "-4", z: "-3", x2: "-4", z2: "5" },
                width: "0.1",
                height: "1",
                textures: [{
                    // торец
                    id: "1",
                    width: "0.5",
                    height: "0.5",
                    url: "обои.jpg",
                },
                {
                    // потолок
                    id: "2",
                    width: "0.2", //длина кирпича
                    height: "0.1", // ширина
                    url: "kirp.jpg",
                },
                {
                    // внешний   индекс 4
                    name: "обои зеленые",
                    id: "3",
                    width: "1",
                    height: "1",
                    url: "обои.jpg",
                },
                {
                    // внутренная часть индекс 5
                    name: "камень серый",
                    id: "1",
                    width: "0.5",
                    height: "0.5",
                    url: "камень2.jpg",
                },
                ],
            },
            {
                name: "Стена_2",
                id: "101",
                type: "WALL",
                dots: { x: "-4", z: "2", x2: "3", z2: "2" },
                width: "0.1",
                height: "1",
                textures: [
                    {
                        // фронтальная часть
                        id: "1",
                        width: "0.5",
                        height: "0.5",
                        url: "50.jpg",
                    },
                    {
                        // потолок
                        id: "2",
                        width: "0.2", //длина кирпича
                        height: "0.1", // ширина
                        url: "kirp.jpg",
                    },
                    {
                        // внешняя ?
                        name: "бежевая плитка ",
                        id: "1",
                        width: "0.5",
                        height: "0.5",
                        url: "50.jpg",
                        // url: "Inkedplitka-long_LI.jpg",
                    },
                    {
                        //  внутренная ?
                        id: "3",
                        width: "0.2", //длина кирпича
                        height: "0.1", // ширина
                        // url: "kirp.jpg",
                        url: "обои3.jpg",
                        // url: "50.jpg",
                        name: "обои3",
                    },

                ],
            },
            {
                name: "Стена_3",
                id: "102",
                type: "WALL",
                dots: { x: "-4", z: "-3", x2: "3", z2: "-3" },
                width: "0.1",
                height: "1",
                textures: [
                    {
                        // фронтальная часть
                        id: "1",
                        width: "0.5",
                        height: "0.5",
                        url: "50.jpg",
                    },
                    {
                        // потолок
                        id: "2",
                        width: "0.2", //длина кирпича
                        height: "0.1", // ширина
                        url: "kirp.jpg",
                    },
                    {
                        // внешняя ?
                        name: "бежевая плитка ",
                        id: "1",
                        width: "0.5",
                        height: "0.5",
                        url: "50.jpg",
                        // url: "Inkedplitka-long_LI.jpg",
                    },
                    {
                        //  внутренная ?
                        id: "3",
                        width: "0.2", //длина кирпича
                        height: "0.1", // ширина
                        // url: "kirp.jpg",
                        url: "обои3.jpg",
                        // url: "50.jpg",
                        name: "обои3",
                    },

                ],
            },
        ],
        // пол
        floorCeiling: [
            {
                name: "Пол",
                id: "1",
                type: "FLOOR_SHAPE",
                texture: {
                    width: "0.5",
                    url: "lam2.jpeg",
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
            // {
            //     name: "Потолок",
            //     id: "2",
            //     type: "FLOOR_SHAPE",
            //     texture: {
            //         width: "0.5",
            //         url: "обои3.jpg",
            //     },

            //     dots: [
            //         { x: "0", y: "2.8", z: "0" },
            //         { x: "0", y: "2.8", z: "15" },
            //         { x: "20", y: "2.8", z: "15" },
            //         { x: "20", y: "2.8", z: "10" },
            //         { x: "10", y: "2.8", z: "0" },
            //         { x: "0", y: "2.8", z: "0" },
            //     ],
            // },
        ],

        furnishingsWall: [
            // {
            //     id: "1",
            //     name: "Белый постер",
            //     type: "picture",
            //     url: "./models/3d-model2.fbx",
            //     dots: { x: "0", y: "0.5", z: "-3.5" },
            //     rotate: 0,
            //     moveOnly: "XY",
            //     visible: true,
            //     locked: false,
            // },
            {
                id: "2",
                name: "Голубой постер",
                type: "picture",
                url: "./models/frame_fbx.fbx",
                dots: { x: "-1.5", y: "0.5", z: "-3.8" },
                rotate: 0,
                moveOnly: "XY",
                visible: true,
                locked: false,
            },
            // {
            //     id: "3",
            //     name: "obj постер",
            //     type: "picture",
            //     url: "./models/album.obj",
            //     dots: { x: "0.5", y: "0.5", z: "-2.5" },
            //     rotate: 0,
            //     moveOnly: "XY",
            //     visible: true,
            //     locked: false,
            // },
        ]

    },

    activeObject: {
        wall: {},
        surface: {},
        newFurnishings : {},
        replaceBy: '',
        action: '', // для поворота или мувинга модели
        changeVisible: {
            obj: {},
            action: ''
        },
        isSave: false, // для модалки
        newTexture: {},
        newModel: {},
        typeOfChange: '',
        selectedModel: {},
        lockModel: {},
        locking: {},
        deleting: {}
    },

    // выбранные из списков а не по клику
    activeInList: {
        wall: {},
        surface: {},
        replaceBy: '',
        action: '',
        isSave: false,
        newTexture: {},
        newModel: {},
        selectedModel: {},
        lockModel: {},
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
        dots: { x: "0", y: "0", z: "0" },
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
            name: "обои зеленые", // кирпич
            id: "6",
            width: "1", //длина кирпича
            height: "1", // ширина
            url: "обои.jpg",
        },
        {
            name: "обои белые", // кирпич
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
    // картины
    furnishingsWallList: [
        {
            id: "1",
            name: "Белый постер",
            type: "picture",
            url: "./models/3d-model2.fbx",
            dots: { x: "-1.5", y: "0.5", z: "-3.8" },
            rotate: 0,
            moveOnly: "XY",
            visible: true,
            locked: false,
        },
        {
            id: "2",
            name: "Голубой постер",
            type: "picture",
            url: "./models/frame_fbx.fbx",
            dots: { x: "-2.5", y: "0.5", z: "-3.8" },
            rotate: 0,
            moveOnly: "XY",
            visible: true,
            locked: false,
        },
        // {
        //     id: "2",
        //     name: "Белый постер2",
        //     type: "picture",
        //     url: "./models/frame_fbx.fbx",
        //     dots: { x: "-1.5", y: "0.5", z: "-3.8" },
        //     rotate: 0,
        //     moveOnly: "XY",
        //     visible: true,
        //     locked: false,
        // },
        {
            id: "3",
            name: "obj постер",
            type: "picture",
            url: "./models/album.obj",
            dots: { x: "0.5", y: "0.5", z: "-2.5" },
            rotate: 0,
            moveOnly: "XY",
            visible: true,
            locked: false,
        },
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
    resetTransformControl: false,
    percentLoading: null,


};

const changeVisibilityModel = (state, payload) => {
    const { project_1, activeObject } = state;
    const index = findIndex(project_1.surfaces, payload.id);
    const model = project_1.surfaces[index];
    model.visible = !model.visible;
    let updateState = { ...project_1 };
    updateState.surfaces[index] = { ...model };

    return {
        ...state,
        project_1: updateState,
        activeObject: { ...activeObject, changeVisible: { obj: model, action: 'change_visibility' } }
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

    let activeModel;
    // не понятно зачем но пусть будет 
    // if (from) {
    //     activeModel = updateModel;
    // } else {
    //     activeModel = payload.id !== activeObject.selectedModel?.id ? updateModel : {};
    // }

    // тут сбрасывает на пустой массив когда кликаешь по одному и тому же
    activeModel = payload.id !== activeObject.selectedModel?.id ? updateModel : {};
    if (activeModel?.id) {
        return {
            ...state,
            activeObject: { ...activeObject, wall: {}, selectedModel: activeModel, surface: {} },
            activeInList: { ...activeInList, selectedModel: {}, wall: {}, surface: {} }
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

const selectTypeOfChange = (state, payload, el) => {
    const { modal, activeObject, modalForConfirm } = state;

    if (payload === 'delete_model') {
        return {
            ...state,
            modal: { ...modal, typeOfChange: payload, isOpen: true },
            activeObject: { ...activeObject, deleting: el, typeOfChange: payload },
            modalForConfirm: {
                ...modalForConfirm,
                isOpen: true
            }
        };
    } else if (payload === 'drag' || payload === 'rotate') {
        let status = modal.typeOfChange === payload ? 'reset' : payload;
        return {
            ...state,
            modal: { ...modal, typeOfChange: status, isOpen: true },
            activeObject: { ...activeObject, action: status }
        };

    } else {
        let status = modal.typeOfChange === payload ? 'reset' : payload;
        return {
            ...state,
            modal: { ...modal, typeOfChange: status, isOpen: true },
            activeObject: { ...activeObject, typeOfChange: status }
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
            deleting: {},
            wall: {},
            surface: {},
            newModel: {},
            newTexture: {},
            typeOfChange: '',
            selectedModel: {},
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
    const { project_1, activeObject, activeInList } = state;
    const index = findIndex(project_1.walls, id);
    const wall = project_1.walls[index];

    let activeWall = id !== activeObject.wall?.id ? wall : {};

    if (activeWall?.id) {

        return {
            ...state,
            activeObject: { ...activeObject, surface: {}, selectedModel: {}, wall: { ...activeWall, sideInd: sideIndex } },
            activeInList: { ...activeInList, selectedModel: {}, surface: {} }
        };

    } else {
        return {
            ...state,
            activeObject: { ...activeObject, wall: {}, surface: {}, selectedModel: {} },
            activeInList: { ...activeInList, selectedModel: {}, surface: {}, wall: {}, }
        };
    }
};

const selectSurface = (state, id) => {

    const { activeObject, project_1, activeInList } = state;

    const index = findIndex(project_1.floorCeiling, id);
    const surf = project_1.floorCeiling[index];

    if (activeObject.surface?.id === surf.id) {
        console.log('activeObject surface disp');
        return {
            ...state,
            activeObject: { ...activeObject, surface: {}, selectedModel: {}, wall: {} },
            activeInList: { ...activeInList, surface: {}, selectedModel: {}, wall: {} }
        };
    } else {
        console.log('esception surface disp');
        return {
            ...state,
            activeObject: { ...activeObject, surface: surf, selectedModel: {}, wall: {} },
            activeInList: { ...activeInList, surface: {}, selectedModel: {}, wall: {} }
        };
    }
    // return state
};
const resetModal = (state) => {
    const { modal } = state;
    return {
        ...state, modal: { ...modal, isOpen: false }
    }
}

const getSurface = (obj, state) => {
    const { project_1 } = state;
    let surf = project_1.floorCeiling;
    surf.texture = obj.newTexture
    return surf
}

const getWall = (obj, state, index) => {
    const { project_1 } = state;

    const newWall = project_1.walls[index];
    if (obj.wall.sideInd === 4) {
        newWall.textures[2] = obj.newTexture
    } else if (obj.wall.sideInd === 5) {
        newWall.textures[3] = obj.newTexture
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
    if (activeObject.typeOfChange === 'change_texture') {

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
            let updateState = project_1;
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


    } else if (activeObject.typeOfChange === 'add_model') {
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
// замена модели
    } else if (activeObject.typeOfChange === 'replace') {

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
    } else if (activeObject.typeOfChange === 'add_furnishings_wall') {
        return {
            ...state,
            project_1: {
                ...project_1, furnishingsWall: [...project_1.furnishingsWall, activeObject.newFurnishings],
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
        activeObject: { ...activeObject, newModel: {}, newFurnishings: {}, isSave: false }
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
    const selectedId = activeObject.deleting.id;

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

    // для отрисовки по уже кликнутой модели
    if (activeObject.selectedModel?.id === id) {
        if (!model.locked) {
            model.needUnlock = true;
        }

        return {
            ...state,
            project_1: updateState,
            activeObject: { ...activeObject, lockModel: model }
        };
    } else {
        return {
            ...state,
            project_1: updateState,
            activeObject: { ...activeObject, locking: model }
        };
    }


}

const resetLockModel = (state) => {
    const { activeObject } = state;


    return {
        ...state,
        activeObject: { ...activeObject, lockModel: {}, locking: {} },

    };
}

const selectedInModelList = (state, payload) => {

    const { activeInList, activeObject } = state;
    let { id, name, type, url, dots, rotate, moveOnly, visible, locked } = payload;

    let updateObj = {
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

    let activeObj;
    if (updateObj.type === 'MODEL') {
        activeObj = payload.id !== activeInList.selectedModel?.id ? updateObj : {};
    } else if (updateObj.type === 'WALL') {
        activeObj = payload.id !== activeInList.wall?.id ? updateObj : {};
    } if (updateObj.type === 'FLOOR_SHAPE') {
        activeObj = payload.id !== activeInList.surface?.id ? updateObj : {};
    }




    if (activeObj?.id) {

        if (activeObj.type === 'MODEL') {
            return {
                ...state,
                activeInList: { ...activeInList, selectedModel: activeObj, surface: {} },
            };
        } else if (activeObj.type === 'WALL') {
            return {
                ...state,
                activeInList: { ...activeInList, wall: activeObj, surface: {}, selectedModel: {} },
            };
        } else if (activeObj.type === 'FLOOR_SHAPE') {
            return {
                ...state,
                activeInList: { ...activeInList, surface: activeObj, wall: {}, selectedModel: {} },
            };
        }


    } else {
        return {
            ...state,
            activeInList: { ...activeInList, selectedModel: {}, wall: {}, surface: {} },
            activeObject: { ...activeObject, selectedModel: {}, wall: {}, surface: {} }
        };
    }
}

const resetTC = (state, payload) => {

    return {
        ...state,
        resetTransformControl: payload
    }
}

const addFurnishings = (state, payload) => {
    const { activeObject } = state;
    return {
        ...state,
        activeObject: { ...activeObject, newFurnishings: payload },
    };
}
// const getPercent = (state, payload) => {
//     return {
//         ...state,
//         percentLoading: payload
//     };
// }
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_POSITION_MODEL":
            return changePositionModel(state, action.payload);
        case "SELECT_MODEL":
            return selectModel(state, action.payload, action.from);
        case "SELECT_REPLACED_BY":
            return selectReplaceBy(state, action.payload);
        case "SELECT_TYPE_OF_CHANGE":
            return selectTypeOfChange(state, action.payload, action.el);
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
        case "LOCK_MODEL":
            return lockModel(state, action.payload);
        case "RESET_LOCK_MODEL":
            return resetLockModel(state);
        case "SELECTED_IN_MODELLIST":
            return selectedInModelList(state, action.payload);
        case "RESET_TC":
            return resetTC(state, action.payload);
        case "ADD_FURNISHINGS":
            return addFurnishings(state, action.payload);

        // case "PERCENT_LOAD":
        //     return getPercent(state, action.payload);

        default:
            return state;
    }
};
export default reducer;

// export default combineReducers({

//     reducer, load
// })