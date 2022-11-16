import axios from 'axios';

// ======================================================
//       receipt_Header
// ======================================================

export async function GetReceiptHeader_list(season, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/receipt_header`, { params: { 'season2filter': season }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_receiptHeader(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/receipt_header/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function update_receiptHeader(receiptHeaderData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/receipt_header/${id}`, receiptHeaderData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function add_receiptHeader(receiptHeaderData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/receipt_header`, receiptHeaderData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}

// ======================================================
//        receipt_lines
// ======================================================

export async function GetReceiptLines_list(receiptHeaderID) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/receipt_lines`, { params: { 'receiptHeaderID2filter': receiptHeaderID } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_receiptLines(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/receipt_lines/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}



export async function delete_AllReceiptLines(receiptHeaderID) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/receipt_lines`, { params: { 'receiptHeaderID2filter': receiptHeaderID } });
    return result.data
  } catch (error) {
    console.error(error);
  }
}

export async function update_receiptLines(receiptLinesData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/receipt_lines/${id}`, receiptLinesData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function add_receiptLines(receiptLinesData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/receipt_lines`, receiptLinesData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}