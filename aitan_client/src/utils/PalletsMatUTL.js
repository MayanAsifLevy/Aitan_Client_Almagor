import axios from 'axios';


export async function GetPalletsMat_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_PALLETSMAT_API}`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_palletMat(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_PALLETSMAT_API}/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_palletMat(palletDataMat, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_PALLETSMAT_API}/${id}`, palletDataMat);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_palletMat(palletDataMat) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_PALLETSMAT_API}`, palletDataMat);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


