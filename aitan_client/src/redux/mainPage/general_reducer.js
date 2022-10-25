import * as types from "./general_action_types";


const initialState = {
  season: '',
  sectionName: '',
  updateSectionName: '',
  traderPrcnt: 0,
  distributerPrcnt: 0,
  VAT: 0
}


const seasonReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SAVE_SEASON:
      return {
        ...state,
        season: action.payload,
      };

    case types.SECTION_NAME:
      return {
        ...state,
        sectionName: action.payload,
      };

    case types.UPDATES_SECTION:
      return {
        ...state,
        updateSectionName: action.payload,
      };

    case types.TRADERPRCNT:
      return {
        ...state,
        traderPrcnt: action.payload,
      };

    case types.DISTRIBUTERPRCENT:
      return {
        ...state,
        distributerPrcnt: action.payload,
      };

    case types.VAT:
      return {
        ...state,
        VAT: action.payload,
      };

    default:
      return state;
  }
};

export default seasonReducer;
