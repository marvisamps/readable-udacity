import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, List, Button, Input } from 'antd';
import { addComment } from '../actions/comments';
import { sortByDate, sortByVotes } from '../utils/helpers';
import Comment from '../components/Comment';
import SortBy from '../components/SortBy';

class CommentsContainer extends Component {
  state = {
    sortBy: 'date',
    comment: '',
  }

  sortComments = (comments, sortBy) => {
    return sortBy === "votes" ? sortByVotes(comments) : sortByDate(comments);
  }

  onSortChange = (sortBy) => {
    this.setState({ sortBy })
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  postComment = (e) => {
    const postId = this.props.match.params.id;
    const comment = {
      author: 'Anonymous',
      body: this.state.comment,
      parentId: postId,
    };

    this.props.addComment(comment);
    this.setState({
      comment: '',
    });
  }

  render() {
    const { comments } = this.props;

    return (
      <div style={styles.container}>
        <h3>Comments</h3>
        <div style={styles.addCommentContainer}>
          <Input.TextArea
            rows={4}
            placeholder={'Write a comment'}
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <Row type="flex" align="middle" justify="space-between">
            <Col>
              <Button
                type="primary"
                size="small"
                style={styles.postCommentBtn}
                onClick={this.postComment}
              >Post</Button>
            </Col>
            <Col>
              Supports <Link to="https://github.github.com/gfm/" target="_blank">
                Github Flavored Markdown
              </Link>
            </Col>
          </Row>
        </div>
        <Row type="flex" align="bottom">
          <Col span={12}><span>{comments.length} comments</span></Col>
          <Col span={12}>
            <SortBy align="right" size="small" onSortChange={this.onSortChange} />
          </Col>
        </Row>
        <hr />
        {comments.length > 0 &&
          <List
            itemLayout="vertical"
            size="small"
            dataSource={this.sortComments(comments, this.state.sortBy)}
            renderItem={comment => <Comment comment={comment} />}
          />
        }
      </div>
    )
  }
}

const styles = {
  container: {
    padding: 20,
    background: '#fff',
  },
  addCommentContainer: {
    marginTop: 15,
    marginBottom: 30,
  },
  postCommentBtn: {
    marginTop: 12,
  },
};

const mapDispatchToProps = dispatch => ({
  addComment: comment => dispatch(addComment(comment)),
})

export default connect(null, mapDispatchToProps)(withRouter(CommentsContainer));
