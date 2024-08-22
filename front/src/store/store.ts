import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import createSagaMiddleware from 'redux-saga';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootSaga from '@store/rootSaga';
import { authReducer } from '@store/reducers/authReducer';
import { modalReducer } from '@store/reducers/modalReducer';
import { categoriesReducer } from '@store/reducers/categoriesReducer';
import { productsReducer } from '@store/reducers/productsReducer';
import { settingsReducer } from '@store/reducers/settingsReducer';
import { ordersApi } from '@store/api/ordersApi';
import { SagaActions } from '@store/sagas/types';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  modals: modalReducer.reducer,
  categories: categoriesReducer.reducer,
  products: productsReducer.reducer,
  settings: settingsReducer.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        SagaActions.CREATE_PRODUCT
      ]
    }
  }).concat([ordersApi.middleware, sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

setupListeners(store.dispatch);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
