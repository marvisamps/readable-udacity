import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Row, Col } from 'antd';
import CommentsContainer from '../containers/CommentsContainer';
import Voter from '../components/Voter';
import { capitalize, calculateDate } from '../utils/helpers';

class PostDetail extends Component {
  render() {
    const { post, comments } = this.props;
    return (
      <div>
        <div style={styles.postDetailContainer}>
          <Row>
            <Col span={18} style={styles.title}>
              {post.title}
            </Col>
            <Col span={6} style={styles.votes}>
              <Voter item={post} single />
            </Col>
          </Row>
          <div style={styles.meta}>
            {calculateDate(post.timestamp)} &middot;
            Submitted by <Link to="#">{post.author}</Link> in&nbsp;
            <Link to={`/${post.category}`}>{capitalize(post.category)}</Link>
          </div>
          <hr />
          <div style={styles.content}>
            <ReactMarkdown source={post.body} />
          </div>
        </div>
        <CommentsContainer comments={comments} />
      </div>
    )
  }
}

const styles = {
  postDetailContainer: {
    marginBottom: 15,
    padding: 20,
    background: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  votes: {
    fontSize: 18,
    textAlign: 'right',
  },
  meta: {
    marginTop: 8,
    fontSize: 15,
    color: '#00000073',
  },
  content: {
    marginTop: 20,
    fontSize: 16,
  },
}

export default PostDetail;
