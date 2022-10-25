import axios from 'axios';


export async function GetReceivingFruits_list(season, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_RECEIVINGFRUITS_API}`, { params: { 'season2filter': season }, headers: { "x-access-token": _token } })
    console.log('result.data', result.data)
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_receivingFruit(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_RECEIVINGFRUITS_API}/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_receivingFruit(receivingFruitData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_RECEIVINGFRUITS_API}/${id}`, receivingFruitData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_receivingFruit(receivingFruitData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_RECEIVINGFRUITS_API}`, receivingFruitData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


