import * as types from "./invoices_action_types";


const initialState = {
  invoiceHeaders: [],
  invoiceHeader_2_update: '',
  invoiceHeader_2_Copy: '',

  invoice_report: [],

  invoiceLines: [],
  invoiceLine_2_update: '',
  invoiceLine_2_copy: ''
};


const invoices_reducer = (state = initialState, action) => {
  switch (action.type) {

    // ======================================================
    //        invoice_header
    // ======================================================
    case types.GET_INVOICE_HEADER:
      return {
        ...state,
        invoiceHeaders: action.payload,
      };

    case types.GET_INVOICE_HEADER_UPDATE:
      return {
        ...state,
        invoiceHeader_2_update: action.payload
      };

    case types.COPY_INVOICE_HEADER:
      return {
        ...state,
        invoiceHeader_2_Copy: action.payload
      };


    case types.GET_INVOICE_DATA:
      return {
        ...state,
        invoice_report: action.payload
      };


    // ======================================================
    //          invoice_lines
    // ======================================================

    case types.GET_INVOICE_LINES:
      return {
        ...state,
        invoiceLines: action.payload,
      };

    case types.GET_INVOICE_LINES_UPDATE:
      return {
        ...state,
        invoiceLine_2_update: action.payload
      };

    case types.COPY_INVOICE_LINES:
      return {
        ...state,
        invoiceLine_2_copy: action.payload
      };


    default:
      return state;
  }
};

export default invoices_reducer;
