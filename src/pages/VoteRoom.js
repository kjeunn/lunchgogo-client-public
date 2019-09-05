import React from 'react';
import io from 'socket.io-client';

class VoteRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      count: 30,
      roomStatus: 'wait',
    };
  }

  componentDidMount() {
    this.initSocket().then(() => {
      fetch(`http://localhost:5001/room/${this.props.match.params.id}`);
    });
  }

  initSocket() {
    const socket = io('http://localhost:5001');

    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        socket.emit('room', this.props.match.params.id);
      });

      this.setState({
        socket,
      }, () => {
        this.state.socket.on('countdown', (count) => {
          this.setState({
            count,
          });
        });
        this.state.socket.on('status', (roomStatus) => {
          this.setState({
            roomStatus,
          });
        });
        resolve();
      });
    });
  }

  render() {
    const { count, roomStatus } = this.state;
    let currentState;

    if (roomStatus === 'wait') {
      currentState = <p>다른 유저들을 기다리는 중입니다.</p>;
    } else if (roomStatus === 'ready') {
      currentState = (
        <p>
          {count}
          초 후에 투표가 시작됩니다.
        </p>
      );
    }

    return (
      <div>
        {currentState}
      </div>
    );
  }
}


export default VoteRoom;
