import axios from 'axios';


export async function DeliveryNoteReport(reportType, deliveryNoteNum, season) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/local_reports/deliveryNote`, { params: { 'reportType2Filter': reportType, 'deliveryNum2Filetr': deliveryNoteNum, 'season2Filter': season } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function InvoicesReport(invoiceHeaderID) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/local_reports/invoice`, { params: { 'invoiceHeaderID2Filter': invoiceHeaderID } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};



export async function PalletsWOinvoicesReport(fromDate, toDate, traderID) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/local_reports/palletsWOinvoices`, { params: { 'fromData2Filter': fromDate, 'toData2Filter': toDate, 'traderID2Filter': traderID } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};

