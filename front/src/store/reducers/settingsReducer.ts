import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image, Settings, SettingsState } from '@/interfaces';
import { toast } from 'react-toastify';
import { successOptions } from '@/others/toastTheme';

export const initialState: SettingsState = {
  id: 1,
  delivery: '',
  description: '',
  email: '',
  image: {} as Image,
  error: ''
};

export const settingsReducer = createSlice({
  name: 'settingsReducer',
  initialState,
  reducers: {
    getSettingsSuccess: (state, action: PayloadAction<Settings>) => {
      state.id = action.payload.id;
      state.delivery = action.payload.delivery;
      state.description = action.payload.description;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.error = '';
    },
    getSettingsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateSettingsSuccess: (state, action: PayloadAction<Settings>) => {
      state.id = action.payload.id;
      state.delivery = action.payload.delivery;
      state.description = action.payload.description;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.error = '';
      toast.info('Настройки изменены', successOptions as any);
    },
    updateSettingsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  getSettingsSuccess,
  getSettingsFailure,
  updateSettingsSuccess,
  updateSettingsFailure,
} = settingsReducer.actions;
