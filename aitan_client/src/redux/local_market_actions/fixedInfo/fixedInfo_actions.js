import * as types from "./fixedInfo_action_types";
import * as typesGeneral from "../../mainPage/general_action_types";
import * as fixedInfoUtils from "../../../utils/FixedInfoUTL";


const getFixedInfo = (info) => ({
  type: types.GET_FIXEDINFO,
  payload: info,
});


const keepFixedInfo2Update = (info) => ({
  type: types.GET_FIXEDINFO_UPDATE,
  payload: info,

})

const saveTraderPrcnt = (infoValue) => ({
  type: typesGeneral.TRADERPRCNT,
  payload: infoValue,
})


const saveDistributerPrcnt = (infoValue) => ({
  type: typesGeneral.DISTRIBUTERPRCENT,
  payload: infoValue,
})


const saveVAT = (infoValue) => ({
  type: typesGeneral.VAT,
  payload: infoValue,
})


//   --------------------------------------------

export const loadFixedInfo = (_token) => {
  return async function (dispatch) {
    const allInfo = await (fixedInfoUtils.GetFixedInfo_list(_token))
    if (typeof allInfo !== 'string') { allInfo.sort((a, b) => (a.name_hebrew > b.name_hebrew) ? 1 : -1) }
    dispatch(getFixedInfo(allInfo))

    if (typeof allInfo !== 'string') {
      allInfo.map((info) => {
        switch (info.name) {

          case "traderPrcnt":
            return dispatch(saveTraderPrcnt(info.value))

          case "distributerPrcnt":
            return dispatch(saveDistributerPrcnt(info.value))

          case "VAT":
            return dispatch(saveVAT(info.value))


          default:
            return ""
        }

      })
    }
  }
}


//   --------------------------------------------

export const saveFixedInfo2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepFixedInfo2Update(row));
  }
}


//---------------------------------------------

export const updateFixedInfoDB = (infoData, _token) => {
  return async function (dispatch) {
    let result = await fixedInfoUtils.update_fixedInfo(infoData, infoData.name)
    dispatch(loadFixedInfo(_token))
    return result
  }
}
