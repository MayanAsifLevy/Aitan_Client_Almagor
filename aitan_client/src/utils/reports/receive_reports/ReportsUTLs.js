import axios from 'axios';


export async function MonthlyReport(reportType, season, growerid, month) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_REPORTS_MONTHLY_API}`, { params: { 'reportFilter': reportType, 'season2filter': season, 'grower2filter': growerid, 'month2filter': month } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};



export async function DailyReport(datefilter, growerid) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_REPORTS_DAILY_API}`, { params: { 'date2filter': datefilter, 'grower2filter': growerid } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};



export async function SeasonReport(season, growerid) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_REPORTS_SEASON_API}`, { params: { 'season2filter': season, 'grower2filter': growerid } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function SummaryReport(reportType, season, month, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_REPORTS_SUMMARY_API}`, { params: { 'reportFilter': reportType, 'season2filter': season, 'month2filter': month }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function PlotReport(reportType, plotName, fromDate, toDate) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_REPORTS_PLOT_API}`, { params: { 'reportFilter': reportType, 'plotName2Filter': plotName, 'fromDate2Filter': fromDate, 'toDate2Filter': toDate } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};