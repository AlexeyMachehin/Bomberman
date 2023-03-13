import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AsidePanel from './asidePanel/AsidePanel';
import ChatPanel from './chatPanel/ChatPanel';
import { IQuestion } from '../../../../service/types/forumPage/IQuestion';
import { forumState } from '../../../mockData/forumState';
import classes from './chat.module.css';

export default function Chat() {
  const { mainTopic, id } = useParams();
  const [foundedQuestions, setFoundedQuestions] = useState<IQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );

  useEffect(() => {
    if (mainTopic) {
      setFoundedQuestions(forumState[mainTopic]);
      if (id) {
        const selectedQuestion =
          foundedQuestions.find(question => question.id === Number(id)) ?? null;
        setSelectedQuestion(selectedQuestion);
      }
    }
  });

  return (
    <div data-testid="chat-component" className={classes.chatWrapper}>
      <AsidePanel
        foundedQuestions={foundedQuestions}
        selectedQuestion={selectedQuestion}
      />
      <ChatPanel selectedQuestion={selectedQuestion} />
    </div>
  );
}
