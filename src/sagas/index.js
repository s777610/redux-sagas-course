import userSagas from "./users";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  // all like Promise.all(), except we're doing it with the forked processes.
  yield all([...userSagas]);
}
