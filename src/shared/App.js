import React from 'react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import {
  Home, CreateRoom, VoteRoom, Page404,
} from 'pages';
import Navibar from 'components/navibar';

function App() {
  return (
    <div className="container">
      <Navibar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/room/create" component={CreateRoom} />
        <Route path="/room/:id" component={VoteRoom} />
        <Route path="/404" component={Page404} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
