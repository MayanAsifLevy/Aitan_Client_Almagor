import axios from 'axios';


export async function GetPalletsMatCost_list(palletMatID, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/palletsMatCost`, { params: { 'palletsMatID2filter': palletMatID }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_palletMatCost(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/palletsMatCost/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_palletMatCost(palletDataMatCost, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/palletsMatCost/${id}`, palletDataMatCost);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_palletMatCost(palletDataMatCost) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/palletsMatCost`, palletDataMatCost);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


