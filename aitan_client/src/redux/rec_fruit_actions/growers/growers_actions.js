import * as types from "./growers_action_types";
import * as growersUtils from "../../../utils/GrowersUTL";


const getGrowers = (growers) => ({
  type: types.GET_GROWERS,
  payload: growers,
});


const keepGrower2Update = (growerData) => ({
  type: types.GET_GROWER_UPDATE,
  payload: growerData,
})

const grower2Copy = (growerData) => ({
  type: types.COPY_GROWER,
  payload: growerData,
})


//   --------------------------------------------

export const loadGrowers = (_token) => {
  return async function (dispatch) {
    const allGrowers = await (growersUtils.GetGrowers_list(_token))
    if (typeof allGrowers !== 'string') { allGrowers.sort((a, b) => (a.growerName > b.growerName) ? 1 : -1) }
    dispatch(getGrowers(allGrowers))
  }
}

//   --------------------------------------------

export const copy2Grower = (growerData) => {
  return async function (dispatch) {
    dispatch(grower2Copy(growerData));
  }
}

//   --------------------------------------------

export const saveGrower2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepGrower2Update(row));
  }
}

//---------------------------------------------

export const deletGrower = (id, _token) => {
  return async function (dispatch) {
    await growersUtils.delete_grower(id)
    dispatch(loadGrowers(_token))
  }
}

//---------------------------------------------

export const updateGrowerDB = (growerData, _token) => {
  return async function (dispatch) {
    let result = await growersUtils.Update_grower(growerData, growerData.id)
    dispatch(loadGrowers(_token))
    return result
  }
}

//--------------------------------------------

export const addGrower = (growerData, _token) => {
  return async function (dispatch) {
    let result = await growersUtils.Add_grower(growerData)
    dispatch(loadGrowers(_token))
    return result
  }
}
