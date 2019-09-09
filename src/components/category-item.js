import React from 'react';

class CategoryItem extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.addEventListener('webkitAnimationEnd', () => {
      this.textInput.current.style.webkitAnimation = 'none';
    });

    setInterval(() => {
      if (this.state.count > 0) {
        this.setState({
          count: this.state.count - 1,
        });
      }
    }, 1000);
  }

  componentDidUpdate() {
    const { currentCategory, category } = this.props;
    if (currentCategory === category) {
      this.vote();
    }
  }

  vote() {
    this.textInput.current.style.webkitAnimation = '';
    this.setState({
      count: this.state.count + 1,
    });
  }

  fire() {
    return this.state.count > 30 ? 'fire' : '';
  }

  handleClick(category) {
    this.props.handleClick(category);
    this.vote();
  }

  render() {
    const { category } = this.props;

    return (
      <button
        type="button"
        ref={this.textInput}
        className={`category-item ${this.fire()}`}
        onClick={this.handleClick.bind(this, category)}
      >
        {category}
      </button>
    );
  }
}

export default CategoryItem;
