import axios from 'axios';


export async function getPackingHouse_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/packingHouse`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_packingHouse(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/packingHouse/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function update_packingHouse(packingHouseData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/packingHouse/${id}`, packingHouseData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function add_packingHouse(packingHouseData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/packingHouse`, packingHouseData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


