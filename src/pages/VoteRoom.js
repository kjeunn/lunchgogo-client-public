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
      vote_result: '',
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
            vote_result: data.vote_result,
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
            vote_result: data.vote_result,
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
      socket, roomStatus, results, loadingMessage, isLoading, vote_result, voteMessage,
    } = this.state;
    const { match } = this.props;
    let currentState;

    const infoMessage = (
      <div className="voteRoom__text voteRoom__text--info">
        <ol>
          <li>투표가 시작되면 먹고싶은 만큼</li>
          <li>원하는 메뉴를 마구마구 눌러주세요!</li>
          <li>자, 손가락 풀고 준비해주세요</li>
          <li>곧 투표가 시작됩니다!</li>
        </ol>
      </div>
    );

    if (roomStatus === 'wait') {
      currentState = (
        <div>
          <p className="voteRoom__text">다른 유저들을 기다리는 중이에요.</p>
          {infoMessage}
        </div>
      );
    } else if (roomStatus === 'ready') {
      currentState = (
        <div>
          {infoMessage}
          <Counter socket={socket} />
        </div>
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
          <div className="voteRoom__message-wrapper">
            <span className="voteRoom__caster">💁🏼‍♀️</span>
            <div className="voteRoom__message">
              {voteMessage ? '투표 스타트!!' : '투표시간이 얼마 남지 않았어요!!'}
            </div>
          </div>
          <Categories socket={socket} match={match} />
        </div>
      );
    } else if (roomStatus === 'result' && vote_result) {
      currentState = <Result results={results} vote_result={vote_result} />;
    }

    return (
      <div className={`voteRoom ${roomStatus === 'result' ? 'voteRoom--result' : ''}`}>
        <div className="voteRoom__inner">
          <Loading message={loadingMessage} isLoading={isLoading} />
          <CopyUrlButton />
          {currentState}
        </div>
      </div>
    );
  }
}


export default VoteRoom;
