import React from 'react';
import io from 'socket.io-client';
import Counter from 'components/counter';
import Categories from 'components/categories';
import CopyUrlButton from 'components/btn-url-copy';
import Result from 'components/result';

class VoteRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      userCount: 0,
      socket: null,
      roomStatus: 'wait',
    };
  }

  componentDidMount() {
    this.initSocket().then(() => {
      fetch(`http://localhost:5001/room/${this.props.match.params.id}`)
        .then((data) => data.json())
        .then((data) => {
          this.setState({
            roomStatus: data.status,
            userCount: data.joined_num,
          });
        });
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
    const { socket, roomStatus } = this.state;
    const { match } = this.props;
    let currentState;

    if (roomStatus === 'wait') {
      currentState = <p>다른 유저들을 기다리는 중입니다.</p>;
    } else if (roomStatus === 'ready') {
      currentState = (
        <Counter socket={socket} />
      );
    } else if (roomStatus === 'vote') {
      currentState = (
        <div>
          <Counter socket={socket} />
          <Categories socket={socket} match={match} />
        </div>
      );
    } else if (roomStatus === 'result') {
      currentState = <Result socket={socket} />;
    }

    return (
      <div>
        <CopyUrlButton />
        {currentState}
      </div>
    );
  }
}


export default VoteRoom;
