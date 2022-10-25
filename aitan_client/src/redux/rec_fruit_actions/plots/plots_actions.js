import * as types from "./plots_action_types";
import * as plotsUtils from "../../../utils/PlotsUTL";


const getPlots = (plots) => ({
  type: types.GET_PLOTS,
  payload: plots,
});


const keepplot2Update = (plotData) => ({
  type: types.GET_PLOT_UPDATE,
  payload: plotData,
})

const plot2Copy = (plotData) => ({
  type: types.COPY_PLOT,
  payload: plotData,
})



//   --------------------------------------------

export const loadPlots = (_token) => {
  return async function (dispatch) {
    const allplots = await (plotsUtils.GetPlots_list(_token))
    if (typeof allplots !== 'string') { allplots.sort((a, b) => (a.plotName > b.plotName) ? 1 : -1) }
    dispatch(getPlots(allplots))
  }
}

//   --------------------------------------------

export const copy2Plot = (plotData) => {
  return async function (dispatch) {
    dispatch(plot2Copy(plotData));
  }
}

//   --------------------------------------------

export const savePlot2Update = (row) => {
  return async function (dispatch) {
    dispatch(keepplot2Update(row));
  }
}

//---------------------------------------------

export const deletPlot = (id, _token) => {
  return async function (dispatch) {
    await plotsUtils.delete_plot(id)
    dispatch(loadPlots(_token))
  }
}

//---------------------------------------------

export const updatePlotDB = (plotData, _token) => {
  return async function (dispatch) {
    let result = await plotsUtils.Update_plot(plotData, plotData.id)
    dispatch(loadPlots(_token))
    return result
  }
}

//--------------------------------------------

export const addPlot = (plotData, _token) => {
  return async function (dispatch) {
    let result = await plotsUtils.Add_plot(plotData)
    dispatch(loadPlots(_token))
    return result
  }
}
