import { UserDto } from './userDto';

export interface IUserState {
  user: UserDto | null;
  error: string | null;
  isLoaderOn: boolean;
  leaders: any[];
}

export const userState: IUserState = {
  user: null,
  error: null,
  isLoaderOn: false,
  leaders: [],
};
