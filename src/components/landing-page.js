import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../actions/display'
import * as actionsUser from '../actions/users'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';


export class LandingPage extends React.Component {

getStarted(){
    this.props.dispatch(actionsUser.fetchAndSaveQuestions())
    .then(() => this.props.history.push('/questions'))
}

handleSignup(){
  this.props.dispatch(actionsDisplay.goToSignup())
  console.log('im working')
}

handleLogin(){
  this.props.dispatch(actionsDisplay.goToLogin())
  console.log('im loggin in')
}

  render() {
    return (
      <div>
        <p>This is a British to U.S. learning application. Click "Get Started" below to begin!</p>
        <button onClick={() => this.getStarted()}>Get Started</button>
        <ul>
          <li>
          <Link to="/signup" onClick={() => this.handleSignup()}>Sign Up</Link>
           </li>
          <li>
          <Link to="/login" onClick={() => this.handleLogin()}>Log In</Link>
          </li>
        </ul>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  display: state.display,
  users: state.users
});

export default connect(mapStateToProps)(LandingPage);