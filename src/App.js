import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as actionsUser from './actions/users'
import { connect} from 'react-redux';

class App extends Component {

  // displayUsers () {
  //   this.props.dispatch(actionsUser.getAllUsers());
  // }
  
  componentDidMount(){
    this.props.dispatch(actionsUser.testLoadAllUsers())
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps)(App);
