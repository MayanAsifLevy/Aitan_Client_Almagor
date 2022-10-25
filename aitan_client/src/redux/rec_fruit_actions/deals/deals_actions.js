import * as types from "./deals_action_types";
import * as dealsUtils from "../../../utils/DealsUTL";


const getDeals = (deals) => ({
  type: types.GET_DEALS,
  payload: deals,
});


const keepDeal2Update = (dealData) => ({
  type: types.GET_DEAL_UPDATE,
  payload: dealData,
})

const deal2Copy = (dealData) => ({
  type: types.COPY_DEAL,
  payload: dealData,
})

const saveFruitDealList = (list) => ({
  type: types.SAVE_FRUITDEALIST,
  payload: list,
})


//   --------------------------------------------

export const loadDeals = (filteredSeason, _token) => {
  return async function (dispatch) {
    const alldeals = await (dealsUtils.GetDeals_list(filteredSeason, _token))
    if (typeof alldeals !== 'string') { alldeals.sort((a, b) => (a.dealName > b.dealName) ? 1 : -1) }
    dispatch(getDeals(alldeals))
  }
}

//   --------------------------------------------

export const copy2Deal = (dealData) => {
  return async function (dispatch) {
    dispatch(deal2Copy(dealData));
  }
}

//   --------------------------------------------

export const saveDeal2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepDeal2Update(row));
  }
}

//---------------------------------------------

export const deletDeal = (id, filteredSeason, _token) => {
  return async function (dispatch) {
    await dealsUtils.delete_deal(id)
    dispatch(loadDeals(filteredSeason, _token))
  }
}

//---------------------------------------------

export const updateDealDB = (dealData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await dealsUtils.Update_deal(dealData, dealData.id)
    dispatch(loadDeals(filteredSeason, _token))
    return result
  }
}

//--------------------------------------------

export const addDeal = (dealData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await dealsUtils.Add_deal(dealData)
    dispatch(loadDeals(filteredSeason, _token))
    return result
  }
}

//--------------------------------------------

export const fruitDealList = (list) => {
  return async function (dispatch) {
    dispatch(saveFruitDealList(list));
  }
}
