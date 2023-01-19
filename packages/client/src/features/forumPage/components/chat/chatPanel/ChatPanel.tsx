import { useRef, useState, useEffect } from 'react';
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

export default function ChatPanel(props: IChatPanelProps) {
  const [inputFooterValue, setInputFooterValue] = useState<string>('');
  const [answerMessage, setAnswerMessage] = useState<null | JSX.Element>(null);
  const [answerMessageComponent, setAnswerMessageComponent] =
    useState<null | JSX.Element>(null);

  const inputFooter = useRef<null | JSX.Element>(null);
  const messagesPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesPanel.current) {
      messagesPanel.current.scrollTo(0, messagesPanel.current.scrollHeight);
    }
  }, [props.selectedQuestion]);

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

  const closeAnswerMessageBox = (): void => {
    setAnswerMessage(null);
  };

  return (
    <>
      <div className={classes.chatPanel}>
        <div className={classes.chatPanelHeader}>
          {props.selectedQuestion ? (
            <div className={classes.selectionQuestionTitle}>
              {props.selectedQuestion.title}
            </div>
          ) : (
            <Typography className={classes.mainTitle}>
              <WestIcon className={classes.mainTitleIcon} /> Choose or ask a
              question
            </Typography>
          )}
        </div>

        <div ref={messagesPanel} className={classes.chatPanelMain}>
          {props.selectedQuestion &&
            props.selectedQuestion.messages.map((message: IMessage) => (
              <Message
                setAnswerMessage={setAnswerMessage}
                createAnswerTemplate={createAnswerTemplate}
                key={message.id}
                message={message}
              />
            ))}

          {/* test answer */}
          {answerMessageComponent}
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
              inputRef={inputFooter}
              value={inputFooterValue}
              onChange={event => {
                setInputFooterValue(event.target.value);
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
                setInputFooterValue('');
                setAnswerMessageComponent(
                  <Message
                    message={{
                      name: myProfile.name,
                      id: myProfile.id,
                      isMyMessage: true,
                      time: new Date().toDateString(),
                      message: inputFooterValue,
                      avatarURL: myProfile.avatarURL,
                    }}
                    setAnswerMessage={setAnswerMessage}
                    answerMessage={answerMessage}
                    createAnswerTemplate={createAnswerTemplate}
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
