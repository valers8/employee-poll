import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './features/userSlice';
import { fetchQuestions } from './features/questionSlice';
import { logout } from './features/authSlice';
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
  const questions = useSelector((state) => state.questions.questions);

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
        <Route path="/" element={authedUser ? <HomePage /> : <LoginPage />} />
        <Route path="/leaderboard" element={authedUser ? <Leaderboard /> : <LoginPage />} />
        <Route path="/add" element={authedUser ? <NewPoll /> : <LoginPage />} />
        <Route path="/questions/:id" element={authedUser ? <PollPage /> : <LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

