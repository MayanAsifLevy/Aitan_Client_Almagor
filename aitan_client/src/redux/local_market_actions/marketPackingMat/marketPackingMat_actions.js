import * as types from "./marketPackingMat_action_types";
import * as marketPackingMatsUTLs from "../../../utils/MarketPackingMatsUTL";


const getMarketPacking = (marketPacking) => ({
  type: types.GET_MARKETPACKINGS,
  payload: marketPacking,
});


const keepMarketPacking2Update = (marketPackingData) => ({
  type: types.GET_MARKETPACKING_UPDATE,
  payload: marketPackingData,
})

const marketPacking2Copy = (marketPackingData) => ({
  type: types.COPY_MARKETPACKING,
  payload: marketPackingData,
})


//   --------------------------------------------

export const loadMarketPackings = (_token) => {
  return async function (dispatch) {
    const allMarketPackings = await (marketPackingMatsUTLs.GetMarketPackingMat_list(_token))
    dispatch(getMarketPacking(allMarketPackings))
  }
}

//   --------------------------------------------

export const copy2MarketPacking = (marketPackingData) => {
  return async function (dispatch) {
    dispatch(marketPacking2Copy(marketPackingData));
  }
}

//   --------------------------------------------

export const saveMarketPacking2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepMarketPacking2Update(row));
  }
}

//---------------------------------------------

export const deleteMarketPacking = (id, _token) => {
  return async function (dispatch) {
    await marketPackingMatsUTLs.delete_marketPackingMat(id)
    dispatch(loadMarketPackings(_token))
  }
}

//---------------------------------------------

export const updateMarketPackingMatDB = (marketPackingData, _token) => {
  return async function (dispatch) {
    let result = await marketPackingMatsUTLs.Update_marketPackingMat(marketPackingData, marketPackingData.id)
    dispatch(loadMarketPackings(_token))
    return result
  }
}

//--------------------------------------------

export const addMarketPackingMat = (marketPackingData, _token) => {
  return async function (dispatch) {
    let result = await marketPackingMatsUTLs.add_marketPackingMat(marketPackingData)
    dispatch(loadMarketPackings(_token))
    return result
  }
}
