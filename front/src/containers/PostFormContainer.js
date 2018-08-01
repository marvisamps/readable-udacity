import uuid from 'uuid';
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Row, Col, Form, Input, Button, Select } from 'antd';
import { fetchCategories } from '../actions/categories';
import { addPost, editPost } from '../actions/posts';
import { capitalize } from '../utils/helpers';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';

class PostFormContainer extends Component {
  constructor(props) {
    super(props);
    const { location } = props;
    const post = location.state ? location.state.post : null;

    this.state = {
      editMode: location.pathname === '/edit',
      redirect: false,
      id: post ? post.id : uuid.v4(),
      title: post ? post.title : '',
      author: post ? post.author : '',
      category: post ? post.category : '',
      body: post ? post.body : '',
    }
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleInputChange = (e, input) => {
    this.setState({
      [input]: e.target ? e.target.value : e,
    });
  }

  handleSubmit = () => {
    const post = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      category: this.state.category,
      body: this.state.body,
    };

    if (this.state.editMode) {
      this.props.editPost(post)
        .then(() => this.setState({
          redirect: !this.state.redirect,
        }));
    } else {
      this.props.addPost(post)
        .then(() => this.setState({
          redirect: !this.state.redirect,
        }));
    }
  }

  renderLabel = () => {
    return (
      <Row type="flex" align="bottom" justify="space-between">
        <Col>Tell us what's up...</Col>
        <Col style={styles.subtext}>
          Supports <Link to="https://github.github.com/gfm/" target="_blank">
            Github Flavored Markdown
          </Link>
        </Col>
      </Row>
    )
  }

  render() {
    const { categories } = this.props;
    const { category, id } = this.state;

    if (this.state.redirect) {
      return <Redirect to={`/${category}/${id}`} />
    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Layout.Header style={styles.layoutHeader}>
            <Breadcrumb category={this.state.editMode ? 'Edit Post' : 'New Post'} />
          </Layout.Header>
          <Layout.Content style={styles.layoutContent}>
            <Form layout="vertical" style={styles.form}>
              <Form.Item label="Title">
                <Input value={this.state.title} onChange={(e) => this.handleInputChange(e, "title")} />
              </Form.Item>
              <Form.Item label="Username">
                <Input value={this.state.author} onChange={(e) => this.handleInputChange(e, "author")}/>
              </Form.Item>
              <Form.Item label="Category">
                <Select
                  size="small"
                  value={this.state.category}
                  onChange={(e) => this.handleInputChange(e, "category")}
                >
                  {categories.length > 0 && categories.map((category, key) => (
                    <Select.Option key={category.name} value={category.name}>
                      {capitalize(category.name)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label={this.renderLabel()}>
                <Input.TextArea
                  rows={10}
                  value={this.state.body}
                  onChange={(e) => this.handleInputChange(e, "body")}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={styles.button}
                  onClick={this.handleSubmit}
                >
                  {this.state.editMode ? 'Save' : 'Publish'}
                </Button>
                <Link to="/">
                  <Button style={styles.button}>Cancel</Button>
                </Link>
              </Form.Item>
            </Form>
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
  form: {
    // maxWidth: 500,
    marginTop: 20,
    paddingLeft: 5,
  },
  icon: {
    color: 'rgba(0,0,0,.25)',
  },
  button: {
    marginTop: 10,
    marginRight: 18,
  },
  subtext: {
    fontSize: 10,
    fontWeight: 400,
  }
}

const mapStateToProps = ({ categories }) => ({
  categories,
})

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  editPost: post => dispatch(editPost(post)),
  fetchCategories: () => dispatch(fetchCategories()),
})

const NewPostForm = Form.create()(PostFormContainer);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewPostForm));
