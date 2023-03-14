import { UserDto } from './userDto';

export interface IUserState {
  user: UserDto | null;
  error: string | null;
  isLoaderOn: boolean;
}

export const userState: IUserState = {
  user: null,
  error: null,
  isLoaderOn: false,
};
