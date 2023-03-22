export type QuestionWithTopic = {
  id: number;
  title: string;
  content: string;
  time: string;
  user: {
    name: string;
  };
  section: {
    title: string;
  };
};
