import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';
import { QuestionWithTopic } from '../../../../../service/types/forumPage/questionWithTopic';
import classes from './dashBoard.module.css';
import { useAppDispatch } from '@/utils/hooks';
import { clearFoundedQuestions } from '@/store/forum/forumSlice';

interface IDashBoard {
  foundedQuestions: QuestionWithTopic[];
}

export default function DashBoard({ foundedQuestions }: IDashBoard) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <List className={classes.dashBoardWrapper}>
      {foundedQuestions.map((question, index) => {
        const handleListItemClick = () => {
          dispatch(clearFoundedQuestions());
          navigate(`/forum/${question.section.title}/${question.id}`);
        };
        return (
          <div key={`${index}${question.section.title}${question.id}`}>
            <ListItem
              className={classes.dashBoardItem}
              button
              onClick={handleListItemClick}>
              <ListItemText
                primary={question.title}
                secondary={question.user.name}
              />
              <ListItemText
                secondary={new Date(question.time).toDateString()}
              />
            </ListItem>

            <Divider />
          </div>
        );
      })}
    </List>
  );
}
