/* eslint-disable @typescript-eslint/no-explicit-any */
import forumService from '../services/ForumService';

class ForumController {
  async getSections(_req: any, res: any, next: any) {
    try {
      const result = await forumService.getSections();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllState(_req: any, res: any, next: any) {
    try {
      const result = await forumService.getAllState();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async findQuestionsByTitle(req: any, res: any, next: any) {
    try {
      const { text } = req.body;
      const result = await forumService.findQuestionsByTitle(text);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async addQuestion(req: any, res: any, next: any) {
    try {
      const payload = req.body;

      const result = await forumService.addQuestion({ ...payload });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async addMessage(req: any, res: any, next: any) {
    try {
      const payload = req.body;
      const result = await forumService.addMessage({ ...payload });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ForumController();
