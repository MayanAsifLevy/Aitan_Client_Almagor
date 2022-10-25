import * as types from "./manufacturerInvoice_action_types";
import * as manufacturerInvoiceUtils from "../../../utils/ManufacturerInvoiceUTL";


const getManufacturerInvoice = (ManufacturerInvoiceData) => ({
  type: types.GET_MANUFACTURERINVOICE,
  payload: ManufacturerInvoiceData,
});


const keepManufacturerInvoice2Update = (ManufacturerInvoiceData) => ({
  type: types.GET_MANUFACTURERINVOICE_UPDATE,
  payload: ManufacturerInvoiceData,
})

const ManufacturerInvoice2Copy = (ManufacturerInvoiceData) => ({
  type: types.COPY_MANUFACTURERINVOICE,
  payload: ManufacturerInvoiceData,
})


//   --------------------------------------------

export const loadManufacturerInvoices = (filteredSeason, _token) => {
  return async function (dispatch) {
    const allInvoices = await (manufacturerInvoiceUtils.GetManufacturerInvoice_list(filteredSeason, _token))
    dispatch(getManufacturerInvoice(allInvoices))
  }
}

//   --------------------------------------------

export const copy2ManufacturerInvoice = (ManufacturerInvoiceData) => {
  return async function (dispatch) {
    dispatch(ManufacturerInvoice2Copy(ManufacturerInvoiceData));
  }
}

//   --------------------------------------------

export const saveManufacturerInvoice2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepManufacturerInvoice2Update(row));
  }
}

//---------------------------------------------

export const deletManufacturerInvoice = (id, filteredSeason, _token) => {
  return async function (dispatch) {
    await manufacturerInvoiceUtils.delete_manufacturerInvoice(id)
    dispatch(loadManufacturerInvoices(filteredSeason, _token))
  }
}

// //---------------------------------------------

export const updateManufacturerInvoiceDB = (ManufacturerInvoiceData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await manufacturerInvoiceUtils.Update_manufacturerInvoice(ManufacturerInvoiceData, ManufacturerInvoiceData.id)
    dispatch(loadManufacturerInvoices(filteredSeason, _token))
    return result
  }
}

// //--------------------------------------------

export const addManufacturerInvoice = (ManufacturerInvoiceData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await manufacturerInvoiceUtils.Add_manufacturerInvoice(ManufacturerInvoiceData)
    dispatch(loadManufacturerInvoices(filteredSeason, _token))
    return result
  }
}