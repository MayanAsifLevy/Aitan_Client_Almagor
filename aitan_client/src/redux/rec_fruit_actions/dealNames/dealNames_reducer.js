import * as types from "./dealNames_action_types";


const initialState = {
  dealNames: [],
  dealName_2_update: '',
  dealName_2_Copy: ''
};


const dealNamesReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_DEALNAMES:
      return {
        ...state,
        dealNames: action.payload,
      };

    case types.GET_DEALNAME_UPDATE:
      return {
        ...state,
        dealName_2_update: action.payload
      };

    case types.COPY_DEALNAME:
      return {
        ...state,
        dealName_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default dealNamesReducer;
