import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  Home, CreateRoom, VoteRoom, Page404,
} from 'pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/room/create" component={CreateRoom} />
      <Route path="/room/:id" component={VoteRoom} />
      <Route path="/404" component={Page404} />
      <Redirect to="/404" />
    </Switch>
  );
}

export default App;
