import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AsidePanel from './asidePanel/AsidePanel';
import ChatPanel from './chatPanel/ChatPanel';
import { IQuestion } from '../../../../service/types/forumPage/IQuestion';
import classes from './chat.module.css';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { loadSection } from '@/store/forum/thunk';

export default function Chat() {
  const { mainTopic, id } = useParams();
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );

  const currentSection = useAppSelector(
    state => state.forumReducer.currentSection
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mainTopic) {
      dispatch(loadSection(mainTopic));
    }
  }, []);

  useEffect(() => {
    if (id) {
      const selectedQuestion =
        currentSection?.questions.find(
          (question: IQuestion) => question.id === Number(id)
        ) ?? null;
      setSelectedQuestion(selectedQuestion);
    }
  }, [currentSection, id]);

  return (
    <div data-testid="chat-component" className={classes.chatWrapper}>
      <AsidePanel
        foundedQuestions={currentSection?.questions}
        selectedQuestion={selectedQuestion}
      />
      <ChatPanel selectedQuestion={selectedQuestion} />
    </div>
  );
}
