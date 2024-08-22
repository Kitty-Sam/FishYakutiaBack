import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaActions } from '@store/sagas/types';
import {
  getSettingsFailure,
  getSettingsSuccess,
  updateSettingsFailure,
  updateSettingsSuccess
} from '@store/reducers/settingsReducer';
import { getSettings, updateSettings } from '@/api';
import { UpdateSettingsData } from '@/interfaces';

function* getSettingsData() {
  try {
    // @ts-ignore
    const response = yield call(getSettings);
    yield put(getSettingsSuccess(response));
  } catch (error: any) {
    yield put(getSettingsFailure(error.message));
  }
}

function* updateSettingsData(action: PayloadAction<UpdateSettingsData>) {
  try {
    // @ts-ignore
    const response = yield call(updateSettings, action.payload);
    yield put(updateSettingsSuccess(response));
  } catch (error: any) {
    yield put(updateSettingsFailure(error.message));
  }
}

export function* watchGetSettings() {
  yield takeLatest(SagaActions.GET_SETTINGS, getSettingsData);
  yield takeLatest(SagaActions.UPDATE_SETTINGS, updateSettingsData);
}
