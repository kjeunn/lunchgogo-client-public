import React from 'react';
import Clipboard from 'react-clipboard.js';

class urlCopyButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showShortly: false,
    };
  }

  getUrl = () => window.location.href

  copySuccess = () => {
    this.setState({
      showShortly: true,
    });
    setTimeout(() => {
      this.setState({
        showShortly: false,
      });
    }, 1000);
  }

  render() {
    const { showShortly } = this.state;
    return (
      <div className="voteRoom__button-wrapper">
        <Clipboard className="voteRoom__button" option-text={this.getUrl} onSuccess={this.copySuccess}>
          <i className="far fa-copy" />
          {' '}
          방 주소 복사하기
        </Clipboard>
        <div className="voteRoom__button-copied" style={{ display: showShortly ? 'inline-block' : 'none' }}>
          {'복사완료!'}
        </div>
      </div>
    );
  }
}

export default urlCopyButton;
