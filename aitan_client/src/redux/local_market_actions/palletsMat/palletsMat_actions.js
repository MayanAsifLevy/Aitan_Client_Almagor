import * as types from "./palletsMat_action_types";
import * as palletsMatUtils from "../../../utils/PalletsMatUTL";


const getPalletsMat = (palletsMat) => ({
  type: types.GET_PALLETSMAT,
  payload: palletsMat,
});


const keepPalletMat2Update = (palletMatData) => ({
  type: types.GET_PALLETMAT_UPDATE,
  payload: palletMatData,
})

const palletMat2Copy = (palletMatData) => ({
  type: types.COPY_PALLETMAT,
  payload: palletMatData,
})



const pallet4cost = (palletMatData) => ({
  type: types.SAVE_PALLETMAT4COST,
  payload: palletMatData,
})

//   --------------------------------------------

export const loadPalletsMat = (_token) => {
  return async function (dispatch) {
    const allPalletsMat = await (palletsMatUtils.GetPalletsMat_list(_token))
    if (typeof allPalletsMat !== 'string') { allPalletsMat.sort((a, b) => (a.palletType > b.palletType) ? 1 : -1) }
    dispatch(getPalletsMat(allPalletsMat))
  }
}

//   --------------------------------------------

export const copy2PalletMat = (palletMatData) => {
  return async function (dispatch) {
    dispatch(palletMat2Copy(palletMatData));
  }
}

//   --------------------------------------------

export const savePalletMat2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepPalletMat2Update(row));
  }
}

//---------------------------------------------

export const deletePalletMat = (id, _token) => {
  return async function (dispatch) {
    await palletsMatUtils.delete_palletMat(id)
    dispatch(loadPalletsMat(_token))
  }
}

//---------------------------------------------

export const updatePalletMatDB = (palletMatData, _token) => {
  return async function (dispatch) {
    let result = await palletsMatUtils.Update_palletMat(palletMatData, palletMatData.id)
    dispatch(loadPalletsMat(_token))
    return result
  }
}

//--------------------------------------------

export const addPalletMat = (palletMatData, _token) => {
  return async function (dispatch) {
    let result = await palletsMatUtils.Add_palletMat(palletMatData)
    dispatch(loadPalletsMat(_token))
    return result
  }
}
//   --------------------------------------------

export const savePallet4Cost = (palletMatData) => {
  return async function (dispatch) {
    dispatch(pallet4cost(palletMatData));
  }
}