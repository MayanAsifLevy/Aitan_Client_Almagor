import axios from 'axios';


export async function Post_Credentials(credentials) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/login`, credentials);


    return result.data
  } catch (error) {
    console.error(error);
  }
}

export async function Enter_Login(_token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/login`, { headers: { "x-access-token": _token } });
    return result.data
  } catch (error) {
    console.error(error);
  }
}


