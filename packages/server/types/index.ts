export interface IQuestion {
  title: string;
  time: string;
  userId: number;
  content: string;
  sectionId: number;
}

export interface IMessage {
  userId: number;
  message: string;
  time: string;
  questionId: number;
  answeredId: number;
}

export interface IReaction {
  reaction: string;
  messageId: number;
}

export interface IUser {
  userId?: number;
  userName?: string;
}

export interface IUserTheme {
  userId?: number;
  newTheme: string;
}
