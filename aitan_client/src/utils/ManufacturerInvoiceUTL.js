import axios from 'axios';


export async function GetManufacturerInvoice_list(season, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/manufacturer_invoice`, { params: { 'season2filter': season }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_manufacturerInvoice(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/manufacturer_invoice/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_manufacturerInvoice(manufacturerInvoiceData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/manufacturer_invoice/${id}`, manufacturerInvoiceData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_manufacturerInvoice(manufacturerInvoiceData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/manufacturer_invoice`, manufacturerInvoiceData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}
