import React from 'react';
import io from 'socket.io-client';
import Counter from 'components/counter';
import Categories from 'components/categories';
import CopyUrlButton from 'components/btn-url-copy';
import Result from 'components/result';
import Loading from 'components/loading';

class VoteRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      userCount: 0,
      socket: null,
      roomStatus: 'wait',
      results: [],
      isLoading: false,
      loadingMessage: '',
      voteMessage: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
      loadingMessage: '서버와 연결 중이에요.',
    });
    this.initSocket().then(() => {
      fetch(`http://localhost:5001/room/${this.props.match.params.id}`)
        .then((data) => data.json())
        .then((data) => {
          this.setState({
            isLoading: false,
            roomStatus: data.status,
            userCount: data.joined_num,
            results: this.state.results.concat(data.final_result),
          });
        })
        .catch(() => {
          this.props.history.push('/404');
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
          if (roomStatus === 'result') {
            this.setState({
              isLoading: true,
              loadingMessage: '투표 결과를 확인중이에요. 잠시만 기다려주세요.',
            });
          }
          this.setState({
            roomStatus,
          });
        });

        this.state.socket.on('result', (data) => {
          this.setState({
            results: this.state.results.concat(data.final_result),
            isLoading: false,
          });
        });
        resolve();
      });
    });
  }

  render() {
    const {
      socket, roomStatus, results, loadingMessage, isLoading, voteMessage,
    } = this.state;
    const { match } = this.props;
    let currentState;

    if (roomStatus === 'wait') {
      currentState = <p className="voteRoom__text">다른 유저들을 기다리는 중이에요.</p>;
    } else if (roomStatus === 'ready') {
      currentState = (
        <Counter socket={socket} />
      );
    } else if (roomStatus === 'vote') {
      setTimeout(() => {
        this.setState({
          voteMessage: false,
        });
      }, 7000);

      currentState = (
        <div>
          <Counter socket={socket} />
          <div>
            {voteMessage ? '투표 스타트!!' : '투표시간이 얼마 남지 않았어요!!'}
          </div>
          <Categories socket={socket} match={match} />
        </div>
      );
    } else if (roomStatus === 'result') {
      currentState = <Result results={results} />;
    }

    return (
      <div className="voteRoom">
        <Loading message={loadingMessage} isLoading={isLoading} />
        <CopyUrlButton />
        {currentState}
      </div>
    );
  }
}


export default VoteRoom;
