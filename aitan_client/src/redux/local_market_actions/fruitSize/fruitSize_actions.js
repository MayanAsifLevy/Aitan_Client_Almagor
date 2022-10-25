import * as types from "./fruitSize_action_types";
import * as fruitSizeUtils from "../../../utils/FruitSizeUTL";


const getFruitSize = (fruitSize) => ({
  type: types.GET_FRUITSIZE,
  payload: fruitSize,
});


const keepFruitSize2Update = (fruitSizeData) => ({
  type: types.GET_FRUITSIZE_UPDATE,
  payload: fruitSizeData,

})

const fruitSize2Copy = (fruitSizeData) => ({
  type: types.COPY_FRUITSIZE,
  payload: fruitSizeData,

})


//   --------------------------------------------

export const loadFruitSize = (_token) => {
  return async function (dispatch) {
    const allFruitSize = await (fruitSizeUtils.GetFruitSize_list(_token))
    if (typeof allFruitSize !== 'string') { allFruitSize.sort((a, b) => (a.size > b.size) ? 1 : -1) }
    dispatch(getFruitSize(allFruitSize))
  }
}

//   --------------------------------------------

export const copy2FruitSize = (fruitSizeData) => {
  return async function (dispatch) {
    dispatch(fruitSize2Copy(fruitSizeData));
  }
}

//   --------------------------------------------

export const saveFruitSize2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepFruitSize2Update(row));
  }
}

//---------------------------------------------

export const deletFruitSize = (id, _token) => {
  return async function (dispatch) {
    await fruitSizeUtils.delete_fruitSize(id)
    dispatch(loadFruitSize(_token))
  }
}

//---------------------------------------------

export const updateFruitSizeDB = (fruitSizeData, _token) => {
  return async function (dispatch) {
    let result = await fruitSizeUtils.Update_fruitSize(fruitSizeData, fruitSizeData.id)
    dispatch(loadFruitSize(_token))
    return result
  }
}

//--------------------------------------------

export const addFruitSize = (fruitSizeData, _token) => {
  return async function (dispatch) {
    let result = await fruitSizeUtils.Add_fruitSize(fruitSizeData)
    dispatch(loadFruitSize(_token))
    return result
  }
}
