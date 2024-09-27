import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './features/userSlice';
import { fetchQuestions } from './features/questionSlice';
import { logout } from './features/authSlice';
import NotFoundPage from './components/Notfoundpage';
import RequireAuth from './requireAuth';
import './App.css';

import HomePage from './components/Homepage';
import Leaderboard from './components/Leaderboard';
import LoginPage from './components/Loginpage';
import NewPoll from './components/Newpoll';
import PollPage from './components/Pollpage';
import styled from 'styled-components';

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
`;

function App() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.auth.authedUser);
  const users = useSelector((state) => state.users.users);
  const navigate = useNavigate(); 

  React.useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());    
  };

  return (
    <div className="app"> 
      <nav>
        <ul style={{ listStyleType: 'none' }}>
          {authedUser ? (
            <>
            <div className='user-welcome-box'>
              <p className='user-welcome'>Let's vote, {users[authedUser]?.name} !</p>
              <Avatar className='user-welcome' src={users[authedUser]?.avatarURL} alt={`${users[authedUser]?.name}'s avatar`} />
            </div>
              <li className='nav-item'><Link to="/">Home</Link></li>
              <li className='nav-item'><Link to="/leaderboard">Leaderboard</Link></li>
              <li className='nav-item'><Link to="/add">New Poll</Link></li>
              <li className='nav-item'>
                <button className='nav-item-logout' onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className='nav-item'><Link to="/">Login</Link></li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>} />
        <Route path="/add" element={<RequireAuth><NewPoll /></RequireAuth>} />
        <Route path="/questions/:id" element={<RequireAuth><PollPage /></RequireAuth>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
