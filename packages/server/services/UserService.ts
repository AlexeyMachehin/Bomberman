import { User } from '../models/User';

class UserService {
  async createUser(payload: { userId?: number; userName?: string }) {
    if (!payload.userId || !payload.userName) return;
    const newUser = await User.upsert({
      id: payload.userId,
      name: payload.userName,
    });
    return newUser;
  }
}

export default new UserService();
