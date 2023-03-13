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
import { myProfile } from '../../../../mockData/myProfile';
import classes from './chatPanel.module.css';

interface IChatPanelProps {
  selectedQuestion: null | IQuestion;
}

export default function ChatPanel({ selectedQuestion }: IChatPanelProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [answerMessage, setAnswerMessage] = useState<null | JSX.Element>(null);
  const [answerMessageComponent, setAnswerMessageComponent] =
    useState<null | JSX.Element>(null);
  const messagesPanelRef = useRef<HTMLDivElement>(null);

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
  };

  const closeAnswerMessageBox = (): void => {
    setAnswerMessage(null);
  };

  const renderMessages = (messages: any) => {
    return messages.map((message: IMessage) => (
      <Message
        createAnswer={createAnswer}
        key={`${message.name}${message.id}`}
        message={message}
      />
    ));
  };

  const messages = useMemo(
    () => renderMessages(selectedQuestion?.messages ?? []),
    [selectedQuestion]
  );

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
          <>
            {messages}

            {/* test answer */}
            {answerMessageComponent}
          </>
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
              onClick={() => {
                closeAnswerMessageBox();
                setInputValue('');
                setAnswerMessageComponent(
                  <Message
                    message={{
                      name: myProfile.name,
                      id: myProfile.id,
                      isMyMessage: true,
                      time: new Date().toDateString(),
                      message: inputValue,
                      avatarURL: myProfile.avatarURL,
                    }}
                    createAnswer={createAnswer}
                    answerMessage={answerMessage}
                  />
                );
              }}
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
