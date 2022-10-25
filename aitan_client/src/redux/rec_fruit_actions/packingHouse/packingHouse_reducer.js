import * as types from "./packingHouse_action_types";


const initialState = {
  packingHouses: [],
  packingHouse_2_update: '',
  packingHouse_2_Copy: ''
};


const packingHouseReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_PACKINGHOUSE:
      return {
        ...state,
        packingHouses: action.payload,
      };

    case types.GET_PACKINGHOUSE_UPDATE:
      return {
        ...state,
        packingHouse_2_update: action.payload
      };

    case types.COPY_PACKINGHOUSE:
      return {
        ...state,
        packingHouse_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default packingHouseReducer;
