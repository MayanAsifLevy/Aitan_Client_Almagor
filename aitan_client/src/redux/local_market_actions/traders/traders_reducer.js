import * as types from "./traders_action_types";


const initialState = {
  traders: [],
  trader_2_update: '',
  trader_2_Copy: ''
};


const traders_reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_TRADERS:
      return {
        ...state,
        traders: action.payload,
      };

    case types.GET_TRADER_UPDATE:
      return {
        ...state,
        trader_2_update: action.payload
      };

    case types.COPY_TRADER:
      return {
        ...state,
        trader_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default traders_reducer;
