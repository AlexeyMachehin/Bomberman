import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect } from 'react';
import { getTopics } from '@/store/forum/thunk';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

export default function MainList() {
  const navigate = useNavigate();

  const topics = useAppSelector(state => state.forumReducer.topics);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTopics());
  }, []);

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {topics.map(topic => (
        <ListItem
          key={topic.id}
          onClick={() => {
            navigate(`/forum/${topic.title}`);
          }}
          button
          divider>
          <ListItemAvatar>
            <Avatar>
              <ExtensionIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={topic.title} />
        </ListItem>
      ))}
    </List>
  );
}
