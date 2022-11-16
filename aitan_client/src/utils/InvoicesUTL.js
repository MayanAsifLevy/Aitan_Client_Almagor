import axios from 'axios';

// ======================================================
//       invoice_Header
// ======================================================

export async function GetInvoiceHeader_list(season, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/invoice_header`, { params: { 'season2filter': season }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_invoiceHeader(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/invoice_header/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function update_invoiceHeader(invoiceHeaderData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/invoice_header/${id}`, invoiceHeaderData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function add_invoiceHeader(invoiceHeaderData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/invoice_header`, invoiceHeaderData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}

export async function update_InvoiceStatus(receiptHeaderData) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/invoice_header`, { params: { 'receiptHeaderData2filter': receiptHeaderData } });
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}

// ======================================================
//        invoice_lines
// ======================================================

export async function GetInvoiceLines_list(invoiceHeaderID) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/invoice_lines`, { params: { 'invoiceHeaderID2filter': invoiceHeaderID } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_invoiceLines(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/invoice_lines/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}



export async function delete_AllInvoiceLines(invoiceHeaderID) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/invoice_lines`, { params: { 'invoiceHeaderID2filter': invoiceHeaderID } });
    return result.data
  } catch (error) {
    console.error(error);
  }
}

export async function update_invoiceLines(invoiceLinesData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/invoice_lines/${id}`, invoiceLinesData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function add_invoiceLines(invoiceLinesData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/invoice_lines`, invoiceLinesData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


