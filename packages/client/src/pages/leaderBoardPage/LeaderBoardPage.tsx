import styles from './LeaderBoardPage.module.css';

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
import { useEffect, useState } from 'react';
import { leaderBoardService } from '../../service/LeaderBoardService';
import { IPlayer } from '../../service/types/liderBoard/IPlayer';

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

const LiderBoardPage = () => {
  const [leaders, setLeaders] = useState<IPlayer[]>([]);
  useEffect(() => {
    leaderBoardService.getPlayers().then(({ data }) => {
      const leaders = data.map(player => player.data);
      setLeaders(leaders);
    });
  }, []);

  return (
    <div data-testid="leaderBoardPage-component" className={styles.liderBoard}>
      <Container maxWidth="lg">
        <h1 className={styles.title}>LiderboardPage</h1>
        <List>
          {leaders.map((lider, index) => (
            <ListItem key={lider.id} className={styles.listItem}>
              <ListItemAvatar>
                <Avatar src={lider.avatarURL} alt={lider.name}>
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

export default LiderBoardPage;
