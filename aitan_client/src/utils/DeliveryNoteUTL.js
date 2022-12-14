import axios from 'axios';

// ======================================================
//        deliveryNote_Header
// ======================================================

export async function GetDeliveryNoteHeader_list(season, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/deliveryNote_header`, { params: { 'season2filter': season }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_deliveryNoteHeader(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/deliveryNote_header/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_deliveryNoteHeader(deliveryNoteHeaderData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/deliveryNote_header/${id}`, deliveryNoteHeaderData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_deliveryNoteHeader(deliveryNoteHeaderData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/deliveryNote_header`, deliveryNoteHeaderData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}

export async function Get_distinctdeliveryNotestWithLines(season) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/deliveryNote_header/${season}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
};


// ======================================================
//        deliveryNote_lines
// ======================================================

export async function GetDeliveryNoteLines_list(deliveryNoteHeaderID) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/deliveryNote_lines`, { params: { 'deliveryNoteHeaderID2filter': deliveryNoteHeaderID } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_deliveryNoteLines(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/deliveryNote_lines/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}



export async function delete_AllDeliveryNoteLines(deliveryNoteHeaderID) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/deliveryNote_lines`, { params: { 'deliveryNoteHeaderID2filter': deliveryNoteHeaderID } });
    return result.data
  } catch (error) {
    console.error(error);
  }
}

export async function Update_deliveryNoteLines(deliveryNoteLinesData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/deliveryNote_lines/${id}`, deliveryNoteLinesData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_deliveryNoteLines(deliveryNoteLinesData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/deliveryNote_lines`, deliveryNoteLinesData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


