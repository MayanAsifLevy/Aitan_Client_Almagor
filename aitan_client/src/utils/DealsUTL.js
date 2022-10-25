import axios from 'axios';


export async function GetDeals_list(season, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_DEALS_API}`, { params: { 'season2filter': season }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_deal(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_DEALS_API}/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_deal(dealData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_DEALS_API}/${id}`, dealData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_deal(dealData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_DEALS_API}`, dealData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


