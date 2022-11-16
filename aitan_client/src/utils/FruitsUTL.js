import axios from 'axios';


export async function GetFruits_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/fruits`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_fruit(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/fruits/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_fruit(fruitData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/fruits/${id}`, fruitData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_fruit(fruitData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/fruits`, fruitData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


