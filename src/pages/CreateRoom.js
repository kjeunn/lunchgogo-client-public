import React from 'react';
import Loading from '../components/loading';
import SearchLocation from '../components/searchLocation';
import { KAKAO_API_KEY } from '../apiKey';

class CreateRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPosition: null,
      errorMessage: '',
      isLoading: false,
      loadingMessage: '',
      currentAddress: '',
      successGetLocation: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
      loadingMessage: '위치 정보를 불러오는 중이에요.',
    });
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      // success
      this.setState({
        isLoading: false,
        successGetLocation: true,
        currentPosition: position.coords,
      }, () => {
        this.getAddress();
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
            errorMessage: '위치정보 권한이 허용되었으나 위치를 가져오는데 실패했어요.',
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

  getUserLocation = (location) => {
    this.setState({
      isLoading: false,
      currentPosition: location,
      errorMessage: '',
    }, () => {
      this.getAddress();
    });
  }

  getAddress = () => {
    const { longitude, latitude } = this.state.currentPosition;
    fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`, {
      headers: {
        Authorization: KAKAO_API_KEY,
      },
    }).then((res) => res.json())
      .then((data) => {
        this.setState({
          currentAddress: data.documents[0].address.region_3depth_name,
        });
      });
  }

  test = () => {
    this.setState({
      isLoading: true,
      loadingMessage: '위치 정보를 불러오는 중이에요.',
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
      }).catch(() => {
        this.props.history.push('/404');
      });
  }

  render() {
    const {
      currentPosition, errorMessage, isLoading, loadingMessage, currentAddress, successGetLocation,
    } = this.state;
    let currentStatusMessage = '';
    let currentAddressMessage = '';
    let locationInput = false;

    if (currentPosition) {
      currentStatusMessage = '이제 방을 만들 준비가 되었어요.';
      locationInput = false;
    } else {
      currentStatusMessage = '주변 식당을 찾기 위해 현재 위치를 직접 입력해주세요.';
      locationInput = true;
    }

    if (currentAddress) {
      // eslint-disable-next-line react/jsx-one-expression-per-line
      currentAddressMessage = <p className="createRoom__text">현재 위치는 {currentAddress} 입니다.</p>;
    }

    return (
      <div className="createRoom">
        <div className="createRoom__inner">
          <Loading message={loadingMessage} isLoading={isLoading} />
          {currentAddressMessage}
          <p className="createRoom__text">{errorMessage}</p>
          <p className="createRoom__text">{currentStatusMessage}</p>

          <div style={{ display: !successGetLocation ? 'block' : 'none' }}>
            <SearchLocation onStart={this.test} onComplete={this.getUserLocation} />
          </div>

          <button
            className="createRoom__button"
            type="button"
            disabled={!currentPosition}
            onClick={this.createRoom.bind(this)}
          >
            { locationInput ? '주소를 먼저 선택해주세요.' : ' 방만들기' }
          </button>
        </div>
      </div>
    );
  }
}

export default CreateRoom;
