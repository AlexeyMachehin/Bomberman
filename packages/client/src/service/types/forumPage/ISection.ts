import { IQuestion } from './IQuestion';

export interface ISection {
  id: number;
  title: string;
  questions: IQuestion[];
}
