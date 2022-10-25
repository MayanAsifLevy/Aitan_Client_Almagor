import * as types from "./dealNames_action_types";
import * as dealNamesUtils from "../../../utils/DealNamesUTL";


const getDealNames = (dealNames) => ({
  type: types.GET_DEALNAMES,
  payload: dealNames,
});


const keepDealName2Update = (dealNameData) => ({
  type: types.GET_DEALNAME_UPDATE,
  payload: dealNameData,
})

const dealName2Copy = (dealNameData) => ({
  type: types.COPY_DEALNAME,
  payload: dealNameData,
})


//   --------------------------------------------

export const loadDealNames = (_token) => {
  return async function (dispatch) {
    const allDealNames = await (dealNamesUtils.GetDealNames_list(_token))
    if (typeof allDealNames !== 'string') { allDealNames.sort((a, b) => (a.dealName > b.dealName) ? 1 : -1) }
    dispatch(getDealNames(allDealNames))
  }
}

//   --------------------------------------------

export const copy2DealName = (dealNameData) => {
  return async function (dispatch) {
    dispatch(dealName2Copy(dealNameData));
  }
}

//   --------------------------------------------

export const saveDealName2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepDealName2Update(row));
  }
}

//---------------------------------------------

export const deletDealName = (id, _token) => {
  return async function (dispatch) {
    await dealNamesUtils.delete_dealName(id)
    dispatch(loadDealNames(_token))
  }
}

//---------------------------------------------

export const updateDealNameDB = (dealNameData, _token) => {
  return async function (dispatch) {
    let result = await dealNamesUtils.Update_dealName(dealNameData, dealNameData.id)
    dispatch(loadDealNames(_token))
    return result
  }
}

//--------------------------------------------

export const addDealName = (dealNameData, _token) => {
  return async function (dispatch) {
    let result = await dealNamesUtils.Add_dealName(dealNameData)
    dispatch(loadDealNames(_token))
    return result
  }
}
