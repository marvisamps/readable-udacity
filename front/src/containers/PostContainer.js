import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Row, Col, Button } from 'antd';
import { fetchPosts, deletePost } from '../actions/posts';
import Sidebar from '../components/Sidebar';
import SortBy from '../components/SortBy';
import Breadcrumb from '../components/Breadcrumb';
import PostList from '../components/PostList';
import NoPosts from '../components/NoPosts';

class PostContainer extends Component {
  state = {
    sortBy: 'date'
  }

  componentWillMount() {
    const category = this.props.match.params.category;
    this.props.fetchPosts(category);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      const category = nextProps.match.params.category;
      this.props.fetchPosts(category);
    }
  }

  renderPosts = (posts, category) => {
    if (posts.length > 0) {
      return (
        <PostList
          posts={posts}
          category={category}
          sortBy={this.state.sortBy}
          deletePost={this.props.deletePost}
        />
      )
    }
    return <NoPosts category={category} />
  }

  onSortChange = (sortBy) => {
    this.setState({ sortBy })
  }

  render() {
    const { posts, match } = this.props;
    const category = match.params.category;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Layout.Header style={styles.layoutHeader}>
            <Breadcrumb category={category} />
            <Link to="/new">
              <Button type="primary" icon="plus" size="small">
                Add New Post
              </Button>
            </Link>
          </Layout.Header>
          <Layout.Content style={styles.layoutContent}>
            <Row>
              <Col span={12}>
                <div style={styles.title}>Posts</div>
              </Col>
              <Col span={12}>
                <SortBy align="right" onSortChange={this.onSortChange} />
              </Col>
            </Row>
            {this.renderPosts(posts, category)}
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

const styles = {
  layoutHeader: {
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: '#fff',
    lineHeight: '12px',
  },
  layoutContent: {
    margin: 20,
  },
  title: {
    marginLeft: 2,
    fontSize: 24,
    fontWeight: 600,
  },
  addNewPostBtn: {
    textAlign: 'right',
  },
}

const mapStateToProps = ({ posts }) => ({
  posts,
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: category => dispatch(fetchPosts(category)),
  deletePost: post => dispatch(deletePost(post)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
