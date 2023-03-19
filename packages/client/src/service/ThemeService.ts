import Axios, { AxiosInstance } from 'axios';

const apiAxiosInstance = Axios.create({
  // withCredentials: true,
  baseURL: 'http://localhost:3001/bomberapi',
});

class ThemeService {
  private readonly axios: AxiosInstance = apiAxiosInstance;

  public async saveUserTheme(payload: { userId?: number; newTheme: string }) {
    const response = await this.axios.post('/theme', payload);
    return response.data;
  }

  public async getUserTheme(userId?: number) {
    const response = await this.axios.get('/theme', { params: { userId } });
    return response.data;
  }
}

export const themeService = new ThemeService();
