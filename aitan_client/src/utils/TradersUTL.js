import axios from 'axios';


export async function GetTraders_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/traders`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_trader(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/traders/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_trader(traderData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/traders/${id}`, traderData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_trader(traderData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/traders`, traderData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


