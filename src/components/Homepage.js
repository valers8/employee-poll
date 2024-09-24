import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../features/questionSlice';
import { fetchUsers } from '../features/userSlice';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const QuestionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  justify-content: space-between;
`;

const QuestionsList = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  border: 1px solid rgb(221, 221, 221);
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#f4a65f' : '#ddd')};  /* Change to $active */
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  color: white;
  font-size: small;

  &:hover {
    background-color: #f69d4d;
  }
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.auth.authedUser);
  const users = useSelector((state) => state.users.users);
  const questions = useSelector((state) => state.questions.questions);
  const [activeTab, setActiveTab] = useState('unanswered');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!authedUser || !users[authedUser] || Object.keys(users).length === 0 || Object.keys(questions).length === 0) {
    return <p>Loading...</p>;
  }

  const unansweredQuestions = Object.keys(questions)
    .filter((qid) => !users[authedUser].answers[qid])
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const answeredQuestions = Object.keys(questions)
    .filter((qid) => users[authedUser].answers[qid])
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const handleShowClick = (id) => {
    navigate(`/questions/${id}`);  // Navigate to PollPage
  };

  return (
    <div>
      <TabsContainer>
        <TabButton $active={activeTab === 'unanswered'} onClick={() => setActiveTab('unanswered')}>
          Unanswered Questions
        </TabButton>
        <TabButton $active={activeTab === 'answered'} onClick={() => setActiveTab('answered')}>
          Answered Questions
        </TabButton>
      </TabsContainer>

    {activeTab === 'unanswered' && unansweredQuestions.length === 0 ? (
        <p className='message-sign'>No unanswered questions.</p>
    ) : (
        <QuestionsList>
        {(activeTab === 'unanswered' ? unansweredQuestions : answeredQuestions).map((qid) => {
          const question = questions[qid];
          const author = users[question.author];

          if (!author) {
            return null;
          }

          return (
            <QuestionItem key={qid}>
              <Avatar
                src={author.avatarURL}
                alt={`${author.name}'s avatar`}
              />
              <div>
                <p>{author.name} asks:</p>
                <p>
                  Would you rather {question.optionOne.text} or {question.optionTwo.text}?
                </p>
              </div>
               <button style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                cursor: 'pointer',
                backgroundColor: '#15ab78',
                color: 'white',
               }} 
                onClick={() => handleShowClick(qid)}>Show</button>
            </QuestionItem>
          );
        })}
      </QuestionsList>
    )} 
    </div>
  );
};

export default HomePage;