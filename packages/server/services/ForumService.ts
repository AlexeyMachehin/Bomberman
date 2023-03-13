import { Op } from 'sequelize';
import { Message } from '../models/Message';
import { Question } from '../models/Question';
import { Section } from '../models/Section';

class ForumService {
  async getSections() {
    const sections = await Section.findAll();
    return sections;
  }

  async getAllState() {
    const sections = await Section.findAll({
      include: { all: true, nested: true },
    });
    return sections;
  }

  async addQuestion(payload: any) {
    const newQuestion = await Question.create({
      title: payload.title,
      time: payload.time,
      userId: payload.userId,
      content: payload.content,
      sectionId: payload.sectionId,
    });
    return newQuestion;
  }

  async addMessage(payload: any) {
    const newMessage = await Message.create({
      userId: payload.userId,
      message: payload.message,
      time: payload.time,
      questionId: payload.questionId,
    });
    return newMessage;
  }

  async findQuestionsByTitle(text: string) {
    const result = Question.findAll({
      where: {
        title: {
          [Op.like]: `%${text}%`,
        },
      },
    });
    return result;
  }
}

export default new ForumService();
