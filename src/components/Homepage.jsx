import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/signin');
  };

  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Homepage;
