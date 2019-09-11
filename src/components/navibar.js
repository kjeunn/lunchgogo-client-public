import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Navibar = (props) => {
  if (props.location.pathname !== '/') {
    return (
      <div className="navigation">
        <Link to="/"><i className="fas fa-home" /></Link>
      </div>
    );
  }
  return null;
};

export default withRouter(Navibar);
