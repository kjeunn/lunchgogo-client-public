import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Home, CreateRoom, VoteRoom, Page404,
} from 'pages';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/room/create" component={CreateRoom} />
        <Route path="/room/:id" component={VoteRoom} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
