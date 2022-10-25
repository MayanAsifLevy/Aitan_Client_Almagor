import axios from 'axios';


export async function GetPackingMaterials_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_PACKINGMAT_API}`,  { headers: {"x-access-token": _token}})
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_packingMaterial(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_PACKINGMAT_API}/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function update_packingMaterial(packingMatData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_PACKINGMAT_API}/${id}`, packingMatData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function add_packingMaterial(packingMatData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_PACKINGMAT_API}`, packingMatData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}


