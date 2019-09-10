import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const Loading = ({ isLoading, message }) => (isLoading ? (
  <div className="loading">
    <div className="loading__content">
      <PacmanLoader
        className="loading__spinner"
        sizeUnit="px"
        size={24}
        color="#f89b3a"
      />
      <div className="loading__message">{message}</div>
    </div>
  </div>
) : null);

export default Loading;
