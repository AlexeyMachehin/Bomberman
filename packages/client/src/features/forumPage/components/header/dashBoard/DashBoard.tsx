import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';
import { QuestionWithTopic } from '../../../../../service/types/forumPage/questionWithTopic';
import classes from './dashBoard.module.css';

interface IDashBoard {
  foundedQuestions: QuestionWithTopic[];
}

export default function DashBoard({ foundedQuestions }: IDashBoard) {
  const navigate = useNavigate();
  return (
    <List className={classes.dashBoardWrapper}>
      {foundedQuestions.map((question, index) => (
        <div key={`${index}${question.topic}${question.id}`}>
          <ListItem
            className={classes.dashBoardItem}
            button
            onClick={() => {
              navigate(`/forum/${question.topic}/${question.id}`);
            }}>
            <ListItemText primary={question.title} secondary={question.name} />
            <ListItemText secondary={new Date(question.time).toDateString()} />
          </ListItem>

          <Divider />
        </div>
      ))}
    </List>
  );
}
