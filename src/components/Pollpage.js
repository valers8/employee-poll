import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions, saveQuestionAnswer } from '../features/questionSlice';
import { fetchUsers } from '../features/userSlice';
import { logout } from '../features/authSlice';
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
  const [activeTab, setActiveTab] = useState('unanswered');

  const authedUser = useSelector((state) => state.auth.authedUser);
  const question = useSelector((state) => state.questions.questions[id]);
  const questionsStatus = useSelector((state) => state.questions.status);
  const users = useSelector((state) => state.users.users);
  const usersStatus = useSelector((state) => state.users.status);

  const isLoading = questionsStatus === 'loading' || usersStatus === 'loading';

  useEffect(() => {
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, questionsStatus, usersStatus]);

  // Navigate to 404 page if the question is not found
  useEffect(() => {
    if (!question && questionsStatus === 'succeeded') {
      navigate('/404'); // Assuming you have a route for the 404 page
    }
  }, [question, questionsStatus, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Check if the question is undefined or author does not exist
  if (!question || !users[question.author]) {
    return <p>Question not found.</p>; // Show a not found message if question is invalid
  }

  const author = users[question.author];
  const hasAnswered = Object.keys(users[authedUser].answers).includes(id);

  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercentage = totalVotes > 0 ? ((question.optionOne.votes.length / totalVotes) * 100).toFixed(2) : 0;
  const optionTwoPercentage = totalVotes > 0 ? ((question.optionTwo.votes.length / totalVotes) * 100).toFixed(2) : 0;

  const hasVotedOptionOne = question.optionOne.votes.includes(authedUser);
  const hasVotedOptionTwo = question.optionTwo.votes.includes(authedUser);

  const handleVote = (option) => {
    if (!hasAnswered) {
      dispatch(saveQuestionAnswer({ authedUser, qid: id, answer: option }))
        .then(() => {
          // Re-fetch the questions to update the UI after voting
          dispatch(fetchQuestions());
        });
    }
  };
  
  return (
    <PollPageContainer>
      <div>
        {hasAnswered || hasVotedOptionOne || hasVotedOptionTwo ? (
          <div>
            <p>
              You answered: {hasVotedOptionOne ? question.optionOne.text : question.optionTwo.text}
            </p>
            <div>
              <p>
                <strong>{question.optionOne.text}</strong> - {question.optionOne.votes.length} votes ({optionOnePercentage}%)
                {hasVotedOptionOne && <span> (Your vote)</span>}
              </p>
              <p>
                <strong>{question.optionTwo.text}</strong> - {question.optionTwo.votes.length} votes ({optionTwoPercentage}%)
                {hasVotedOptionTwo && <span> (Your vote)</span>}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h3>{author.name} asks: Would you rather</h3>
            <button
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                cursor: 'pointer',
                marginRight: '20px',
                marginBottom: '10px',
              }}
              onClick={() => handleVote('optionOne')}
            >
              {question.optionOne.text}
            </button>
            <button
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                cursor: 'pointer',
              }}
              onClick={() => handleVote('optionTwo')}
            >
              {question.optionTwo.text}
            </button>
          </div>
        )}
      </div>
    </PollPageContainer>
  );
};

export default PollPage;

