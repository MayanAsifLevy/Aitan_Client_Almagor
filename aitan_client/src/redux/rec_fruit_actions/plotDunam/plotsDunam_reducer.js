import * as types from "./plotsDunam_action_types";


const initialState = {
  plots: [],
  plot_2_update: '',
  plot_2_Copy: ''
};


const plotsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_PLOTS:
      return {
        ...state,
        plots: action.payload,
      };

    case types.GET_PLOT_UPDATE:
      return {
        ...state,
        plot_2_update: action.payload
      };

    case types.COPY_PLOT:
      return {
        ...state,
        plot_2_Copy: action.payload
      };

    default:
      return state;
  }
};

export default plotsReducer;
