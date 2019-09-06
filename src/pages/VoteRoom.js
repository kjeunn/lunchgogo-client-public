import React from 'react';
import io from 'socket.io-client';
import CategoryItem from 'components/category-item';
import Counter from 'components/counter';
import 'style.css';

class VoteRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      userCount: 0,
      socket: null,
      roomStatus: 'wait',
      currentCategory: null,
      categories: [
        {
          name: 'category1',
          toggle: false,
        },
        {
          name: 'category2',
          toggle: false,
        },
        {
          name: 'category3',
          toggle: false,
        },
        {
          name: 'category4',
          toggle: false,
        },
        {
          name: 'category5',
          toggle: false,
        },
        {
          name: 'category6',
          toggle: false,
        },
        {
          name: 'category7',
          toggle: false,
        },
        {
          name: 'category8',
          toggle: false,
        },
      ],
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

  handleSendCategory = (category) => {
    this.state.socket.emit('vote', {
      room_name: this.props.match.params.id,
      category,
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
        this.state.socket.on('vote', (data) => {
          this.setState({
            currentCategory: data,
          }, () => {
            this.setState({
              currentCategory: null,
            });
          });
        });
        resolve();
      });
    });
  }

  render() {
    const { socket, roomStatus } = this.state;
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
          {this.state.categories.map((category) => (
            <CategoryItem
              key={category.name}
              handleClick={this.handleSendCategory}
              category={category}
              currentCategory={this.state.currentCategory}
            />
          ))}
        </div>
      );
    } else if (roomStatus === 'result') {
      currentState = <div>투표 완료 식당목록을 출력합니다.</div>;
    }

    return (
      <div>
        <button className="btn" data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">
            Copy to clipboard
        </button>
        {currentState}
      </div>
    );
  }
}


export default VoteRoom;
