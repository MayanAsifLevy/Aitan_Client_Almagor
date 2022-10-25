import * as types from "./packingHouse_action_types";
import * as packingHouseUtils from "../../../utils/PackingHouseUTL";


const getPackingHouse = (packinghouses) => ({
  type: types.GET_PACKINGHOUSE,
  payload: packinghouses,
});


const keepPackingHouse2Update = (packingHouseData) => ({
  type: types.GET_PACKINGHOUSE_UPDATE,
  payload: packingHouseData,
})

const packingHouse2Copy = (packingHouseData) => ({
  type: types.COPY_PACKINGHOUSE,
  payload: packingHouseData,
})

//   --------------------------------------------

export const loadpackingHouses = (_token) => {
  return async function (dispatch) {
    const allpackingHouses = await (packingHouseUtils.getPackingHouse_list(_token))
    if (typeof allpackingHouses !== 'string') { allpackingHouses.sort((a, b) => (a.packingHouseName + a.location > b.packingHouseName + b.location) ? 1 : -1) }
    dispatch(getPackingHouse(allpackingHouses))
  }
}

//   --------------------------------------------

export const copy2PackingHouse = (packingHouseData) => {
  return async function (dispatch) {
    dispatch(packingHouse2Copy(packingHouseData))
  }
}

//   --------------------------------------------

export const savePackingHouse2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepPackingHouse2Update(row))
  }
}

//---------------------------------------------

export const deletPackingHouse = (id, _token) => {
  return async function (dispatch) {
    await packingHouseUtils.delete_packingHouse(id);
    dispatch(loadpackingHouses(_token));
  }
}

//---------------------------------------------

export const updatePackingHouseDB = (packingHouseData, _token) => {
  return async function (dispatch) {
    let result = await packingHouseUtils.update_packingHouse(packingHouseData, packingHouseData.id)
    dispatch(loadpackingHouses(_token))
    return result
  }
}

//--------------------------------------------

export const addPackingHouse = (packingHouseData, _token) => {
  return async function (dispatch) {
    let result = await packingHouseUtils.add_packingHouse(packingHouseData)
    dispatch(loadpackingHouses(_token))
    return result
  }
}
