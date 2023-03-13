import { IMessage } from './IMessage';

export interface IQuestion {
  title: string;
  name: string;
  id: number;
  time: string;
  content: string;
  avatarURL: string;
  messages: IMessage[];
}
