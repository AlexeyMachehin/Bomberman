import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import DashBoard from './dashBoard/DashBoard';
import { IForumState } from '../../../../service/types/forumPage/IForumState';
import { IQuestion } from '../../../../service/types/forumPage/IQuestion';
import { forumState } from '../../../mockData/forumState';
import { QuestionWithTopic } from '../../../../service/types/forumPage/questionWithTopic';
import { Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import classes from './header.module.css';

const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function Header() {
  const [foundedQuestions, setFoundedQuestions] = useState<QuestionWithTopic[]>(
    []
  );

  const navigate = useNavigate();

  const getFilteredQuestions = (
    inputValue: string,
    mainTopics: IForumState
  ): QuestionWithTopic[] => {
    const regExp = new RegExp(inputValue.toLowerCase());

    return Object.entries(mainTopics).reduce<QuestionWithTopic[]>(
      (foundQuestions, [mainTopic, questions]) => {
        return foundQuestions.concat(
          questions
            .filter((question: IQuestion) =>
              regExp.test(question.title.toLowerCase())
            )
            .map(question => ({ ...question, topic: mainTopic }))
        );
      },
      []
    );
  };

  const handleOnChangeInput = (event: FormEvent<HTMLInputElement>) => {
    const searchInputValue = (event.target as HTMLInputElement).value;
    const foundedQuestions =
      searchInputValue !== ''
        ? getFilteredQuestions(searchInputValue, forumState)
        : [];
    setFoundedQuestions(foundedQuestions);
  };

  return (
    <div className={classes.header}>
      <Search
        className={classes.searchInputWrapper}
        onChange={handleOnChangeInput}>
        <SearchIconWrapper className={classes.searchInputIconWrapper}>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Find a question"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      {foundedQuestions.length && (
        <DashBoard foundedQuestions={foundedQuestions} />
      )}

      <div className={classes.titleWrapper}>
        <Typography variant="h6" className={classes.headerTitle}>
          Forum
        </Typography>
      </div>
      <Button
        className={classes.startPageButton}
        onClick={() => navigate('/')}
        variant="outlined"
        startIcon={<FirstPageIcon />}>
        start page
      </Button>
    </div>
  );
}
