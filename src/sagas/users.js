import {
  takeEvery,
  takeLatest,
  take,
  call,
  fork,
  put
} from "redux-saga/effects";
import {
  GET_USERS_REQUEST,
  CREATE_USER_REQUEST,
  DELETE_USER_REQUEST
} from "../actions/types";
import { getUsersSuccess, usersError } from "../actions/users";
import * as api from "../api/users";

// This is a Worker Sagas
function* getUsers() {
  try {
    // call will wait until response back
    // When a promise is run and yielded,
    // middleware suspends saga until promise is resolved.
    const result = yield call(api.getUsers);
    // Once promise is resolved middleware resumes saga,
    // until the next yield statement is found,
    // put: Dispatches an action to the Redux store
    yield put(
      getUsersSuccess({
        items: result.data.data
      })
    );
  } catch (e) {
    yield put(
      usersError({
        error: "An error occurred when trying to get the users"
      })
    );
  }
}

function* watchGetUsersRequest() {
  console.log("watchGetUsersRequest");
  // saga stop at yield takeEvery(), wait until GET_USERS_REQUEST is dispatched
  // then it runs getUsers generator infinitely, and the saga can resume
  yield takeEvery(GET_USERS_REQUEST, getUsers);
}

// This is a worker sagas
function* createUser(action) {
  try {
    const { firstName, lastName } = action.payload;
    yield call(api.createUser, { firstName, lastName });
    yield call(getUsers);
  } catch (e) {
    yield put(
      usersError({
        error: "An error occurred when trying to create the user"
      })
    );
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(CREATE_USER_REQUEST, createUser);
}

function* deleteUser({ userId }) {
  try {
    yield call(api.deleteUser, { userId });
    yield call(getUsers);
  } catch (e) {
    yield put(
      usersError({
        error: "An error occurred when trying to delete the user"
      })
    );
  }
}

function* watchDeleteUserRequest() {
  while (true) {
    console.log("while true...!");
    // take() return the action that was dispatched
    const action = yield take(DELETE_USER_REQUEST);
    yield call(deleteUser, {
      userId: action.payload.userId
    });
  }
}

const userSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest)
];

export default userSagas;
