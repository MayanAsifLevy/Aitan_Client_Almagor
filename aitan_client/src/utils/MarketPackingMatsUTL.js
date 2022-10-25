import axios from 'axios';


export async function GetMarketPackingMat_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_MARKETPACKINGMAT_API}`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_marketPackingMat(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_MARKETPACKINGMAT_API}/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_marketPackingMat(marketPackingMatData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_MARKETPACKINGMAT_API}/${id}`, marketPackingMatData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function add_marketPackingMat(marketPackingMatData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_MARKETPACKINGMAT_API}`, marketPackingMatData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


