import * as types from "./localReports_action_types";


const initialState = {
  palletsWOInvoice_data: [],

};


const localReportsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_PALLETSWOINVOICE_DATA:
      return {
        ...state,
        palletsWOInvoice_data: action.payload,
      };

   
    default:
      return state;
  }
};

export default localReportsReducer;
