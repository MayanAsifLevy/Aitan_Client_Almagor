import * as types from "./packingMaterial_action_types";
import * as packingMaterialUtils from "../../../utils/PackingMaterialUTL";


const getPackingMaterial = (packingMaterials) => ({
  type: types.GET_PACKINGMATERIAL,
  payload: packingMaterials,
});


const keepPackingMaterial2Update = (packingMaterialData) => ({
  type: types.GET_PACKINGMATERIAL_UPDATE,
  payload: packingMaterialData,
})

const packingMaterial2Copy = (packingMaterialData) => ({
  type: types.COPY_PACKINGMATERIAL,
  payload: packingMaterialData,
})


//   --------------------------------------------

export const loadPackingMaterials = (_token) => {
  return async function (dispatch) {
    const allpackingMaterials = await (packingMaterialUtils.GetPackingMaterials_list(_token))
    if (typeof allpackingMaterials !== 'string') { allpackingMaterials.sort((a, b) => (a.packingType > b.packingType) ? 1 : -1) }
    dispatch(getPackingMaterial(allpackingMaterials))
  }
}

//   --------------------------------------------

export const copy2PackingMaterial = (packingMaterialData) => {
  return async function (dispatch) {
    dispatch(packingMaterial2Copy(packingMaterialData))
  }
}

//   --------------------------------------------

export const savePackingMaterial2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepPackingMaterial2Update(row))
  }
}

//---------------------------------------------

export const deletPackingMaterial = (id, _token) => {
  return async function (dispatch) {
    await packingMaterialUtils.delete_packingMaterial(id);
    dispatch(loadPackingMaterials(_token));
  }
}

//---------------------------------------------

export const updatePackingMaterialDB = (packingMaterialData, _token) => {
  return async function (dispatch) {
    let result = await packingMaterialUtils.update_packingMaterial(packingMaterialData, packingMaterialData.id)
    dispatch(loadPackingMaterials(_token))
    return result
  }
}

//--------------------------------------------

export const addPackingMaterial = (packingMaterialData, _token) => {
  return async function (dispatch) {
    let result = await packingMaterialUtils.add_packingMaterial(packingMaterialData)
    dispatch(loadPackingMaterials(_token))
    return result
  }
}
