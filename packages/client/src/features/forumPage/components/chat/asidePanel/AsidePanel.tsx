import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import List from '@mui/material/List';
import AsidePanelItem from './asidePanelItem/AsidePanelItem';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AskQuestionModal from './askQuestionModal/AskQuestionModal';
import { IQuestion } from '../../../../../service/types/forumPage/IQuestion';
import classes from './asidePanel.module.css';

interface IAsidePanelProps {
  selectedQuestion: IQuestion | null;
  foundedQuestions: IQuestion[];
}

const SELECTED_QUESTION_COLOR = '#4caf4f2f';
const DEFAULT_ASIDE_PANEL_WIDTH = 310;
const WIDTH_RATIO = 0.7;

export default function AsidePanel({
  selectedQuestion,
  foundedQuestions,
}: IAsidePanelProps) {
  const { mainTopic } = useParams();
  const [asidePanelWidth, setAsidePanelWidth] = useState<number>(
    DEFAULT_ASIDE_PANEL_WIDTH
  );
  const [isWideAsidePanel, setIsWideAsidePanel] = useState<boolean>(true);
  const [widthButtonTitle, setWidthButtonTitle] = useState<'Wide' | 'Narrow'>(
    'Wide'
  );
  const [widthButtonArrow, setWidthButtonArrow] = useState<JSX.Element>(
    <ArrowForwardIosIcon />
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedQuestion) {
      navigate(`${selectedQuestion.id}`);
    }
  }, []);

  const changeWidth = () => {
    if (asidePanelWidth === DEFAULT_ASIDE_PANEL_WIDTH) {
      setAsidePanelWidth(document.documentElement.clientWidth * WIDTH_RATIO);
    } else {
      setAsidePanelWidth(DEFAULT_ASIDE_PANEL_WIDTH);
    }
  };

  const handleOnClickExpandButton = () => {
    changeWidth();
    if (isWideAsidePanel === true) {
      setIsWideAsidePanel(false);
      setWidthButtonTitle('Narrow');
      setWidthButtonArrow(<ArrowBackIosNewIcon />);
    } else {
      setIsWideAsidePanel(true);
      setWidthButtonTitle('Wide');
      setWidthButtonArrow(<ArrowForwardIosIcon />);
    }
  };

  const onResize = () => {
    setAsidePanelWidth(document.documentElement.clientWidth);
  };

  useEffect(() => {
    if (asidePanelWidth !== DEFAULT_ASIDE_PANEL_WIDTH) {
      window.addEventListener('resize', onResize);
      setAsidePanelWidth(document.documentElement.clientWidth * WIDTH_RATIO);
    }

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [asidePanelWidth]);

  const style = {
    width: asidePanelWidth + 'px',
    bgcolor: 'background.paper',
  };

  const sortAsidePanelItems = (items: IQuestion[]) => {
    return items.sort((a: IQuestion, b: IQuestion) =>
      a.title.localeCompare(b.title)
    );
  };

  const asidePanelItems = useMemo(
    () => sortAsidePanelItems(foundedQuestions),
    [foundedQuestions]
  );

  return (
    <div className={classes.asidePanelWrapper}>
      <List
        className={classes.asidePanel}
        sx={style}
        component="aside"
        aria-label="mailbox folders">
        <AskQuestionModal currentMainTheme={mainTopic ?? ''} />
        <div className={classes.questionsList}>
          {asidePanelItems.map((question: IQuestion) => {
            return (
              <AsidePanelItem
                isWideAsidePanel={isWideAsidePanel}
                key={`${question.title}${question.id}`}
                question={question}
                color={
                  question.id === selectedQuestion?.id
                    ? SELECTED_QUESTION_COLOR
                    : ''
                }
              />
            );
          })}
        </div>

        <div className={classes.asidePanelFooter}>
          <Link
            className={classes.goBackLink}
            onClick={() => {
              navigate('/forum');
            }}>
            Go back to main list
          </Link>

          <Button
            onClick={handleOnClickExpandButton}
            variant="outlined"
            endIcon={widthButtonArrow}>
            {widthButtonTitle}
          </Button>
        </div>
      </List>
    </div>
  );
}
