import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginUser, logoutUser, me } from '@/api';
import { loginFailure, loginPending, loginSuccess, logOut } from '@store/reducers/authReducer';
import { FormData } from '@/interfaces';
import { SagaActions } from '@store/sagas/types';

function* login(action: PayloadAction<FormData>) {
  try {
    yield put(loginPending());
    if (action.payload) {
      // @ts-ignore
      const response = yield call(loginUser, action.payload);
      yield put(loginSuccess(response));
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* getMe() {
  try {
    yield put(loginPending());
    // @ts-ignore
    const response = yield call(me);
    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* logout() {
  try {
    // @ts-ignore
    const response = yield call(logoutUser);
    yield put(logOut(response));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export function* watchAuth() {
  yield takeLatest(SagaActions.LOGIN_USER, login);
  yield takeLatest(SagaActions.ME, getMe);
  yield takeLatest(SagaActions.LOGOUT_USER, logout);
}
