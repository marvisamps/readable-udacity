import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Icon, Button } from 'antd';
import { fetchPost, deletePost } from '../actions/posts';
import { fetchComments } from '../actions/comments';
import Sidebar from '../components/Sidebar';
import PostDetail from '../components/PostDetail';

class PostDetailContainer extends Component {
  state = {
    redirect: false,
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPost(id);
    this.props.fetchComments(id);
  }

  handleDelete = (post) => {
    this.props.deletePost(post)
      .then(() => this.setState({
        redirect: !this.state.redirect,
      }));
  }

  render() {
    const { post, comments } = this.props;

    if (Object.keys(post).length === 0) {
      return <Redirect to="/oops" />
    }

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <Layout style={styles.layout}>
        <Sidebar />
        <Layout>
          <Layout.Header style={styles.layoutHeader}>
            <Link to="/">
              <Icon type="arrow-left" style={styles.icon} />
              Go Back
            </Link>
            <span>
              <Link to={{ pathname: '/edit', state: { post } }}>
                <Button icon="edit" size="small" style={styles.btn}>
                  Edit
                </Button>
              </Link>
              <Button
                type="danger"
                icon="delete"
                size="small"
                style={styles.btn}
                onClick={() => this.handleDelete(post)}
                ghost
              >
                Delete
              </Button>
            </span>
          </Layout.Header>
          <Layout.Content style={styles.layoutContent}>
            {post && <PostDetail post={post} comments={comments} />}
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  layout: {
    minHeight: '100vh',
  },
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
  icon: {
    marginRight: 8,
  },
  btn: {
    marginRight: 12,
    width: 80,
  }
}

const mapStateToProps = ({ posts, comments }) => ({
  post: posts,
  comments: comments,
})

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  deletePost: id => dispatch(deletePost(id)),
  fetchComments: id => dispatch(fetchComments(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContainer);
