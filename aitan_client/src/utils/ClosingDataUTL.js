import axios from 'axios';


export async function GetClosingData_list(season, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}`, { params: { 'season2filter': season }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_closingData(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/closingData/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_closingData(closingDataData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/closingData/${id}`, closingDataData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_closingData(closingDataData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/closingData`, closingDataData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}