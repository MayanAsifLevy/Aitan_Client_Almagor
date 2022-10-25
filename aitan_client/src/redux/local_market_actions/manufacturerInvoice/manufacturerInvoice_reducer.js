import * as types from "./manufacturerInvoice_action_types";


const initialState = {
  manufacturerInvoices: [],
  manufacturerInvoice_2_update: '',
  manufacturerInvoice_2_Copy: '',

};


const deliveryNote_reducer = (state = initialState, action) => {
  switch (action.type) {

    // ======================================================
    //        deliveryNote_header
    // ======================================================
    case types.GET_MANUFACTURERINVOICE:
      return {
        ...state,
        manufacturerInvoices: action.payload,
      };

    case types.GET_MANUFACTURERINVOICE_UPDATE:
      return {
        ...state,
        manufacturerInvoice_2_update: action.payload
      };

    case types.COPY_MANUFACTURERINVOICE:
      return {
        ...state,
        manufacturerInvoice_2_Copy: action.payload
      };


    default:
      return state;
  }
};

export default deliveryNote_reducer;
