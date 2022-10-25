import * as types from "./localReports_action_types";
import * as ReportUTL from "../../../utils/reports/local_reports/LocalReportsUTLs";


//   ----------------- palletWOinvoice ---------------------------

const getPalletsWOinvoiceData = (data) => ({
  type: types.GET_PALLETSWOINVOICE_DATA,
  payload: data,
});


export const loadPalletsWOinvoiceData = (data) => {
  return async function (dispatch) {
    const result = await (ReportUTL.PalletsWOinvoicesReport(data['fromDateFilter'], data['toDateFilter'], data['traderID']))
    dispatch(getPalletsWOinvoiceData(result))
    return result
  }
}

