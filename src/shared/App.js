import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, CreateRoom, VoteRoom } from 'pages';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/room/create" component={CreateRoom} />
        <Route path="/room/:id" component={VoteRoom} />
      </Switch>
    </div>
  );
}

export default App;
