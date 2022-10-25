import * as types from "./marketFruits_action_types";


const initialState = {
  marketFruits: [],
  marketFruits_2_update: '',
  marketFruits_2_Copy: '',
  qualityList: []
};


const marketFruits_Reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_MARKETFRUITS:
      return {
        ...state,
        marketFruits: action.payload,
      };

    case types.GET_MARKETFRUIT_UPDATE:
      return {
        ...state,
        marketFruits_2_update: action.payload
      };

    case types.COPY_MARKETFRUIT:
      return {
        ...state,
        marketFruits_2_Copy: action.payload
      };

    case types.QUALITY_LIST:
      return {
        ...state,
        qualityList: action.payload
      };

    default:
      return state;
  }
};

export default marketFruits_Reducer;
