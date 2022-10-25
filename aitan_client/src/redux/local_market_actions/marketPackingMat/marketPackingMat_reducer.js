import * as types from "./marketPackingMat_action_types";


const initialState = {
  marketPacking: [],
  marketPacking_2_update: '',
  marketPacking_2_Copy: ''
};


const marketPackingMat_reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_MARKETPACKINGS:
      return {
        ...state,
        marketPacking: action.payload,
      };

    case types.GET_MARKETPACKING_UPDATE:
      return {
        ...state,
        marketPacking_2_update: action.payload
      };

    case types.COPY_MARKETPACKING:
      return {
        ...state,
        marketPacking_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default marketPackingMat_reducer;
