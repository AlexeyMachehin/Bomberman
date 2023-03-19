import Axios from 'axios';
import { AxiosService, IBasePayload } from './AxiosService';
import { IUserRequestProfileDto } from './types/User/request/IUserRequestProfileDto';
import { IUserRequestPasswordDto } from './types/User/request/IUserRequestPasswordDto';
import { ApiEndpoint } from './types/api/enums/ApiEndpoint';

const apiAxiosInstance = Axios.create({
  baseURL: 'http://localhost:3001/bomberapi',
});

class UserService extends AxiosService {
  public constructor() {
    super();
  }

  public async addUserToDB(payload: { userId: number; userName: string }) {
    const response = await apiAxiosInstance.post('/user', payload);
    return response.data;
  }

  public updateProfile(dto: IUserRequestProfileDto): Promise<IBasePayload> {
    return this.put(ApiEndpoint.PROFILE, dto);
  }

  public updatePassword(dto: IUserRequestPasswordDto): Promise<IBasePayload> {
    return this.put(ApiEndpoint.PASSWORD, dto);
  }

  public updateAvatar(file: File): Promise<IBasePayload> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.put(ApiEndpoint.AVATAR, formData);
  }
}

export const userService = new UserService();
