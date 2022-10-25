import * as types from "./fruitSize_action_types";


const initialState = {
  fruitSize: [],
  fruitSize_2_update: '',
  fruitSize_2_Copy: ''
};


const fruitSize_reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_FRUITSIZE:
      return {
        ...state,
        fruitSize: action.payload,
      };

    case types.GET_FRUITSIZE_UPDATE:
      return {
        ...state,
        fruitSize_2_update: action.payload
      };

    case types.COPY_FRUITSIZE:
      return {
        ...state,
        fruitSize_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default fruitSize_reducer;
