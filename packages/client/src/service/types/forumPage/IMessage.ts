export interface IMessage {
  userId?: number;
  questionId?: number;
  name?: string;
  id?: number;
  isMyMessage: boolean;
  time: string;
  message: string;
  avatarURL: string;
  reactions?: string[];
  answeredId?: number;
}
