import * as types from "./fruits_action_types";
import * as fruitsUtils from "../../../utils/FruitsUTL";


const getFruits = (fruits) => ({
  type: types.GET_FRUITS,
  payload: fruits,
});


const keepFruit2Update = (fruitData) => ({
  type: types.GET_FRUIT_UPDATE,
  payload: fruitData,

})

const fruit2Copy = (fruitData) => ({
  type: types.COPY_FRUIT,
  payload: fruitData,
})



const saveFruitList = (fruitList) => ({
  type: types.FRUITS_LIST,
  payload: fruitList,
})


//   --------------------------------------------

export const loadFruits = (_token) => {
  return async function (dispatch) {
    const allFruits = await (fruitsUtils.GetFruits_list(_token))
    if (typeof allFruits !== 'string') { allFruits.sort((a, b) => (a.fruitType > b.fruitType) ? 1 : -1) } //sorting abc
    dispatch(getFruits(allFruits))

    let fruitList = ['בחר פרי']
    if (typeof allFruits !== 'string') { allFruits.map((fruit) => { return fruitList.push(fruit.fruitName) }) }

    const uniqueFruits = [...new Set(fruitList)];
    dispatch(saveFruitList(uniqueFruits))
  }
}

//   --------------------------------------------

export const copy2Fruit = (fruitData) => {
  return async function (dispatch) {
    dispatch(fruit2Copy(fruitData));
  }
}

//   --------------------------------------------

export const saveFruit2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepFruit2Update(row));
  }
}

//---------------------------------------------

export const deletFruit = (id, _token) => {
  return async function (dispatch) {
    await fruitsUtils.delete_fruit(id)
    dispatch(loadFruits(_token))
  }
}

//---------------------------------------------

export const updateFruitDB = (fruitData, _token) => {
  return async function (dispatch) {
    let result = await fruitsUtils.Update_fruit(fruitData, fruitData.id)
    dispatch(loadFruits(_token))
    return result
  }
}

//--------------------------------------------

export const addFruit = (fruitData, _token) => {
  return async function (dispatch) {
    let result = await fruitsUtils.Add_fruit(fruitData)
    dispatch(loadFruits(_token))
    return result
  }
}


//   -==================================================


export const captureFruitList = (allFruits) => {
  return async function (dispatch) {
    const uniqueFruits = [...new Set(allFruits)];
    dispatch(saveFruitList(uniqueFruits))
  }
}

//--------------------------------------------

export const add2FruitList = (newValue) => {
  return async function (dispatch) {

    dispatch(saveFruitList(newValue))
  }
}
