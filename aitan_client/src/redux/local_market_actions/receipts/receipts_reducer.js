import * as types from "./receipts_action_types";


const initialState = {
  receiptHeaders: [],
  receiptHeader_2_update: '',
  receiptHeader_2_Copy: '',

  receiptLines: [],
  receiptLine_2_update: '',
  receiptLine_2_copy: ''
};


const receipts_reducer = (state = initialState, action) => {
  switch (action.type) {

    // ======================================================
    //       receipt_header
    // ======================================================
    case types.GET_RECEIPT_HEADER:
      return {
        ...state,
        receiptHeaders: action.payload,
      };

    case types.GET_RECEIPT_HEADER_UPDATE:
      return {
        ...state,
        receiptHeader_2_update: action.payload
      };

    case types.COPY_RECEIPT_HEADER:
      return {
        ...state,
        receiptHeader_2_Copy: action.payload
      };


    // ======================================================
    //          receipt_lines
    // ======================================================

    case types.GET_RECEIPT_LINES:
      return {
        ...state,
        receiptLines: action.payload,
      };

    case types.GET_RECEIPT_LINES_UPDATE:
      return {
        ...state,
        receiptLine_2_update: action.payload
      };

    case types.COPY_RECEIPT_LINES:
      return {
        ...state,
        receiptLine_2_copy: action.payload
      };



    default:
      return state;
  }
};

export default receipts_reducer;
