import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.png';

const Home = () => (
  <div className="home">
    <h1 className="home__logo">
      <img src={logo} alt="런치고고" />
    </h1>
    <Link className="home__button" to="/room/create">시작하기</Link>
  </div>
);

export default Home;
