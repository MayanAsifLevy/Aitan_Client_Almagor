import * as types from "./palletsMatCost_action_types";


const initialState = {
  palletsMatCost: [],
  palletMatCost_2_update: '',
  palletMatCost_2_Copy: ''
};


const palletsMatCost_reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_PALLETSMATCOST:
      return {
        ...state,
        palletsMatCost: action.payload,
      };

    case types.GET_PALLETMATCOST_UPDATE:
      return {
        ...state,
        palletMatCost_2_update: action.payload
      };

    case types.COPY_PALLETMATCOST:
      return {
        ...state,
        palletMatCost_2_Copy: action.payload
      };


    default:
      return state;
  }
};

export default palletsMatCost_reducer;
