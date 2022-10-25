import * as types from "./closingData_action_types";
import * as closingDataUTLs from "../../../utils/ClosingDataUTL";


const getClosingData = (closingInfo) => ({
  type: types.GET_CLOSINGDATA,
  payload: closingInfo,
});


const keepClosingData2Update = (closingInfo) => ({
  type: types.GET_CLOSINGDATA_UPDATE,
  payload: closingInfo,

})

const ClosingData2Copy = (closingInfo) => ({
  type: types.COPY_CLOSINGDATA,
  payload: closingInfo,
})


//   --------------------------------------------

export const loadClosingData = (filteredSeason, _token) => {
  return async function (dispatch) {
    const allClosingData = await (closingDataUTLs.GetClosingData_list(filteredSeason, _token))
    dispatch(getClosingData(allClosingData))
  }
}

//   --------------------------------------------

export const copy2ClosingData = (data) => {
  return async function (dispatch) {
    dispatch(ClosingData2Copy(data));
  }
}

//   --------------------------------------------

export const saveClosingData2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepClosingData2Update(row));
  }
}

//---------------------------------------------

export const deleteClosingData = (id, season2filter, _token) => {
  return async function (dispatch) {
    await closingDataUTLs.delete_closingData(id)
    dispatch(loadClosingData(season2filter, _token))
  }
}

//---------------------------------------------

export const updateClosingDataDB = (data, season2filter, _token) => {
  return async function (dispatch) {
    let result = await closingDataUTLs.Update_closingData(data, data.id)
    dispatch(loadClosingData(season2filter, _token))
    return result
  }
}

//--------------------------------------------

export const addClosingData = (data, season2filter, _token) => {
  return async function (dispatch) {
    let result = await closingDataUTLs.Add_closingData(data)
    dispatch(loadClosingData(season2filter, _token))
    return result
  }
}
