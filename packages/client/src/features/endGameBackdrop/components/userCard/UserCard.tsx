import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IPlayer } from '@/service/types/liderBoard/IPlayer';
import classes from './userCard.module.css';
import { RESOURCE_URL } from '@/const';

interface Props {
  user: IPlayer;
}

export default function UserCard({ user }: Props) {
  return (
    <Card className={classes.userCard}>
      <CardMedia
        className={classes.userCardAvatar}
        image={`${RESOURCE_URL}${user.avatarURL}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Score: {user.score}
        </Typography>
      </CardContent>
    </Card>
  );
}
