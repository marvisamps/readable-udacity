import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { allCategoriesSuccess } from '../actions/categories';

class CategoriesList extends Component {
  renderList() {
    return this.props.categories.map((category) => {
      return (
        <li key={category.id}>
          {category.first}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ allCategoriesSuccess }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
