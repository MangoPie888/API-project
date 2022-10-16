import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};


//thunk
//login an user
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};


//restore an user
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};


//signup an user
                  //get user information from client
export const signup =(user) => async (dispatch) =>{
  const {firstName, lastName, username, email, password} = user; // destructuring info from user
  const response = await csrfFetch('/api/users', {   //send user info from client to back server and get the answer back
    method:"POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password
    })
  })

  const data = await response.json(); //wait data to send back to client
  dispatch(setUser(data)) //dispatch  setUser action to reducer
  return response;


}


//logout an user
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};


//if doesn't have client(frontend yet, below is the code can be tested in windows to see if signup is succused)
// window.store.dispatch(window.sessionActions.signup({
//   firstName:'vivi',
//   lastName: 'Dan',
//   username: 'NewUser',
//   email: 'new@user.io',
//   password: 'password'
// }));


//reducers
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;