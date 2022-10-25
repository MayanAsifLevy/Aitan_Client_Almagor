import * as types from "./receivingFruits_action_types";


const initialState = {
  receivingFruits: [],
  receivingFruit_2_update: '',
  receivingFruit_2_Copy: ''
};


const receivingFruitsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_RECEIVINGFRUITS:
      return {
        ...state,
        receivingFruits: action.payload,
      };

    case types.GET_RECEIVINGFRUIT_UPDATE:
      return {
        ...state,
        receivingFruit_2_update: action.payload
      };

    case types.COPY_RECEIVINGFRUIT:
      return {
        ...state,
        receivingFruit_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default receivingFruitsReducer;
