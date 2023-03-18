import { useEffect } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { StartPageButton } from '@/features/startPageButton/StartPageButton';
import { RESOURCE_URL } from '@/const';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { selectorLeaders } from '@/store/user/selectors';
import { getPlayers } from '@/store/user/thunk';
import styles from './LeaderBoardPage.module.css';

const Colors = ['gold', 'silver', 'goldenrod', 'tan'];

const getIcon = (index: number) => {
  const bestLidersCount = 3;
  return index < bestLidersCount ? (
    <EmojiEventsIcon fontSize="large" />
  ) : (
    <StarBorderIcon fontSize="medium" />
  );
};

const getColor = (index: number) => {
  return Colors[index] ?? Colors[-1];
};

const LeaderBoardPage = () => {
  const dispatch = useAppDispatch();
  const leaders = useAppSelector(selectorLeaders);

  useEffect(() => {
    dispatch(getPlayers());
  }, []);

  return (
    <div data-testid="leaderBoardPage-component" className={styles.liderBoard}>
      <Container maxWidth="lg">
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>LeaderboardPage</h1>
          <StartPageButton />
        </div>

        <List>
          {leaders.map((lider, index) => (
            <ListItem key={lider.id} className={styles.listItem}>
              <ListItemAvatar>
                <Avatar src={`${RESOURCE_URL}${lider.avatarURL}`} alt={lider.name}>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>{lider.name}</ListItemText>
              <ListItemText sx={{ marginLeft: 'auto', flexGrow: '0' }}>
                <Typography
                  display="flex"
                  alignItems="center"
                  color={getColor(index)}>
                  {lider.score}
                  {getIcon(index)}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default LeaderBoardPage;
