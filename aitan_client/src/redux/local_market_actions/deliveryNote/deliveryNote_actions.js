import * as types from "./deliveryNote_action_types";
import * as deliveryNoteUtils from "../../../utils/DeliveryNoteUTL";
import * as localReportsUTLs from "../../../utils/reports/local_reports/LocalReportsUTLs";

// ======================================================
//       delivertNote_header
// ======================================================

const getHeader = (header) => ({
  type: types.GET_DELIVERYNOTE_HEADER,
  payload: header,
});


const keepHeader2Update = (headerData) => ({
  type: types.GET_DELIVERYNOTE_HEADER_UPDATE,
  payload: headerData,

})

const header2Copy = (headerData) => ({
  type: types.COPY_DELIVERYNOTE_HEADER,
  payload: headerData,
})


//   --------------------------------------------

export const loadHeaders = (filteredSeason, _token) => {
  return async function (dispatch) {
    const allHeaders = await (deliveryNoteUtils.GetDeliveryNoteHeader_list(filteredSeason, _token))
    dispatch(getHeader(allHeaders))
  }
}

//   --------------------------------------------

export const copy2Header = (headerData) => {
  return async function (dispatch) {
    dispatch(header2Copy(headerData));
  }
}

//   --------------------------------------------

export const saveHeader2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepHeader2Update(row));
  }
}

//---------------------------------------------

export const deletHeader = (id, filteredSeason, _token) => {
  return async function (dispatch) {
    dispatch(deletAllLines(id)) // first we must delete the lines and only then the header
    await deliveryNoteUtils.delete_deliveryNoteHeader(id)
    dispatch(loadHeaders(filteredSeason, _token))
  }
}

// //---------------------------------------------

export const updateHeaderDB = (headerData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await deliveryNoteUtils.Update_deliveryNoteHeader(headerData, headerData.id)
    dispatch(loadHeaders(filteredSeason, _token))
    return result
  }
}

// //--------------------------------------------

export const addHeader = (headerData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await deliveryNoteUtils.Add_deliveryNoteHeader(headerData)
    dispatch(loadHeaders(filteredSeason, _token))
    return result
  }
}


// // ======================================================
// //       delivertNote_lines
// // ======================================================

const getLines = (lines) => ({
  type: types.GET_DELIVERYNOTE_LINES,
  payload: lines,
});


const keepLines2Update = (linesData) => ({
  type: types.GET_DELIVERYNOTE_LINES_UPDATE,
  payload: linesData,

})

const lines2Copy = (linesData) => ({
  type: types.COPY_DELIVERYNOTE_LINES,
  payload: linesData,

})

const saveDeliveryNotesWithLines = (data) =>
({
  type: types.DELIVERYNOTES_WITHLINES,
  payload: data,
})

// //   --------------------------------------------

export const loadLines = (deliveryNoteHeaderID) => {
  return async function (dispatch) {
    const allLines = await (deliveryNoteUtils.GetDeliveryNoteLines_list(deliveryNoteHeaderID))
    dispatch(getLines(allLines))
  }
}

// //   --------------------------------------------

export const copy2Lines = (lineData) => {
  return async function (dispatch) {
    dispatch(lines2Copy(lineData));
  }
}

// //   --------------------------------------------

export const saveLine2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepLines2Update(row));
  }
}

// //---------------------------------------------

export const deletLines = (id, deliveryNoteHeaderID, data) => {
  return async function (dispatch) {
    await deliveryNoteUtils.delete_deliveryNoteLines(id)
    dispatch(loadLines(deliveryNoteHeaderID))
  }
}


// //---------------------------------------------

export const deletAllLines = (deliveryNoteHeaderID) => {
  return async function (dispatch) {
    await deliveryNoteUtils.delete_AllDeliveryNoteLines(deliveryNoteHeaderID)
  }
}

// //---------------------------------------------

export const updateLineDB = (lineData, deliveryNoteHeaderID) => {
  return async function (dispatch) {
    let result = await deliveryNoteUtils.Update_deliveryNoteLines(lineData, lineData.id)
    dispatch(loadLines(deliveryNoteHeaderID))
    return result
  }
}

// //--------------------------------------------
export const addLine = (lineData, deliveryNoteHeaderID) => {
  return async function (dispatch) {
    let result = await deliveryNoteUtils.Add_deliveryNoteLines(lineData)
    dispatch(loadLines(deliveryNoteHeaderID))
    return result
  }
}

// //--------------------------------------------
export const loadDistinctdeliveryNotestWithLines = (filteredSeason) => {
  return async function (dispatch) {
    let result = await deliveryNoteUtils.Get_distinctdeliveryNotestWithLines(filteredSeason)
    dispatch(saveDeliveryNotesWithLines(result))
  }
}


// // ======================================================
// //      deliveryNote report
// // ======================================================


export const getDeliveryNoteData = (data) => ({
  type: types.GET_DELIVERYNOTE_DATA,
  payload: data,
});


export const loadDeliveryNoteReportData = (reportType, deliveryNoteNum, season) => {
  return async function (dispatch) {
    const result = await (localReportsUTLs.DeliveryNoteReport(reportType, deliveryNoteNum, season))
    // result.sort((a, b) => (a.dealName > b.dealName  ) ? 1 : -1)
    dispatch(getDeliveryNoteData(result))
    return result
  }
}