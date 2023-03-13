import { IQuestion } from './IQuestion';
export interface IForumState {
  [key: string]: IQuestion[];
  discussionOfGameMoments: IQuestion[];
  technicalIssues: IQuestion[];
  errorQuestions: IQuestion[];
}
