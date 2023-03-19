import { useRef, useState, useEffect, useMemo } from 'react';
import WestIcon from '@mui/icons-material/West';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Message from './message/Message';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { IMessage } from '../../../../../service/types/forumPage/IMessage';
import { IQuestion } from '../../../../../service/types/forumPage/IQuestion';
import classes from './chatPanel.module.css';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { loadSection, sendMessage } from '@/store/forum/thunk';
import { useParams } from 'react-router-dom';

interface IChatPanelProps {
  selectedQuestion: null | IQuestion;
}

export default function ChatPanel({ selectedQuestion }: IChatPanelProps) {
  const { mainTopic } = useParams();
  const [inputValue, setInputValue] = useState<string>('');
  const [answerMessage, setAnswerMessage] = useState<null | JSX.Element>(null);
  const [answerMessageId, setAnswerMessageId] = useState<number | null>();
  const messagesPanelRef = useRef<HTMLDivElement>(null);

  const currentUser = useAppSelector(state => state.userReducer.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (messagesPanelRef.current) {
      messagesPanelRef.current.scrollTo(
        0,
        messagesPanelRef.current.scrollHeight
      );
    }
  }, [selectedQuestion]);

  const createAnswerTemplate = (message: IMessage): JSX.Element => {
    return (
      <div
        style={{
          width: '100%',
          wordBreak: 'break-word',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid black',
          paddingLeft: '5px',
          marginBottom: '15px',
        }}>
        <div>{message.name}</div>
        <div>{message.message}</div>
      </div>
    );
  };

  const createAnswer = (newMessage: IMessage) => {
    const templateNewMessage = createAnswerTemplate(newMessage);
    setAnswerMessage(templateNewMessage);
    setAnswerMessageId(newMessage.id);
  };

  const closeAnswerMessageBox = (): void => {
    setAnswerMessage(null);
    setAnswerMessageId(null);
  };

  const renderMessages = (messages: IMessage[]) => {
    return [...messages]
      .sort((a, b) => +new Date(a.time) - +new Date(b.time))
      .map((message: IMessage) => {
        const answerMessage = message.answeredId
          ? messages.find(item => item.id === message.answeredId)
          : null;

        return (
          <Message
            createAnswer={createAnswer}
            key={`${message.name}${message.id}`}
            message={message}
            answerMessage={
              answerMessage ? createAnswerTemplate(answerMessage) : null
            }
          />
        );
      });
  };

  const messages = useMemo(
    () => renderMessages(selectedQuestion?.messages ?? []),
    [selectedQuestion]
  );

  const sendButtonHandler = () => {
    if (inputValue === '') return;
    closeAnswerMessageBox();
    setInputValue('');
    dispatch(
      sendMessage({
        userId: currentUser?.id,
        message: inputValue,
        time: new Date().toString(),
        questionId: selectedQuestion?.id,
        answeredId: answerMessageId,
      })
    ).then(() => {
      if (mainTopic) dispatch(loadSection(mainTopic));
    });
  };

  return (
    <>
      <div className={classes.chatPanel}>
        <div className={classes.chatPanelHeader}>
          {selectedQuestion ? (
            <div className={classes.selectionQuestionTitle}>
              {selectedQuestion.title}
            </div>
          ) : (
            <Typography className={classes.mainTitle}>
              <WestIcon className={classes.mainTitleIcon} />
              Choose or ask a question
            </Typography>
          )}
        </div>

        <div ref={messagesPanelRef} className={classes.chatPanelMain}>
          {messages}
        </div>

        <div className={classes.chatPanelFooterWrapper}>
          {answerMessage && (
            <div className={classes.answerMessageBox}>
              <div className={classes.closeButtonContainer}>
                <IconButton onClick={closeAnswerMessageBox}>
                  <CloseIcon className={classes.answerMessageBoxCloseIcon} />
                </IconButton>
              </div>
              {answerMessage}
            </div>
          )}
          <div className={classes.chatPanelFooter}>
            <TextField
              className={classes.chatPanelInput}
              value={inputValue}
              onChange={event => {
                setInputValue(event.target.value);
              }}
              label="message"
              multiline
              maxRows={20}
            />
            <Button
              className={classes.sendButton}
              component="button"
              onClick={sendButtonHandler}
              variant="outlined"
              endIcon={<SendIcon />}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
