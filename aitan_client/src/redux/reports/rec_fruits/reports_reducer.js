import * as types from "./reports_action_types";


const initialState = {
  monthly_data: [],
  daily_data: [],
  season_data: [],
  summary_data: [],
  plot_data: []
};


const reportsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_MONTHLY_DATA:
      return {
        ...state,
        monthly_data: action.payload,
      };

    case types.GET_DAILY_DATA:
      return {
        ...state,
        daily_data: action.payload,
      };

    case types.GET_SEASON_DATA:
      return {
        ...state,
        season_data: action.payload,
      };

    case types.GET_SUMMARY_DATA:
      return {
        ...state,
        summary_data: action.payload,
      };

    case types.GET_PLOT_DATA:
      return {
        ...state,
        plot_data: action.payload,
      };


    default:
      return state;
  }
};

export default reportsReducer;
