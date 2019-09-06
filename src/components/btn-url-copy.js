import React from 'react';
import Clipboard from 'react-clipboard.js';

const urlCopyButton = () => {
  function getUrl() {
    return window.location.href;
  }

  function copySuccess() {
    alert('주소가 성공적으로 복사 되었습니다.');
  }

  return (
    <Clipboard option-text={getUrl} onSuccess={copySuccess}>
          방 주소 복사하기
    </Clipboard>
  );
};

export default urlCopyButton;
