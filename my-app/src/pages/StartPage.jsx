// StartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div>
      <h1>Welcome to the Data Center Database</h1>
      <Link to="/menu">
        <button>Go to Menu</button>
      </Link>
    </div>
  );
}

export default StartPage;
