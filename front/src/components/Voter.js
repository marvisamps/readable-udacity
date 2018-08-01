import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { votePost, votePostDetail } from '../actions/posts';
import { voteComment } from '../actions/comments';

class Voter extends Component {
  upVote = () => {
    const { item, single } = this.props;
    const isPost = 'commentCount' in item;
    if (isPost) {
      if (single)
        this.props.votePostDetail(item.id, 'upVote');
      else
        this.props.votePost(item.id, 'upVote');
    } else {
      this.props.voteComment(item.id, 'upVote');
    }
  }

  downVote = () => {
    const { item, single } = this.props;
    const isPost = 'commentCount' in item;
    if (isPost) {
      if (single)
        this.props.votePostDetail(item.id, 'downVote');
      else
        this.props.votePost(item.id, 'downVote');
    } else {
      this.props.voteComment(item.id, 'downVote');
    }
  }

  render() {
    const { item } = this.props;
    const votes = item.voteScore;
    return (
      <span>
        <Button
          type="dashed"
          size="small"
          icon="like-o"
          style={styles.icon}
          onClick={() => this.upVote()}
        />
        <Button
          type="dashed"
          size="small"
          icon="dislike-o"
          style={styles.icon}
          onClick={() => this.downVote()}
        />
        <span style={(votes < 0) ? styles.negVotes : styles.posVotes}>
          {votes}
        </span>
      </span>
    )
  }
}

const styles = {
  icon: {
    border: 'none',
    marginRight: 12,
    padding: 0,
  },
  posVotes: {
    marginRight: 8,
    fontWeight: 600,
    color: "#64b95f",
  },
  negVotes: {
    marginRight: 8,
    fontWeight: 600,
    color: "#e34b4b",
  },
}

const mapDispatchToProps = dispatch => ({
  votePost: (id, option) => dispatch(votePost(id, option)),
  votePostDetail: (id, option) => dispatch(votePostDetail(id, option)),
  voteComment: (id, option) => dispatch(voteComment(id, option)),
})

export default connect(null, mapDispatchToProps)(Voter);
