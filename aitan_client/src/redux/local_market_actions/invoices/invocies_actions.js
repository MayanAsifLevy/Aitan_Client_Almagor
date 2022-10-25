import * as types from "./invoices_action_types";
import * as invoicesUtils from "../../../utils/InvoicesUTL";
import * as localReportsUTLs from "../../../utils/reports/local_reports/LocalReportsUTLs";

// ======================================================
//      invoice_header
// ======================================================

const getHeader = (header) => ({
  type: types.GET_INVOICE_HEADER,
  payload: header,
});


const keepHeader2Update = (headerData) => ({
  type: types.GET_INVOICE_HEADER_UPDATE,
  payload: headerData,
})

const header2Copy = (headerData) => ({
  type: types.COPY_INVOICE_HEADER,
  payload: headerData,
})


//   --------------------------------------------

export const loadHeaders = (filteredSeason, _token) => {
  return async function (dispatch) {
    const allHeaders = await (invoicesUtils.GetInvoiceHeader_list(filteredSeason, _token))
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
    await invoicesUtils.delete_invoiceHeader(id)
    dispatch(loadHeaders(filteredSeason, _token))
  }
}

// //---------------------------------------------

export const updateHeaderDB = (headerData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await invoicesUtils.update_invoiceHeader(headerData, headerData.id)
    dispatch(loadHeaders(filteredSeason, _token))
    return result
  }
}

// //--------------------------------------------

export const addHeader = (headerData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await invoicesUtils.add_invoiceHeader(headerData)
    dispatch(loadHeaders(filteredSeason, _token))
    return result
  }
}

// //--------------------------------------------

export const updateInvoiceStatus = (headerData) => {
  return async function () {
    let result = await invoicesUtils.update_InvoiceStatus(headerData)
    return result
  }
}

// // ======================================================
// //      invoice_lines
// // ======================================================

const getLines = (lines) => ({
  type: types.GET_INVOICE_LINES,
  payload: lines,
});


const keepLines2Update = (linesData) => ({
  type: types.GET_INVOICE_LINES_UPDATE,
  payload: linesData,

})

const lines2Copy = (linesData) => ({
  type: types.COPY_INVOICE_LINES,
  payload: linesData,

})

// //   --------------------------------------------

export const loadLines = (invoiceHeaderID) => {
  return async function (dispatch) {
    const allLines = await (invoicesUtils.GetInvoiceLines_list(invoiceHeaderID))
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

export const deletLines = (id, invoiceHeaderID, data) => {
  return async function (dispatch) {
    await invoicesUtils.delete_invoiceLines(id)
    dispatch(loadLines(invoiceHeaderID))
  }
}


// //---------------------------------------------

export const deletAllLines = (invoiceHeaderID) => {
  return async function () {
    await invoicesUtils.delete_AllInvoiceLines(invoiceHeaderID)
  }
}

// //---------------------------------------------

export const updateLineDB = (lineData, invoiceHeaderID) => {
  return async function (dispatch) {
    let result = await invoicesUtils.update_invoiceLines(lineData, lineData.id)
    dispatch(loadLines(invoiceHeaderID))
    return result
  }
}

// //--------------------------------------------
export const addLine = (lineData, invoiceHeaderID) => {
  return async function (dispatch) {
    let result = await invoicesUtils.add_invoiceLines(lineData)
    dispatch(loadLines(invoiceHeaderID))
    return result
  }
}


// ======================================================
//      invoices report
// ======================================================


export const getInvoicesData = (data) => ({
  type: types.GET_INVOICE_DATA,
  payload: data,
});


export const loadInvocieReportData = (invoiceHeaderID) => {
  return async function (dispatch) {
    const result = await (localReportsUTLs.InvoicesReport(invoiceHeaderID))
    dispatch(getInvoicesData(result))
    return result
  }
}