import axios from 'axios';

// ======================================================
//        createPallet_Header
// ======================================================

export async function GetCreatePalletHeader_list(season, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_CREATEPALLETHEADER_API}`, { params: { 'season2filter': season }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};

export async function Get_distinctPalletsWithLines(season) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_CREATEPALLETHEADER_API}/${season}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
};



export async function delete_createPalletHeader(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_CREATEPALLETHEADER_API}/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_createPalletHeader(createPalletHeaderData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_CREATEPALLETHEADER_API}/${id}`, createPalletHeaderData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_createPalletHeader(createPalletHeaderData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_CREATEPALLETHEADER_API}`, createPalletHeaderData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}

// ======================================================
//        createPallet_lines
// ======================================================

export async function GetCreatePalletLines_list(palletID) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_CREATEPALLETLINES_API}`, { params: { 'palletID2filter': palletID } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_createPalletLines(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_CREATEPALLETLINES_API}/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}



export async function delete_AllcreatePalletLines(palletID) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_CREATEPALLETLINES_API}`, { params: { 'palletID2filter': palletID } });
    return result.data
  } catch (error) {
    console.error(error);
  }
}

export async function Update_createPalletLines(createPalletLinesData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_CREATEPALLETLINES_API}/${id}`, createPalletLinesData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_createPalletLines(createPalletLinesData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_CREATEPALLETLINES_API}`, createPalletLinesData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}



