import axios from 'axios';


export async function GetGrowers_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/growers`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_grower(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/growers/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_grower(growerData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/growers/${id}`, growerData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_grower(growerData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/growers`, growerData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


