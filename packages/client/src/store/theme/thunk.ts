import { themeService } from '@/service/ThemeService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const saveTheme = createAsyncThunk(
  'saveusertheme',
  async (payload: { userId?: number; newTheme: string }) => {
    const response = await themeService.saveUserTheme(payload);
    return response;
  }
);

export const getUserTheme = createAsyncThunk(
  'getusertheme',
  async (userId?: number) => {
    const response = await themeService.getUserTheme(userId);
    return response;
  }
);
