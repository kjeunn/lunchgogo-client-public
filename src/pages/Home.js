import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Lunch is mundle</h1>
    <Link to="/room/create">시작하기</Link>
  </div>
);

export default Home;
