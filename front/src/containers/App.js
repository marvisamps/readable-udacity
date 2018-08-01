import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';
import PostFormContainer from '../containers/PostFormContainer';
import PostDetailContainer from '../containers/PostDetailContainer';
import NotFound from '../components/NotFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/oops" component={NotFound} />
          <Route exact path='/' component={PostContainer} />
          <Route exact path='/new' component={PostFormContainer} />
          <Route exact path='/edit' component={PostFormContainer} />
          <Route exact path='/:category' component={PostContainer} />
          <Route exact path='/:category/:id' component={PostDetailContainer} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
