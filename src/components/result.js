import React from 'react';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.on('result', (results) => {
      this.setState({
        results,
      });
    });
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        {results.map((result, index) => (
          <div>
            <a href={result.place_url} target="_blank">
              <div>{index + 1}</div>
              <div>{result.place_name}</div>
              <div>{result.distance}</div>
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default Result;
