import { IMessage } from './IMessage';

export interface IQuestion {
  userId?: number;
  sectionId?: number;
  title: string;
  name?: string;
  id?: number;
  time: string;
  content: string;
  avatarURL?: string;
  messages?: IMessage[];
}
