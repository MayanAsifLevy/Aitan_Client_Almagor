import * as types from "./createPallet_action_types";
import * as createPalletUtils from "../../../utils/CreatePalletUTL";

// ======================================================
//        createPallet_header
// ======================================================

const getHeader = (header) => ({
  type: types.GET_CREATE_PALLET_HEADER,
  payload: header,
});


const keepHeader2Update = (headerData) => ({
  type: types.GET_CREATE_PALLET_HEADER_UPDATE,
  payload: headerData,

})

const header2Copy = (headerData) => ({
  type: types.COPY_CREATE_PALLET_HEADER,
  payload: headerData,

})

const savePalletsWithLines = (data) =>
({
  type: types.PALLETNUMS_WITHLINES,
  payload: data,
})
//   --------------------------------------------

export const loadHeaders = (filteredSeason, _token) => {
  return async function (dispatch) {
    const allHeaders = await (createPalletUtils.GetCreatePalletHeader_list(filteredSeason, _token))
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
    dispatch(deletAllLines(id)) // first we must delete teh lines and only then the header
    await createPalletUtils.delete_createPalletHeader(id)
    dispatch(loadHeaders(filteredSeason, _token))
  }
}

// //---------------------------------------------

export const updateHeaderDB = (headerData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await createPalletUtils.Update_createPalletHeader(headerData, headerData.id)
    dispatch(loadHeaders(filteredSeason, _token))
    return result
  }
}

// //--------------------------------------------

export const addHeader = (headerData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await createPalletUtils.Add_createPalletHeader(headerData)
    dispatch(loadHeaders(filteredSeason, _token))
    return result
  }
}

// //--------------------------------------------
export const loadDistinctCreatePalletWithLines = (filteredSeason) => {
  return async function (dispatch) {
    let result = await createPalletUtils.Get_distinctPalletsWithLines(filteredSeason)
    dispatch(savePalletsWithLines(result))

  }
}


// // ======================================================
// //        createPallet_lines
// // ======================================================

const getLines = (lines) => ({
  type: types.GET_CREATE_PALLET_LINES,
  payload: lines,
});


const keepLines2Update = (linesData) => ({
  type: types.GET_CREATE_PALLET_LINES_UPDATE,
  payload: linesData,

})

const lines2Copy = (linesData) => ({
  type: types.COPY_CREATE_PALLET_LINES,
  payload: linesData,

})



// //   --------------------------------------------

export const loadLines = (palletID) => {
  return async function (dispatch) {
    const allLines = await (createPalletUtils.GetCreatePalletLines_list(palletID))
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

export const deletLines = (id, palletID) => {
  return async function (dispatch) {
    await createPalletUtils.delete_createPalletLines(id)
    dispatch(loadLines(palletID))
  }
}



// //---------------------------------------------

export const deletAllLines = (palletID) => {
  return async function () {
    await createPalletUtils.delete_AllcreatePalletLines(palletID)
  }
}

// //---------------------------------------------

export const updateLineDB = (lineData, palletID) => {
  return async function (dispatch) {
    let result = await createPalletUtils.Update_createPalletLines(lineData, lineData.id)
    dispatch(loadLines(palletID))
    return result
  }
}

// //--------------------------------------------
export const addLine = (lineData, palletID) => {
  return async function (dispatch) {
    let result = await createPalletUtils.Add_createPalletLines(lineData)
    dispatch(loadLines(palletID))
    return result
  }
}

