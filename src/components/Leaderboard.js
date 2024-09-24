import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/userSlice';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Leaderboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (Object.keys(users).length === 0) {
    return <p>Loading...</p>;
  }

  const sortedUsers = Object.values(users).sort((a, b) => {
    const scoreA = Object.keys(a.answers).length + a.questions.length;
    const scoreB = Object.keys(b.answers).length + b.questions.length;
    return scoreB - scoreA;
  });

  return (
    <LeaderboardContainer>
      {sortedUsers.map((user) => (
        <UserCard key={user.id}>
          <Avatar src={user.avatarURL} alt={`${user.name}'s avatar`} />
          <div>
            <h3>{user.name}</h3>
            <p>Answered questions: {Object.keys(user.answers).length}</p>
            <p>Created questions: {user.questions.length}</p>
            <p>Total score: {Object.keys(user.answers).length + user.questions.length}</p>
          </div>
        </UserCard>
      ))}
    </LeaderboardContainer>
  );
};

export default Leaderboard;


