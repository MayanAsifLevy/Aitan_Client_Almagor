import * as types from "./traders_action_types";
import * as tradersUtils from "../../../utils/TradersUTL";


const getTraders = (tarders) => ({
  type: types.GET_TRADERS,
  payload: tarders,
});


const keepTrader2Update = (tarderData) => ({
  type: types.GET_TRADER_UPDATE,
  payload: tarderData,
})

const trader2Copy = (tarderData) => ({
  type: types.COPY_TRADER,
  payload: tarderData,
})


//   --------------------------------------------

export const loadTraders = (_token) => {
  return async function (dispatch) {
    const allTraders = await (tradersUtils.GetTraders_list(_token))
    if (typeof allTraders !== 'string') { allTraders.sort((a, b) => (a.traderName > b.traderName) ? 1 : -1) }
    dispatch(getTraders(allTraders))
  }
}

//   --------------------------------------------

export const copy2Trader = (traderData) => {
  return async function (dispatch) {
    dispatch(trader2Copy(traderData));
  }
}

//   --------------------------------------------

export const saveTrader2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepTrader2Update(row));
  }
}

//---------------------------------------------

export const deletTrader = (id, _token) => {
  return async function (dispatch) {
    await tradersUtils.delete_trader(id)
    dispatch(loadTraders(_token))
  }
}

//---------------------------------------------

export const updateTraderDB = (traderData, _token) => {
  return async function (dispatch) {
    let result = await tradersUtils.Update_trader(traderData, traderData.id)
    dispatch(loadTraders(_token))
    return result
  }
}

//--------------------------------------------

export const addTrader = (traderData, _token) => {
  return async function (dispatch) {
    let result = await tradersUtils.Add_trader(traderData)
    dispatch(loadTraders(_token))
    return result
  }
}
