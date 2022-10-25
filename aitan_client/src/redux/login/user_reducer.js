import * as types from "./user_action_Types";
const initialState = {
  Token: '',
  SignedUser: []
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_SIGNED_USER:
      return {
        ...state,
        SignedUser: action.payload
      }

    case types.SAVE_TOKEN:
      return {
        ...state,
        Token: action.payload
      }


    default:
      return state;
  }
};

export default usersReducers;
