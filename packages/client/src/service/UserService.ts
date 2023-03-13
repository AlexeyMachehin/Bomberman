import Axios, { AxiosInstance } from 'axios';

const apiAxiosInstance = Axios.create({
  // withCredentials: true,
  baseURL: 'http://localhost:3001/bomberapi',
});

class UserService {
  private readonly axios: AxiosInstance = apiAxiosInstance;

  public async addUserToDB(payload: { userId: number; userName: string }) {
    const response = await this.axios.post('/user', payload);
    return response.data;
  }
}

export const userService = new UserService();
