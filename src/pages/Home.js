import React from 'react';
import { Link } from 'react-router-dom';
import Favicon from 'react-favicon';

import logo from 'assets/images/lunchgogo-logo.png';
import favicon from 'assets/images/lunchgogo-favicon.png';

const Home = () => (
  <div className="home">
    <div>
      <Favicon url={favicon} />
      <h1 className="home__logo">
        <img src={logo} alt="런치고고" />
      </h1>
      <Link className="home__button" to="/room/create">시작하기</Link>
    </div>
  </div>
);

export default Home;
