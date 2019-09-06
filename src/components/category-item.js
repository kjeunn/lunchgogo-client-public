import React from 'react';

class CategoryItem extends React.Component {
  constructor() {
    super();
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.addEventListener('webkitAnimationEnd', () => {
      this.textInput.current.style.webkitAnimation = 'none';
    });
  }

  componentDidUpdate() {
    const { currentCategory, category } = this.props;
    if (currentCategory === category) {
      this.textInput.current.style.webkitAnimation = '';
    }
  }

  handleClick(category) {
    this.props.handleClick(category);
  }

  render() {
    const { category } = this.props;

    return (
      <button
        type="button"
        ref={this.textInput}
        className="test"
        onClick={this.handleClick.bind(this, category)}
      >
        {category}
      </button>
    );
  }
}

export default CategoryItem;
