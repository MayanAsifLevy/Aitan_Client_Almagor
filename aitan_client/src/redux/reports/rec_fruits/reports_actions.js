import * as types from "./reports_action_types";
import * as ReportUTL from "../../../utils/reports/receive_reports/ReportsUTLs";


//   ----------------- monthly ---------------------------

const getMonthlyData = (data) => ({
  type: types.GET_MONTHLY_DATA,
  payload: data,
});


export const loadMonthlyData = (data) => {
  return async function (dispatch) {
    const result = await (ReportUTL.MonthlyReport(data['reportType'], data['season'], data['growerID'], data['month']))
    dispatch(getMonthlyData(result))
    return result
  }
}


//   ------------------ daily --------------------------

const getDailyData = (data) => ({
  type: types.GET_DAILY_DATA,
  payload: data,
});


export const loadDailyData = (data) => {
  return async function (dispatch) {
    const result = await (ReportUTL.DailyReport(data['dateFilter'], data['growerID']))
    dispatch(getDailyData(result))
    return result
  }
}

//   ------------------ season --------------------------

const getSeasonData = (data) => ({
  type: types.GET_SEASON_DATA,
  payload: data,
});


export const loadSeasonData = (data) => {
  return async function (dispatch) {
    const result = await (ReportUTL.SeasonReport(data['season'], data['growerID']))
    dispatch(getSeasonData(result))
    return result
  }
}


//   ----------------- summary ---------------------------

const getSummaryData = (data, _token) => ({
  type: types.GET_SUMMARY_DATA,
  payload: data,
});


export const loadSummaryData = (data, _token) => {
  return async function (dispatch) {
    const result = await (ReportUTL.SummaryReport(data['reportType'], data['season'], data['month'], _token))
    dispatch(getSummaryData(result))
    return result
  }
}


//   ----------------- plot ---------------------------

const getPlotData = (data) => ({
  type: types.GET_PLOT_DATA,
  payload: data,
});


export const loadPlotData = (data) => {
  return async function (dispatch) {
    const result = await (ReportUTL.PlotReport(data['reportType'], data['plotName'], data['fromDateFilter'], data['toDateFilter']))
    dispatch(getPlotData(result))
    return result
  }
}