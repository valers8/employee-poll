import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoginPageContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled(motion.button)`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: rgb(21, 171, 120);
  color: #fff;
  cursor: pointer;
  font-size: small;

  &:hover {
    background: #0f9064;
  }
`;

const LoginPage = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (users[selectedUser].password === password) {
      dispatch(login(selectedUser));
      navigate('/');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <LoginPageContainer>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <label>Select User:</label>
        <select className="login-user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select a user</option>
          {Object.keys(users).map((user) => (
            <option key={user} value={user}>
              {users[user].name}
            </option>
          ))}
        </select>
        <label>Password:</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          whileTap={{ scale: 0.95 }}
        >
          Login
        </Button>
      </Form>
    </LoginPageContainer>
  );
};

export default LoginPage;


  
  