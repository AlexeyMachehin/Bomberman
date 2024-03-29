import { ILoginRequestDto } from './../../service/types/Login/request/ILoginRequestDto';
import { authService } from './../../service/AuthService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISignupRequestDto } from '../../service/types/Signup/request/ISignupRequestDto';
import { oAuthService } from './../../service/OAuthService';
import { userService } from '@/service/UserService';
import { IUserRequestProfileDto } from '../../service/types/User/request/IUserRequestProfileDto';
import { IUserRequestPasswordDto } from '../../service/types/User/request/IUserRequestPasswordDto';
import { leaderBoardService } from '../../service/LeaderBoardService';
import { IPlayer } from '../../service/types/liderBoard/IPlayer';

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

export const addUserToDB = createAsyncThunk(
  'forum/adduser',
  async (userData: { userId: number; userName: string }) => {
    await userService.addUserToDB(userData);
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

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (file: File) => {
    await userService.updateAvatar(file);
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (dto: IUserRequestProfileDto) => {
    await userService.updateProfile(dto);
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (dto: IUserRequestPasswordDto) => {
    await userService.updatePassword(dto);
  }
);

export const addPlayer = createAsyncThunk(
  'leaderboard/addPlayer',
  async (player: IPlayer) => {
    await leaderBoardService.addPlayer(player);
  }
);

export const getPlayers = createAsyncThunk(
  'leaderboard/getPlayers',
  async () => {
    const response = await leaderBoardService.getPlayers();
    const leaders = response.data.map(player => player.data);
    return leaders;
  }
);
