import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateClaimPage from './pages/CreateClaimPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path='/login'
              element={<LoginPage />}
            />
            <Route 
              path='/dashboard'
              element={<DashboardPage />}
            />
            <Route 
              path='/create-claim'
              element={<CreateClaimPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
