import * as types from "./receipts_action_types";
import * as receiptUtils from "../../../utils/receiptsUTL";
import * as invoicesUtils from "../../../utils/InvoicesUTL";
// ======================================================
//      receipt_header
// ======================================================

const getHeader = (header) => ({
  type: types.GET_RECEIPT_HEADER,
  payload: header,
});


const keepHeader2Update = (headerData) => ({
  type: types.GET_RECEIPT_HEADER_UPDATE,
  payload: headerData,
})

const header2Copy = (headerData) => ({
  type: types.COPY_RECEIPT_HEADER,
  payload: headerData,
})


//   --------------------------------------------

export const loadReceiptHeaders = (filteredSeason, _token) => {
  return async function (dispatch) {
    const allHeaders = await (receiptUtils.GetReceiptHeader_list(filteredSeason, _token))
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
    await receiptUtils.delete_receiptHeader(id)
    dispatch(loadReceiptHeaders(filteredSeason, _token))
  }
}

// //---------------------------------------------

export const updateHeaderDB = (headerData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await receiptUtils.update_receiptHeader(headerData, headerData.id)
    dispatch(loadReceiptHeaders(filteredSeason, _token))
    return result
  }
}

// //--------------------------------------------

export const addHeader = (headerData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await receiptUtils.add_receiptHeader(headerData)
    dispatch(loadReceiptHeaders(filteredSeason, _token))
    return result
  }
}

// //--------------------------------------------
export const updateInvoiceStatus = (headerData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await invoicesUtils.update_InvoiceStatus(headerData)
    dispatch(loadReceiptHeaders(filteredSeason,  _token))
    return result
  }
}

// // ======================================================
// //      receipt_lines
// // ======================================================

const getLines = (lines) => ({
  type: types.GET_RECEIPT_LINES,
  payload: lines,
});


const keepLines2Update = (linesData) => ({
  type: types.GET_RECEIPT_LINES_UPDATE,
  payload: linesData,

})

const lines2Copy = (linesData) => ({
  type: types.COPY_RECEIPT_LINES,
  payload: linesData,

})


// //   --------------------------------------------

export const loadLines = (receiptHeaderID) => {
  return async function (dispatch) {
    const allLines = await (receiptUtils.GetReceiptLines_list(receiptHeaderID))
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

export const deletLines = (id, receiptHeaderID, data) => {
  return async function (dispatch) {
    await receiptUtils.delete_receiptLines(id)
    dispatch(loadLines(receiptHeaderID))
  }
}



// //---------------------------------------------

export const deletAllLines = (receiptHeaderID) => {
  return async function () {
    await receiptUtils.delete_AllReceiptLines(receiptHeaderID)
  }
}

// //---------------------------------------------

export const updateLineDB = (lineData, receiptHeaderID) => {
  return async function (dispatch) {
    let result = await receiptUtils.update_receiptLines(lineData, lineData.id)
    dispatch(loadLines(receiptHeaderID))
    return result
  }
}

// //--------------------------------------------
export const addLine = (lineData, receiptHeaderID) => {
  return async function (dispatch) {
    let result = await receiptUtils.add_receiptLines(lineData)
    dispatch(loadLines(receiptHeaderID))
    return result
  }
}

