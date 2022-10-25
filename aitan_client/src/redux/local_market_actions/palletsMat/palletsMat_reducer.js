import * as types from "./palletsMat_action_types";


const initialState = {
  palletsMat: [],
  palletMat_2_update: '',
  palletMat_2_Copy: '',
  savePalletMat4cost: {}
};


const palletsMat_reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_PALLETSMAT:
      return {
        ...state,
        palletsMat: action.payload,
      };

    case types.GET_PALLETMAT_UPDATE:
      return {
        ...state,
        palletMat_2_update: action.payload
      };

    case types.COPY_PALLETMAT:
      return {
        ...state,
        palletMat_2_Copy: action.payload
      };

    case types.SAVE_PALLETMAT4COST:
      return {
        ...state,
        savePalletMat4cost: action.payload
      };


    default:
      return state;
  }
};

export default palletsMat_reducer;
