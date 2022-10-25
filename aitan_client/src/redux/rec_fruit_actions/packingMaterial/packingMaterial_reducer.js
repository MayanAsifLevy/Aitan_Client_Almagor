import * as types from "./packingMaterial_action_types";


const initialState = {
  packingMaterials: [],
  packingMaterial_2_update: '',
  packingMaterial_2_Copy: ''
};


const packingMaterialReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_PACKINGMATERIAL:
      return {
        ...state,
        packingMaterials: action.payload,
      };

    case types.GET_PACKINGMATERIAL_UPDATE:
      return {
        ...state,
        packingMaterial_2_update: action.payload
      };

    case types.COPY_PACKINGMATERIAL:
      return {
        ...state,
        packingMaterial_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default packingMaterialReducer;
