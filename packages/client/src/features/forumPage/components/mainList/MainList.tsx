import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorIcon from '@mui/icons-material/Error';
import ExtensionIcon from '@mui/icons-material/Extension';
import { CURRENT_MAIN_THEME } from '../../../../service/types/forumPage/currentMainTheme';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

interface MainListProps {
  setFoundQuestions: React.Dispatch<React.SetStateAction<null>>;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentMainTheme: React.Dispatch<
    React.SetStateAction<
      'discussionOfGameMoments' | 'technicalIssues' | 'errorQuestions' | null
    >
  >;
}

export default function MainList(props: MainListProps) {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem
        onClick={() => {
          props.setFoundQuestions(null);
          props.setCurrentMainTheme('discussionOfGameMoments');
          props.setIsChatOpen(true);
        }}
        button>
        <ListItemAvatar>
          <Avatar>
            <ExtensionIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={CURRENT_MAIN_THEME.discussionOfGameMoments} />
      </ListItem>
      <Divider />
      <ListItem
        onClick={() => {
          props.setFoundQuestions(null);
          props.setCurrentMainTheme('technicalIssues');
          props.setIsChatOpen(true);
        }}
        button
        divider>
        <ListItemAvatar>
          <Avatar>
            <SettingsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={CURRENT_MAIN_THEME.technicalIssues} />
      </ListItem>
      <ListItem
        onClick={() => {
          props.setFoundQuestions(null);
          props.setCurrentMainTheme('errorQuestions');
          props.setIsChatOpen(true);
        }}
        button>
        <ListItemAvatar>
          <Avatar>
            <ErrorIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={CURRENT_MAIN_THEME.errorQuestions} />
      </ListItem>
      <Divider light />
    </List>
  );
}
