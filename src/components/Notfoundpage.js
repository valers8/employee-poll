import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFoundPage = () => {
  const authedUser = useSelector((state) => state.auth.authedUser);
  const navigate = useNavigate();

  useEffect(() => {
    // If no authenticated user, redirect to login
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      {authedUser && (
        <Link to="/">Go back to Home</Link>
      )}
    </div>
  );
};

export default NotFoundPage;

