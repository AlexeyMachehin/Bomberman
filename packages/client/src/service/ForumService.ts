import { AxiosResponse } from 'axios';
import { AxiosService, IBasePayload } from './AxiosService';
import { IQuestion } from './types/forumPage/IQuestion';
import { ISection } from './types/forumPage/ISection';
import { ITopic } from './types/forumPage/ITopic';

class ForumService extends AxiosService {
  public constructor() {
    super();
  }

  public async findQuestions(text: string) {
    const response = await this.post('/findquestions', { text });
    return response;
  }

  public async loadSection(section: string) {
    const response = await this.post<
      { section: string },
      AxiosResponse<ISection>
    >('/getsection', { section });
    return response.data;
  }

  public async sendQuestion(question: IQuestion) {
    const response = await this.post('/questions', { question });
    return response;
  }

  public async getTopics() {
    const response = await this.get<ITopic[]>('/topics');
    return response;
  }

  public async addMessageReaction(payload: IBasePayload) {
    const response = await this.post('/reactions', payload);
    return response;
  }

  public async sendMessage(payload: IBasePayload) {
    const response = await this.post('/messages', payload);
    return response;
  }
}

export const forumService = new ForumService();
