import { Op } from 'sequelize';
import { Message } from '../models/Message';
import { Question } from '../models/Question';
import { Section } from '../models/Section';
import { User } from '../models/User';

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

  async addQuestion(question: any) {
    const newQuestion = await Question.create({
      title: question.title,
      time: question.time,
      userId: question.userId,
      content: question.content,
      sectionId: question.sectionId,
    });

    return newQuestion;
  }

  async addMessage(payload: any) {
    const newMessage = await Message.create({
      userId: payload.userId,
      message: payload.message,
      time: payload.time,
      questionId: payload.questionId,
      answeredId: payload.answeredId,
    });

    return newMessage;
  }

  async findQuestionsByTitle(text: string) {
    if (text === '') return [];
    const result = await Question.findAll({
      attributes: ['id', 'title', 'content', 'time'],
      where: {
        title: {
          [Op.like]: `%${text}%`,
        },
      },
      include: [
        { model: User, attributes: ['name'] },
        { model: Section, attributes: ['title'] },
      ],
      order: ['title'],
    });

    return result;
  }

  async getSection(section: string) {
    const result = await Section.findAll({
      where: {
        title: section,
      },
      include: [{ model: Question, include: [{ model: Message }] }],
    });

    return result;
  }

  async addReaction(payload: { reaction: string; messageId: number }) {
    const result = await Message.update(
      {
        reactions: Message.sequelize?.fn(
          'array_append',
          Message.sequelize?.col('reactions'),
          payload.reaction
        ),
      },
      {
        where: { id: payload.messageId },
      }
    );

    return result;
  }
}

export default new ForumService();
