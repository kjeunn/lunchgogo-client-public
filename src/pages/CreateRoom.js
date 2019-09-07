import React from 'react';

class CreateRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPosition: null,
      geoPermisionDenined: false,
    };
  }

  componentDidMount() {
    this.checkGeolocationPermision();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      // success
      this.setState({
        currentPosition: position.coords,
      });
    }, (error) => {
      // error
      this.setState({
        geoPermisionDenined: true,
      });
    }, {
      // getCurrentPosition options
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    });
  }

  checkGeolocationPermision() {
    // geolocation 권한 여부를 조회한다.
    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      // 권한이 이미 부여(granted) 되어 있다면 위치 정보를 세팅한다.
      if (permissionStatus.state === 'granted') {
        this.getLocation();
      } else if (permissionStatus.state === 'denied') {
        this.setState({
          geoPermisionDenined: true,
        });
      }
    });
  }

  createRoom() {
    const { currentPosition } = this.state;
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
        this.props.history.push(`/room/${roomId}`);
      });
  }

  render() {
    const { currentPosition, geoPermisionDenined } = this.state;
    let currentStatusMessage = '';

    if (geoPermisionDenined) {
      currentStatusMessage = '현재 위치 정보 접근을 거부 하셨어요. 브라우저 설정에서 차단을 풀어주세요.';
    } else if (!currentPosition) {
      currentStatusMessage = '주변 식당을 검색하기 위해 현재 위치 정보가 필요합니다.';
    } else {
      currentStatusMessage = '이제 방을 만들 준비가 되었습니다.';
    }

    return (
      <div className="createRoom">
        <p className="createRoom__text">{currentStatusMessage}</p>
        <div>
          <button
            className="createRoom__button"
            type="button"
            disabled={currentPosition || geoPermisionDenined}
            onClick={this.getLocation.bind(this)}
          >
            { currentPosition ? '위치정보 동의 완료' : ' 위치정보 동의' }
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
