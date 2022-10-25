import * as types from "./user_action_Types";
//import * as usersUtils  from "../../utils/UsersUtils"


const savetheToken = (token) => (
  {
    type: types.SAVE_TOKEN,
    payload: token
  })


const getSignedUser = (userData) => (
  {
    type: types.GET_SIGNED_USER,
    payload: userData
  })


// -------------------------------------------

export const saveToken = (token) => {
  return function (dispatch) {
    dispatch(savetheToken(token))
  }
}

export const saveLoginUser = (userData) => {
  return function (dispatch) {
    dispatch(getSignedUser(userData))
  }

}


