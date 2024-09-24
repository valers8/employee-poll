import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../features/questionSlice';
import { saveQuestionAnswer } from '../features/questionSlice';
import { fetchUsers } from '../features/userSlice';
import styled from 'styled-components';

const PollPageContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const PollPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authedUser = useSelector((state) => state.auth.authedUser);
  const question = useSelector((state) => state.questions.questions[id]);
  const questionsStatus = useSelector((state) => state.questions.status);
  const users = useSelector((state) => state.users.users);
  const usersStatus = useSelector((state) => state.users.status);

  const isLoading = questionsStatus === 'loading' || usersStatus === 'loading';

  // Fetch data if not already available
  useEffect(() => {
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, questionsStatus, usersStatus]);

  if (isLoading) {
    return <p>Loading...</p>; // Handle loading state
  }

  if (!question || !users[question.author]) {
    return <p>Question not found.</p>; // Handle missing question or author
  }

  const author = users[question.author];
  const hasAnswered = users[authedUser].answers[id];

  const handleVote = (option) => {
    if (!hasAnswered) {
      dispatch(saveQuestionAnswer({ authedUser, qid: id, answer: option }));
      navigate('/'); // Redirect to home after voting
    }
  };

  return (
    <PollPageContainer>
      <h3>{author.name} asks: Would you rather</h3>
      <button style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                cursor: 'pointer',
                marginRight: '20px',
                marginBottom: '10px'
               }} 
             onClick={() => handleVote('optionOne')}>{question.optionOne.text}</button>
      <button style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                cursor: 'pointer'
               }} onClick={() => handleVote('optionTwo')}>{question.optionTwo.text}</button>
    </PollPageContainer>
  );
};

export default PollPage;