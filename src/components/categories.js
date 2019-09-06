import React from 'react';
import CategoryItem from 'components/category-item';
import 'style.css';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: null,
      categories: [
        {
          name: 'category1',
        },
        {
          name: 'category2',
        },
        {
          name: 'category3',
        },
        {
          name: 'category4',
        },
        {
          name: 'category5',
        },
        {
          name: 'category6',
        },
        {
          name: 'category7',
        },
        {
          name: 'category8',
        },
      ],
    };
    this.handleSendCategory = this.handleSendCategory.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.on('vote', (data) => {
      this.setState({
        currentCategory: data,
      }, () => {
        this.setState({
          currentCategory: null,
        });
      });
    });
  }

  handleSendCategory(category) {
    const { socket, match } = this.props;

    socket.emit('vote', {
      room_name: match.params.id,
      category,
    });
  }

  render() {
    const { categories, currentCategory } = this.state;
    return (
      categories.map((category) => (
        <CategoryItem
          key={category.name}
          handleClick={this.handleSendCategory}
          category={category}
          currentCategory={currentCategory}
        />
      ))
    );
  }
}

export default Categories;
