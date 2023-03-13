import { ILoginRequestDto } from './../../service/types/Login/request/ILoginRequestDto';
import { authService } from './../../service/AuthService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISignupRequestDto } from '../../service/types/Signup/request/ISignupRequestDto';
import { oAuthService } from './../../service/OAuthService';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await authService.getUser();
  return response;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: ISignupRequestDto) => {
    await authService.signup(userData);
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (dto: ILoginRequestDto) => {
    await authService.login(dto);
  }
);

export const getServiceId = createAsyncThunk(
  'user/getServiceId',
  async (): Promise<any> => {
    return await oAuthService.getServiceId();
  }
);

export const signInYandex = createAsyncThunk(
  'user/signInYandex',
  async ({
    code,
    redirect_uri,
  }: {
    code: string;
    redirect_uri: string;
  }): Promise<any> => {
    return await oAuthService.signInYandex(code, redirect_uri);
  }
);
