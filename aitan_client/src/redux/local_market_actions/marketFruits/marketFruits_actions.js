import * as types from "./marketFruits_action_types";
import * as marketFruitsUtils from "../../../utils/MarketFruitsUTL";


const getMarketFruits = (marketFruitData) => ({
  type: types.GET_MARKETFRUITS,
  payload: marketFruitData,
});


const keepMarketFruit2Update = (marketFruitData) => ({
  type: types.GET_MARKETFRUIT_UPDATE,
  payload: marketFruitData,
})

const marketFruit2Copy = (marketFruitData) => ({
  type: types.COPY_MARKETFRUIT,
  payload: marketFruitData,
})

const saveQualityList = (qualityList) => ({
  type: types.QUALITY_LIST,
  payload: qualityList,

})

//   --------------------------------------------

export const loadMarketFruits = (_token) => {
  return async function (dispatch) {
    const allMarketFruits = await (marketFruitsUtils.GetMarketFruit_list(_token))
    if (typeof allMarketFruits !== 'string') { allMarketFruits.sort((a, b) => (a.fruitType > b.fruitType) ? 1 : -1) }//sorting abc
    dispatch(getMarketFruits(allMarketFruits))

    let qualityList = ['בחר']
    if (typeof allMarketFruits !== 'string') { allMarketFruits.map((recrod) => { return qualityList.push(recrod.quality) }) }

    const uniqueQuality = [...new Set(qualityList)];
    dispatch(saveQualityList(uniqueQuality))
  }
}

//   --------------------------------------------

export const copy2MarketFruit = (marketFruitData) => {
  return async function (dispatch) {
    dispatch(marketFruit2Copy(marketFruitData));
  }
}

//   --------------------------------------------

export const saveMarketFruit2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepMarketFruit2Update(row));
  }
}

//---------------------------------------------

export const deletMarketFruit = (id, _token) => {
  return async function (dispatch) {
    await marketFruitsUtils.delete_marketFruit(id)
    dispatch(loadMarketFruits(_token))
  }
}

//---------------------------------------------

export const updateMarketFruitDB = (marketFruitData, _token) => {
  return async function (dispatch) {
    let result = await marketFruitsUtils.Update_marketFruit(marketFruitData, marketFruitData.id)
    dispatch(loadMarketFruits(_token))
    return result
  }
}

//--------------------------------------------

export const addMarketFruit = (marketFruitData, _token) => {
  return async function (dispatch) {
    let result = await marketFruitsUtils.Add_marketFruit(marketFruitData)
    dispatch(loadMarketFruits(_token))
    return result
  }
}

//   -==================================================


export const captureQualityList = (allMarketFruits) => {
  return async function (dispatch) {
    const uniqueQuality = [...new Set(allMarketFruits)];
    dispatch(saveQualityList(uniqueQuality))
  }
}

//--------------------------------------------

export const add2QualityList = (newValue) => {
  return async function (dispatch) {

    dispatch(saveQualityList(newValue))
  }
}
