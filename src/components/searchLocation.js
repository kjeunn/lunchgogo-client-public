import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import propTypes from 'prop-types';
import KAKAO_API_KEY from '../apiKey';


export default function SearchLocation(props) {
  const handleAddress = (value) => {
    const { address } = value;
    const headers = {
      Authorization: KAKAO_API_KEY,
    };
    fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`, {
      headers,
    }).then((res) => res.json())
      .then((data) => {
        const currentLatLng = { longitude: data.documents[0].address.x, latitude: data.documents[0].address.y };
        props.onComplete(currentLatLng);
      }).catch((err) => err);
  };

  return (
    <div className="App">
      <DaumPostcode onComplete={handleAddress} />
    </div>
  );
}

SearchLocation.propTypes = {
  onComplete: propTypes.func.isRequired,
};
