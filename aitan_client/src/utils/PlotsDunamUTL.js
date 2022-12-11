import axios from 'axios';


export async function GetPlots_list(season, _token) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_APP}/plots`, { params: { 'season2filter': season }, headers: { "x-access-token": _token } })
    return result.data
  } catch (error) {
    console.error(error);
  }
};


export async function delete_plot(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_BASE_APP}/plots/${id}`);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_plot(plotData, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_APP}/plots/${id}`, plotData);
    return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_plot(plotData) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/plots`, plotData);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }
}

export async function copy_plotsfromPrevYear(filteredPrevSeason){
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_APP}/plots/${filteredPrevSeason}`);
    console.log('result', result)
    return result.data
  } catch (error) {
    console.error(error);
  }

}
