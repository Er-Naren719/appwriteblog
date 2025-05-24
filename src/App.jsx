import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components/';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer /> ̰
      </div>
      <h1>A blog with Appwrite</h1>
    </div>
  ) : (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  );
}

export default App
