import React from 'react';
import { Link } from 'react-router-dom';
import logo404 from 'assets/images/lunchgogo-404Page.png';

const Page404 = () => (
  <div className="page404">
    <div className="page404__inner">
      <div className="page404__title"><img src={logo404} /></div>
      <p className="page404__text">
존재하지 않는 페이지 이거나
<br></br>
{' '}
이미 없어진 방이에요.
</p>
      <Link className="page404__button" to="/">홈으로 돌아가기</Link>
    </div>
  </div>
);

export default Page404;
