import axios from 'axios';


export async function GetFruitSize_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/fruitSize`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_fruitSize(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/fruitSize/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_fruitSize(fruitSizeData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/fruitSize/${id}`, fruitSizeData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_fruitSize(fruitSizeData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/fruitSize`, fruitSizeData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


