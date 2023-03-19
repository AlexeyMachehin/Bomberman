/* eslint-disable @typescript-eslint/no-explicit-any */
import userService from '../services/UserService';

class UserController {
  async createUser(req: any, res: any, next: any) {
    try {
      const payload = req.body;
      const result = await userService.createUser({ ...payload });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
