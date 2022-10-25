import * as types from "./deals_action_types";


const initialState = {
  deals: [],
  deal_2_update: '',
  deal_2_Copy: '',
  fruit_deal_list: []
};


const dealsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_DEALS:
      return {
        ...state,
        deals: action.payload,
      };

    case types.GET_DEAL_UPDATE:
      return {
        ...state,
        deal_2_update: action.payload
      };

    case types.COPY_DEAL:
      return {
        ...state,
        deal_2_Copy: action.payload
      };

    case types.SAVE_FRUITDEALIST:
      return {
        ...state,
        fruit_deal_list: action.payload
      };

    default:
      return state;
  }
};

export default dealsReducer;
