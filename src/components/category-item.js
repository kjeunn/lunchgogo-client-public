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
    if (this.props.currentCategory === this.props.category.name) {
      this.textInput.current.style.webkitAnimation = '';
    }
  }

  handleClick(category) {
    this.props.handleClick(category);
  }

  render() {
    const { name } = this.props.category;

    return (
      <button
        type="button"
        ref={this.textInput}
        className="test"
        onClick={this.handleClick.bind(this, name)}
      >
        {name}
      </button>
    );
  }
}

export default CategoryItem;
