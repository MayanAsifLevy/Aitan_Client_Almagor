import * as types from "./createPallet_action_types";


const initialState = {
  createPalletHeaders: [],
  createPalletHeader_2_update: '',
  createPalletHeader_2_Copy: '',
  
  palletNum_withLines: '',

  createPalletLines: [],
  createPalletLine_2_update: '',
  createPalletLine_2_Copy: ''

};


const createPallet_reducer = (state = initialState, action) => {
  switch (action.type) {

    // ======================================================
    //        createPallet_header
    // ======================================================
    case types.GET_CREATE_PALLET_HEADER:
      return {
        ...state,
        createPalletHeaders: action.payload,
      };

    case types.GET_CREATE_PALLET_HEADER_UPDATE:
      return {
        ...state,
        createPalletHeader_2_update: action.payload
      };

    case types.COPY_CREATE_PALLET_HEADER:
      return {
        ...state,
        createPalletHeader_2_Copy: action.payload
      };

    case types.PALLETNUMS_WITHLINES:
      return {
        ...state,
        palletNum_withLines: action.payload
      };

    // ======================================================
    //        createPallet_lines
    // ======================================================

    case types.GET_CREATE_PALLET_LINES:
      return {
        ...state,
        createPalletLines: action.payload,
      };

    case types.GET_CREATE_PALLET_LINES_UPDATE:
      return {
        ...state,
        createPalletLine_2_update: action.payload
      };

    case types.COPY_CREATE_PALLET_LINES:
      return {
        ...state,
        createPalletLine_2_Copy: action.payload
      };


    default:
      return state;
  }
};

export default createPallet_reducer;
