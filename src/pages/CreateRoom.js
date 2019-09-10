import React from 'react';
import Loading from 'components/loading';

class CreateRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPosition: null,
      errorMessage: '',
      isLoading: false,
      loadingMessage: '',
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    this.setState({
      isLoading: true,
      loadingMessage: '위치정보를 가져오는 중이에요.',
    });
    navigator.geolocation.getCurrentPosition((position) => {
      // success
      this.setState({
        isLoading: false,
        currentPosition: position.coords,
      });
    }, (error) => {
      this.setState({
        isLoading: false,
      });
      // eslint-disable-next-line default-case
      switch (error.code) {
        // PERMISSION_DENIED
        case 1:
          this.setState({
            errorMessage: '위치정보 접근 권한이 거부되었어요.',
          });
          break;
        // POSITION_UNAVAILABLE
        case 2:
          this.setState({
            errorMessage: '위치정보 권한이 허용되었으나 위치를 가져올수 없어요.',
          });
          break;
        // TIMEOUT
        case 3:
          this.setState({
            errorMessage: '위치정보 권한이 허용되었으나 위치를 가져올수 없어요.',
          });
          break;
      }
    }, {
      // getCurrentPosition options
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    });
  }

  createRoom() {
    const { currentPosition } = this.state;
    this.setState({
      isLoading: true,
      loadingMessage: '방을 생성하는 중이에요.',
    });
    fetch('http://localhost:5001/room/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
        },
      }),
    })
      .then((response) => response.json())
      .then((roomId) => {
        this.setState({
          isLoading: false,
        });
        this.props.history.push(`/room/${roomId}`);
      });
  }

  render() {
    const {
      currentPosition, errorMessage, isLoading, loadingMessage,
    } = this.state;
    let currentStatusMessage = '';

    if (currentPosition) {
      currentStatusMessage = '이제 방을 만들 준비가 되었어요.';
    } else {
      currentStatusMessage = '주변 식당을 찾기 위해 현재 위치를 직접 입력해주세요.';
    }

    return (
      <div className="createRoom">
        <Loading message={loadingMessage} isLoading={isLoading} />
        <p className="createRoom__text">{errorMessage}</p>
        <p className="createRoom__text">{currentStatusMessage}</p>
        <div>
          <button
            className="createRoom__button"
            type="button"
            disabled={!errorMessage}
            onClick={this.getLocation.bind(this)}
          >
            { !errorMessage ? '위치정보 동의 완료' : ' 위치정보 동의' }
          </button>
        </div>
        <div>
          <button
            className="createRoom__button"
            type="button"
            disabled={!currentPosition}
            onClick={this.createRoom.bind(this)}
          >
          방만들기
          </button>
        </div>
      </div>
    );
  }
}

export default CreateRoom;
