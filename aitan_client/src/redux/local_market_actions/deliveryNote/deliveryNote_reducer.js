import * as types from "./deliveryNote_action_types";


const initialState = {
  deliveryNoteHeaders: [],
  deliveryNoteHeader_2_update: '',
  deliveryNoteHeader_2_Copy: '',
  deliveryNotes_witLines: [],
  deliveryNote_report: [],

  deliveryNoteLines: [],
  deliveryNoteLine_2_update: '',
  deliveryNoteLine_2_Copy: ''
};


const deliveryNote_reducer = (state = initialState, action) => {
  switch (action.type) {

    // ======================================================
    //        deliveryNote_header
    // ======================================================
    case types.GET_DELIVERYNOTE_HEADER:
      return {
        ...state,
        deliveryNoteHeaders: action.payload,
      };

    case types.GET_DELIVERYNOTE_HEADER_UPDATE:
      return {
        ...state,
        deliveryNoteHeader_2_update: action.payload
      };

    case types.COPY_DELIVERYNOTE_HEADER:
      return {
        ...state,
        deliveryNoteHeader_2_Copy: action.payload
      };


    case types.GET_DELIVERYNOTE_DATA:
      return {
        ...state,
        deliveryNote_report: action.payload
      };


    case types.DELIVERYNOTES_WITHLINES:
      return {
        ...state,
        deliveryNotes_witLines: action.payload
      };

    // ======================================================
    //          deliveryNote_lines
    // ======================================================

    case types.GET_DELIVERYNOTE_LINES:
      return {
        ...state,
        deliveryNoteLines: action.payload,
      };

    case types.GET_DELIVERYNOTE_LINES_UPDATE:
      return {
        ...state,
        deliveryNoteLine_2_update: action.payload
      };

    case types.COPY_DELIVERYNOTE_LINES:
      return {
        ...state,
        deliveryNoteLine_2_Copy: action.payload
      };


    default:
      return state;
  }
};

export default deliveryNote_reducer;
