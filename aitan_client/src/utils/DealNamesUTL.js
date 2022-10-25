import axios from 'axios';


export async function GetDealNames_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_DEALSNAMES_API}`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_dealName(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_DEALSNAMES_API}/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_dealName(dealNameData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_DEALSNAMES_API}/${id}`, dealNameData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_dealName(dealNameData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_DEALSNAMES_API}`, dealNameData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


