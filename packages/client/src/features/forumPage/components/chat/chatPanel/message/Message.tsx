import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MessageDashboard from '../messageDashboard/MessageDashboard';
import { IMessage } from '../../../../../../service/types/forumPage/IMessage';
import classes from './message.module.css';

interface IMessageProps {
  createAnswer: (message: IMessage) => void;
  message: IMessage;
  answerMessage?: null | JSX.Element;
}

export default function Message({
  createAnswer,
  message,
  answerMessage,
}: IMessageProps) {
  const myMessageColor = {
    backgroundColor: 'var(--myMessageColor)',
  };

  return (
    <ListItem
      className={classes.message}
      sx={message.isMyMessage ? myMessageColor : {}}>
      <ListItemAvatar>
        <Avatar alt={message.name} src={message.avatarURL} />
      </ListItemAvatar>

      <div className={classes.messageContent}>
        <div className={classes.messageHeader}>
          <div>
            <ListItemText className={classes.name} secondary={message.name} />
          </div>
          <div>
            <ListItemText
              className={classes.date}
              secondary={new Date(message.time).toDateString()}
            />
          </div>
          <MessageDashboard createAnswer={createAnswer} message={message} />
        </div>
        {answerMessage}
        <ListItemText className={classes.message} primary={message.message} />
      </div>
    </ListItem>
  );
}
