import './app.css'
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage';
import ElectionCreatePage from './pages/Election/ElectionCreatePage';
import ElectionListPage from './pages/Election/ElectionListPage';
import ElectionViewPage from './pages/Election/ElectionViewPage';
import ElectionUpdatePage from './pages/Election/ElectionUpdatePage';
import ElectionHomePageView from './pages/ElectionHomePageView';
import ParticipatedElections from './pages/Participated/ParticipatedElections';
import ParticipatedElectionView from './pages/Participated/ParticipatedElectionView';
import ElectionWinnerPage from './pages/WinnerPage';

function App() {

  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/home/election/:id" element={<ElectionHomePageView/>}/>
    <Route  path="/login" element={<LoginPage />}/>
    <Route  path="/signup" element={<RegisterPage />}/>
    <Route path="/dashboard" element={<DashboardPage/>}/>
    <Route path="/election/create" element={<ElectionCreatePage/>}/>
    <Route path="/election/update/:id" element={<ElectionUpdatePage />} />
    <Route path="/election" element={<ElectionListPage />} />
    <Route path="/election/view/:id" element={<ElectionViewPage />} />
    <Route path='/participated' element={<ParticipatedElections/>}/>
    <Route path="/participated/:id" element={<ParticipatedElectionView />} />
    <Route path="/winners" element={<ElectionWinnerPage/>}/>
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
