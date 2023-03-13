/* eslint-disable @typescript-eslint/no-explicit-any */
import themeService from '../services/ThemeService';

class ThemeController {
  async findTheme(req: any, res: any, next: any) {
    try {
      const payload = req.body;
      const result = await themeService.find({ ...payload });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async createTheme(req: any, res: any, next: any) {
    try {
      const payload = req.body;
      const result = await themeService.create({ ...payload });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ThemeController();
