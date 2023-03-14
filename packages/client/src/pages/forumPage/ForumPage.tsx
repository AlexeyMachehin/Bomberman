import Header from '../../features/forumPage/components/header/Header';
import MainList from '../../features/forumPage/components/mainList/MainList';
import classes from './forumPage.module.css';

export default function ForumPage() {
  return (
    <div data-testid="forum-component" className={classes.forumPageWrapper}>
      <Header />
      <MainList />
    </div>
  );
}
