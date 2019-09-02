import React from 'react';
import { Route } from 'react-router-dom';
import { Home, CreateRoom, VoteRoom } from 'pages';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/room/create" component={CreateRoom} />
      <Route exact path="/room/:id" component={VoteRoom} />
    </div>
  );
}

export default App;
