import * as types from "./closingData_action_types";


const initialState = {
  closingData: [],
  closingData_2_update: '',
  closingData_2_Copy: ''
};


const closingData_reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_CLOSINGDATA:
      return {
        ...state,
        closingData: action.payload,
      };

    case types.GET_CLOSINGDATA_UPDATE:
      return {
        ...state,
        closingData_2_update: action.payload
      };

    case types.COPY_CLOSINGDATA:
      return {
        ...state,
        closingData_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default closingData_reducer;
