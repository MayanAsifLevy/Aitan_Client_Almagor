import * as types from "./fixedInfo_action_types";


const initialState = {
  fixedInfo: [],
  fixedInfo_2_update: '',
};


const fixedInfo_reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_FIXEDINFO:
      return {
        ...state,
        fixedInfo: action.payload,
      };

    case types.GET_FIXEDINFO_UPDATE:
      return {
        ...state,
        fixedInfo_2_update: action.payload
      };


    default:
      return state;
  }
};

export default fixedInfo_reducer;
