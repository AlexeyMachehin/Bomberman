import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IBasePayload } from './AxiosService';
import { IQuestion } from './types/forumPage/IQuestion';

const apiAxiosInstance = Axios.create({
  // withCredentials: true,
  baseURL: 'http://localhost:3001/bomberapi',
});

class ForumService {
  private readonly axios: AxiosInstance = apiAxiosInstance;

  public async findQuestions(text: string) {
    const response = await this.axios.post('/findquestions', { text });
    return response.data;
  }

  public async loadSection(section: string) {
    const response = await this.axios.post('/getsection', { section });
    return response.data;
  }

  public async sendQuestion(question: IQuestion) {
    const response = await this.axios.post('/questions', { question });
    return response.data;
  }

  public async getTopics() {
    const response = await this.axios.get('/topics');
    return response.data;
  }

  public async addMessageReaction(payload: any) {
    const response = await this.axios.post('/reactions', payload);
    return response.data;
  }

  public async sendMessage(payload: any) {
    const response = await this.axios.post('/messages', payload);
    return response.data;
  }
}

export const forumService = new ForumService();
