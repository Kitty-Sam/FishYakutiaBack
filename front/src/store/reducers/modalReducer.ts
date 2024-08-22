import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalsState, ModalsType } from '@/interfaces';

export const initialState: ModalsState = {
  modal: null,
};

export const modalReducer = createSlice({
  name: 'modalReducer',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalsType>) => {
      state.modal = action.payload;
    },
    closeModal: (state) => {
      state.modal = null;
    },
  },
});

export const { showModal, closeModal } = modalReducer.actions;
