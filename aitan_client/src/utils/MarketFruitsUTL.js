import axios from 'axios';


export async function GetMarketFruit_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_MARKETFRUITS_API}`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_marketFruit(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_MARKETFRUITS_API}/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_marketFruit(marketFruitFruitData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_MARKETFRUITS_API}/${id}`, marketFruitFruitData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_marketFruit(marketFruitFruitData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_MARKETFRUITS_API}`, marketFruitFruitData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


