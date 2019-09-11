import React from 'react';


const Result = ({ results, vote_result }) => {
  const sectionStyle = {
    width: '100%',
    height: '200px',
    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${require(`assets/images/${vote_result}.jpg`)})`,
    backgroundSize: 'cover',
  };

  return (
    <div className="result">
      <div className="result__title" style={sectionStyle}>
        <span>
          오늘은
          {' '}
          {vote_result}
          {' '}
          어때요?
        </span>
      </div>
      <div className="result__contents">
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
    </div>
  );
};

export default Result;
