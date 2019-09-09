import React from 'react';

const Result = ({ results }) => (
  <div className="result">
    {results.map((result) => (
      <a key={result.place_name} href={result.place_url} target="_blank" rel="noreferrer noopener" className="result__item">
        <div className="result__item-name">
          {result.place_name}
        </div>
        <div className="result__item-distance">
          {result.distance}
        미터
        </div>
      </a>
    ))}
  </div>
);

export default Result;
