import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getCategoriesFailure,
  getCategoriesSuccess,
  createCategorySuccess,
  createCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure
} from '@store/reducers/categoriesReducer';
import { createCategory, deleteCategory, getAllCategories } from '@/api';
import { CreateCategoryData } from '@/interfaces';
import { SagaActions } from '@store/sagas/types';
import { closeModal } from '@store/reducers/modalReducer';

function* getCategories() {
  try {
    // @ts-ignore
    const response = yield call(getAllCategories);
    yield put(getCategoriesSuccess(response));
  } catch (error: any) {
    yield put(getCategoriesFailure(error.message));
  }
}

function* createNewCategory(action: PayloadAction<CreateCategoryData>) {
  try {
    // @ts-ignore
    const response = yield call(createCategory, action.payload);
    yield put(createCategorySuccess(response));
    yield put(closeModal());
  } catch (error: any) {
    yield put(createCategoryFailure(error.message));
  }
}

function* deleteCurrentCategory(action: PayloadAction<number>) {
  try {
    // @ts-ignore
    const response = yield call(deleteCategory, action.payload);
    yield put(deleteCategorySuccess(response.id));
  } catch (error: any) {
    yield put(deleteCategoryFailure(error.message));
  }
}

export function* watchGetCategories() {
  yield takeLatest(SagaActions.GET_CATEGORIES, getCategories);
  yield takeLatest(SagaActions.CREATE_CATEGORY, createNewCategory);
  yield takeLatest(SagaActions.DELETE_CATEGORY, deleteCurrentCategory);
}
