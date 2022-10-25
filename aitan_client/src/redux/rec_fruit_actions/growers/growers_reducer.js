import * as types from "./growers_action_types";


const initialState = {
  growers: [],
  grower_2_update: '',
  grower_2_Copy: ''
  //, growersISActive:[]
};


const growersReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_GROWERS:
      return {
        ...state,
        growers: action.payload,
      };

    case types.GET_GROWER_UPDATE:
      return {
        ...state,
        grower_2_update: action.payload
      };

    case types.COPY_GROWER:
      return {
        ...state,
        grower_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default growersReducer;
