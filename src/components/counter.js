import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.on('countdown', (count) => {
      this.setState({
        count,
      });
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="voteRoom__counter">
        <strong>{count}</strong>
        초 남았습니다.
      </div>
    );
  }
}

export default Counter;
