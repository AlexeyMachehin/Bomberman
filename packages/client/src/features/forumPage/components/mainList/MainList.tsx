import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorIcon from '@mui/icons-material/Error';
import ExtensionIcon from '@mui/icons-material/Extension';
import { CURRENT_MAIN_TOPICS } from '../../../../service/types/forumPage/currentMainTopic';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

export default function MainList() {
  const navigate = useNavigate();
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem
        onClick={() => {
          navigate('/forum/discussionOfGameMoments');
        }}
        button>
        <ListItemAvatar>
          <Avatar>
            <ExtensionIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={CURRENT_MAIN_TOPICS.discussionOfGameMoments} />
      </ListItem>
      <Divider />
      <ListItem
        onClick={() => {
          navigate('/forum/technicalIssues');
        }}
        button
        divider>
        <ListItemAvatar>
          <Avatar>
            <SettingsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={CURRENT_MAIN_TOPICS.technicalIssues} />
      </ListItem>
      <ListItem
        onClick={() => {
          navigate('/forum/errorQuestions');
        }}
        button>
        <ListItemAvatar>
          <Avatar>
            <ErrorIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={CURRENT_MAIN_TOPICS.errorQuestions} />
      </ListItem>
      <Divider light />
    </List>
  );
}
