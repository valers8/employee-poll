import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuestion } from '../features/questionSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NewPollPageContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 60px !important;
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
  font-size: 1em;
`;

const Button = styled(motion.button)`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const NewPoll = () => {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const authedUser = useSelector((state) => state.auth.authedUser);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // If authedUser or users is missing, show a loading screen
  if (!authedUser || !users || !users[authedUser]) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure both options are filled
    if (!optionOne || !optionTwo) {
      alert('Both options are required.');
      return;
    }

    // Dispatch the action to save a new question
    dispatch(saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    }));

    // Redirect to the home page
    navigate('/');
  };

  return (
    <NewPollPageContainer>
      <h3>Create a New Poll</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter option one text here"
          value={optionOne}
          onChange={(e) => setOptionOne(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Enter option two text here"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.target.value)}
          required
        />
        <Button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!optionOne || !optionTwo}
        >
          Submit
        </Button>
      </Form>
    </NewPollPageContainer>
  );
};

export default NewPoll;


