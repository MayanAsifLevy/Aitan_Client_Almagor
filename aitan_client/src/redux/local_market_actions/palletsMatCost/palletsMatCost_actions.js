import * as types from "./palletsMatCost_action_types";
import * as palletsMatCostUtils from "../../../utils/PalletsMatCostUTL";


const getPalletsMat = (palletsMat) => ({
  type: types.GET_PALLETSMATCOST,
  payload: palletsMat,
});


const keepPalletMatCost2Update = (palletMatCostData) => ({
  type: types.GET_PALLETMATCOST_UPDATE,
  payload: palletMatCostData,
})

const palletMatCost2Copy = (palletMatCostData) => ({
  type: types.COPY_PALLETMATCOST,
  payload: palletMatCostData,
})



//   --------------------------------------------

export const loadPalletsMatCost = (palletMatID, _token) => {
  return async function (dispatch) {
    const allPalletsMat = await (palletsMatCostUtils.GetPalletsMatCost_list(palletMatID, _token))
    if (typeof allPalletsMat !== 'string') { allPalletsMat.sort((a, b) => (a.palletfromDate > b.palletfromDate) ? 1 : -1) }
    dispatch(getPalletsMat(allPalletsMat))
  }
}

//   --------------------------------------------

export const copy2PalletMatCost = (palletMatCostData) => {
  return async function (dispatch) {
    dispatch(palletMatCost2Copy(palletMatCostData));
  }
}

//   --------------------------------------------

export const savePalletMatCost2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepPalletMatCost2Update(row));
  }
}

//---------------------------------------------

export const deletePalletMatCost = (id, palletMatID, _token) => {
  return async function (dispatch) {
    await palletsMatCostUtils.delete_palletMatCost(id)
    dispatch(loadPalletsMatCost(palletMatID, _token))
  }
}

//---------------------------------------------

export const updatePalletMatCostDB = (palletMatCostData, palletMatID, _token) => {
  return async function (dispatch) {
    let result = await palletsMatCostUtils.Update_palletMatCost(palletMatCostData, palletMatCostData.id)
    dispatch(loadPalletsMatCost(palletMatID, _token))
    return result
  }
}

//--------------------------------------------

export const addPalletMatCost = (palletMatCostData, palletMatID, _token) => {
  return async function (dispatch) {
    let result = await palletsMatCostUtils.Add_palletMatCost(palletMatCostData)
    dispatch(loadPalletsMatCost(palletMatID, _token))
    return result
  }
}
//   --------------------------------------------
