import * as types from "./receivingFruits_action_types";
import * as receivingFruitsUtils from "../../../utils/ReceivingFruitsUTL";


const getReceivingFruits = (receivingFruits) => ({
  type: types.GET_RECEIVINGFRUITS,
  payload: receivingFruits,
});


const keepReceivingFruit2Update = (receivingFruitData) => ({
  type: types.GET_RECEIVINGFRUIT_UPDATE,
  payload: receivingFruitData,
})

const receivingFruit2Copy = (receivingFruitData) => ({
  type: types.COPY_RECEIVINGFRUIT,
  payload: receivingFruitData,
})


//   --------------------------------------------

export const loadReceivingFruits = (filteredSeason, _token) => {
  return async function (dispatch) {
    const allReceivingFruits = await (receivingFruitsUtils.GetReceivingFruits_list(filteredSeason, _token))
    dispatch(getReceivingFruits(allReceivingFruits))
  }
}

//   --------------------------------------------

export const copy2ReceivingFruit = (receivingFruitData) => {
  return async function (dispatch) {
    dispatch(receivingFruit2Copy(receivingFruitData));
  }
}

//   --------------------------------------------

export const saveReceivingFruit2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepReceivingFruit2Update(row));
  }
}

//---------------------------------------------

export const deletReceivingFruit = (id, filteredSeason, _token) => {
  return async function (dispatch) {
    await receivingFruitsUtils.delete_receivingFruit(id)
    dispatch(loadReceivingFruits(filteredSeason, _token))
  }
}

//---------------------------------------------

export const updateReceivingFruitDB = (receivingFruitData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await receivingFruitsUtils.Update_receivingFruit(receivingFruitData, receivingFruitData.id)
    dispatch(loadReceivingFruits(filteredSeason, _token))
    return result
  }
}

//--------------------------------------------

export const addReceivingFruit = (receivingFruitData, filteredSeason, _token) => {
  return async function (dispatch) {
    let result = await receivingFruitsUtils.Add_receivingFruit(receivingFruitData)
    dispatch(loadReceivingFruits(filteredSeason, _token))
    return result
  }
}
