import { ISection } from '@/service/types/forumPage/ISection';
import { ITopic } from '@/service/types/forumPage/ITopic';

export const forumState: {
  topics: ITopic[];
  foundedQuestions: any;
  currentSection: ISection | null;
} = {
  topics: [],
  foundedQuestions: [],
  currentSection: null,
};
