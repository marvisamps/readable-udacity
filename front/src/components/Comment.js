import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Row, Col, List, Button, Input } from 'antd';
import { deleteComment, editComment } from '../actions/comments';
import { calculateDate } from '../utils/helpers';
import Voter from '../components/Voter';

class Comment extends Component {
  state = {
    editMode: false,
    comment: this.props.comment.body || '',
  }

  handleEditComment = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  saveComment = (comment) => {
    comment = {
      ...comment,
      author: comment.author,
      body: this.state.comment,
      parentId: comment.parentId,
    };

    this.props.editComment(comment);
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  renderCommentDisplay = (comment) => {
    if (this.state.editMode) {
      return (
        <span>
          <Input.TextArea
            rows={2}
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
                onClick={() => this.saveComment(comment)}
              >Save</Button>
              <Button
                size="small"
                style={styles.postCommentBtn}
                onClick={this.handleEditComment}
              >Cancel</Button>
            </Col>
            <Col>
              Supports <Link to="https://github.github.com/gfm/" target="_blank">
                Github Flavored Markdown
              </Link>
            </Col>
          </Row>
        </span>
      )
    }

    return <ReactMarkdown source={comment.body} />;
  }

  render() {
    const { comment } = this.props;
    return (
      <List.Item
        key={comment.id}
        actions={[
          <Voter item={comment} />,
          <Button
            size="small"
            type="dashed"
            style={styles.actionText}
            onClick={this.handleEditComment}
          >
            Edit
          </Button>,
          <Button
            size="small"
            type="dashed"
            style={styles.actionText}
            onClick={() => this.props.deleteComment(comment)}
          >
            Delete
          </Button>,
        ]}
      >
        <List.Item.Meta
          description={
            <span>
              <Link to="#" style={styles.author}>{comment.author}</Link>
              <span style={styles.date}>{calculateDate(comment.timestamp)}</span>
            </span>
          }
        />
        {this.renderCommentDisplay(comment)}
      </List.Item>
    )
  }
}

const styles = {
  actionText: {
    border: 'none',
    color: "#666",
    fontSize: 12,
    fontWeight: 600,
  },
  author: {
    fontWeight: 600,
  },
  date: {
    marginLeft: 10,
    color: "#888",
  },
  addCommentContainer: {
    marginTop: 15,
    marginBottom: 30,
  },
  postCommentBtn: {
    marginTop: 12,
    marginRight: 12,
  },
}

const mapDispatchToProps = dispatch => ({
  deleteComment: comment => dispatch(deleteComment(comment)),
  editComment: comment => dispatch(editComment(comment)),
})

export default connect(null, mapDispatchToProps)(Comment);
