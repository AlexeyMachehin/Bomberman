import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { IQuestion } from '../../../../../../service/types/forumPage/IQuestion';
import classes from './asidePanelItem.module.css';

interface IAsidePanelItemProps {
  isWideAsidePanel: boolean;
  question: IQuestion;
  color: string;
}

export default function AsidePanelItem({
  isWideAsidePanel,
  question,
  color,
}: IAsidePanelItemProps) {
  const navigate = useNavigate();
  return (
    <>
      <ListItem
        style={{ backgroundColor: color }}
        onClick={() => {
          navigate(`${question.id}`);
        }}
        button>
        <ListItemAvatar>
          <Avatar alt={question.name} src={question.avatarURL} />
        </ListItemAvatar>

        <div className={classes.AsidePanelItemContent}>
          <ListItemText
            sx={
              isWideAsidePanel
                ? {}
                : {
                    overflow: 'visible',
                    wordBreak: 'break-word',
                    maxHeight: '100%',
                  }
            }
            className={classes.title}
            primary={question.title}
          />

          <div className={classes.AsidePanelItemFooter}>
            <ListItemText className={classes.name} secondary={question.name} />
            <ListItemText
              className={classes.time}
              secondary={new Date(question.time).toDateString()}
            />
          </div>
        </div>
      </ListItem>

      <Divider />
    </>
  );
}
