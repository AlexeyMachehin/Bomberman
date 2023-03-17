import { useAppSelector } from './utils/hooks';
import { selectorIsLoaderOn } from './store/user/selectors';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ForumPage from './pages/forumPage/ForumPage';
import StartPage from './pages/startPage/StartPage';
import Chat from './features/forumPage/components/chat/Chat';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import LeaderBoard from './pages/leaderBoardPage/LeaderBoardPage';
import GamePage from './pages/GamePage/GamePage';
import AuthGuard from './features/authGuard/AuthGuard';
import UnAuthGuard from './features/unAuthGuard/UnAuthGuard';
import { Layout } from './features/layout/Layout';
import ErrorSnackbar from './features/alerts/ErrorSnackbar';
import ProfilePage from './pages/profile/Profile';
import ProfileChangePage from './pages/profileChange/ProfileChange';
import PasswordChangePage from './pages/passwordChange/PasswordChange';
import Loader from './features/loader/Loader';
import AudioPlayer from './features/audioPlayer/AudioPlayer';
import { Route as RoutePath } from './const';
import './styles/App.css';

function App() {
  const theme = createTheme();
  const isLoaderOn = useAppSelector(selectorIsLoaderOn);

  return (
    <ThemeProvider theme={theme}>
      <AudioPlayer />
      <ErrorSnackbar />
      {isLoaderOn && <Loader />}
      <Layout>
        <div id="App" className="App">
          <Routes>
            <Route path="*" element={<Navigate to={RoutePath.INDEX} />} />
            <Route element={<UnAuthGuard />}>
              <Route path={RoutePath.LOGIN} element={<Login />} />
              <Route path={RoutePath.SIGNUP} element={<Signup />} />
            </Route>
            <Route element={<AuthGuard />}>
              <Route path={RoutePath.INDEX} element={<StartPage />} />
              <Route path={RoutePath.GAME} element={<GamePage />} />
              <Route path={RoutePath.PROFILE} element={<ProfilePage />} />
              <Route
                path={RoutePath.PROFILE_CHANGE}
                element={<ProfileChangePage />}
              />
              <Route
                path={RoutePath.PASSWORD_CHANGE}
                element={<PasswordChangePage />}
              />
              <Route path={RoutePath.LEADERBOARD} element={<LeaderBoard />} />
              <Route path={RoutePath.FORUM} element={<ForumPage />} />
              <Route path={`${RoutePath.FORUM}/:mainTopic`} element={<Chat />}>
                <Route path=":id" element={<Chat />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
