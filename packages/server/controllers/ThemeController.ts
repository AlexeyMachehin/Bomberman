/* eslint-disable @typescript-eslint/no-explicit-any */
import themeService from '../services/ThemeService';

class ThemeController {
  async getUserTheme(req: any, res: any, next: any) {
    try {
      const payload = req.body;
      const result = await themeService.getUserTheme({ ...payload });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async setUserTheme(req: any, res: any, next: any) {
    try {
      const payload = req.body;
      const result = await themeService.setUserTheme({ ...payload });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ThemeController();
