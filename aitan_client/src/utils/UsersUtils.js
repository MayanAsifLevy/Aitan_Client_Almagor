import axios from 'axios';



export async function Get_All_Users(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_USERS_API}`, { headers: { "x-access-token": _token } });
    return result.data
  } catch (error) {
    console.error(error);
  }
}


