import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ForumPage from './pages/forumPage/ForumPage';
import StartPage from './pages/startPage/StartPage';
import '@fontsource/orbitron';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div id="App" className="App">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="forum/*" element={<ForumPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
