import { AxiosResponse } from 'axios';
import { AxiosService } from './AxiosService';

class ThemeService extends AxiosService {
  public constructor() {
    super();
  }

  public async saveUserTheme(payload: { userId?: number; newTheme: string }) {
    const response = await this.post<
      { userId?: number; newTheme: string },
      AxiosResponse
    >('/theme', payload);
    return response.data;
  }

  public async getUserTheme(userId?: number) {
    const response = await this.get<AxiosResponse>('/theme', {
      params: { userId },
    });
    return response.data;
  }
}

export const themeService = new ThemeService();
