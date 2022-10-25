import axios from 'axios';


export async function GetFixedInfo_list(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_FIXEDINFO_API}`, { headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};



export async function update_fixedInfo(infoData, name) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_FIXEDINFO_API}/${name}`, infoData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}

