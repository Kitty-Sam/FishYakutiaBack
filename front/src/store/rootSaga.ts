import { all } from 'redux-saga/effects';
import { watchAuth } from '@store/sagas/loginSaga';
import { watchGetCategories } from '@store/sagas/categoriesSaga';
import { watchGetProducts } from '@store/sagas/productsSaga';
import { watchGetSettings } from '@store/sagas/settingsSaga';

export default function* rootSaga() {
  yield all([watchAuth(), watchGetCategories(), watchGetProducts(), watchGetSettings()]);
}
