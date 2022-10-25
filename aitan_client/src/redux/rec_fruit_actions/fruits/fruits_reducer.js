import * as types from "./fruits_action_types";


const initialState = {
  fruits: [],
  fruit_2_update: '',
  fruit_2_Copy: '',
  fruitList: []
};


const fruitsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_FRUITS:
      return {
        ...state,
        fruits: action.payload,
      };

    case types.GET_FRUIT_UPDATE:
      return {
        ...state,
        fruit_2_update: action.payload
      };

    case types.COPY_FRUIT:
      return {
        ...state,
        fruit_2_Copy: action.payload
      };

    case types.FRUITS_LIST:
      return {
        ...state,
        fruitList: action.payload
      };

    default:
      return state;
  }
};

export default fruitsReducer;
