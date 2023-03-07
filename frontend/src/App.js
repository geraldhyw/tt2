import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateClaimPage from './pages/CreateClaimPage';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path='/'
              element={user ? <DashboardPage /> : <Navigate to='/login' />}
            />
            <Route 
              path='/login'
              element={!user ? <LoginPage /> : <Navigate to='/dashboard' />}
            />
            <Route 
              path='/dashboard'
              element={user ? <DashboardPage /> : <Navigate to='/login' />}
            />
            <Route 
              path='/create-claim'
              element={user ? <CreateClaimPage /> : <Navigate to='/login' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
