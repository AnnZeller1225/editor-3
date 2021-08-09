export const changePositionModel = (model) => {
  return {
    type: "CHANGE_POSITION_MODEL",
    payload: model,
  };
};

export const selectModel = (model, from) => {
  return {
    type: "SELECT_MODEL",
    payload: model,
    from: from
  };
};
export const resetSelectedModel = (model) => {
  return {
    type: "RESET_SELECTED_MODEL",
    payload: model,
  };
};
export const selectReplaceBy = (model) => {
  return {
    type: "SELECT_REPLACED_BY",
    payload: model,
  };
};

export const selectTypeOfChange = (typeStatus) => {
  return {
    type: "SELECT_TYPE_OF_CHANGE",
    payload: typeStatus,
  };
};
export const replaceModel = () => {
  return {
    type: "REPLACE_MODEL",
  };
};

export const changeVisibilityModel = (model) => {
  return {
    type: "CHANGE_VISIBILITY_MODEL",
    payload: model
  };
};


export const addModel = (model) => {
  return {
    type: "ADD_MODEL",
    payload: model
  };
};
export const changeStatusCamera = (status) => {
  return {
    type: "MOVE_CAMERA",
    payload: status
  };
};
export const selectWall = (wall, sideIndex) => {
  return {
    type: "SELECT_WALL",
    payload: wall,
    index: sideIndex
  };
};
export const selectTexture = (id) => {
  return {
    type: "SELECT_TEXTURE",
    payload: id
  };
};
export const selectSurface = (id) => {
  return {
    type: "SELECT_SURFACE",
    payload: id
  };
};

export const resetModal = () => {
  return {
    type: "RESET_MODAL"
  };
};

export const saveChanges = () => {
  return {
    type: "SAVE_CHANGES"
  };
};
export const selectActionModel = (payload) => {
  return {
    type: "SELECT_ACTION_MODEL",
    payload: payload
  };
};
export const resetNewModel = (payload) => {
  return {
    type: "RESET_NEW_MODEL",
    payload: payload
  };
};


export const deleteModel = (payload) => {
  return {
    type: "DELETE_MODEL",
    payload: payload
  };
};

export const confirmModal = (payload) => {
  return {
    type: "CONFIRM_MODAL",
    payload: payload
  };
};
export const lockModel = (payload) => {
  return {
    type: "LOCK_MODEL",
    payload: payload
  };
};
export const resetLockModel = () => {
  return {
    type: "RESET_LOCK_MODEL",
  };
};

export const selectedInModelList = (payload) => {
  return {
    type: "SELECTED_IN_MODELLIST",
    payload: payload,
  };
};
