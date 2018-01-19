import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../actions/display'
import * as actionsUser from '../actions/users'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';


export class LandingPage extends React.Component {

getStarted(){
    // this.props.dispatch(actionsUser.fetchAndSaveQuestions())
    // .then(() => this.props.history.push('/questions'))
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
    const getStartedLabel = this.props.users.username === 'Satan' ? 'Click "Get Started" below to begin!' : '' ;
    const getStartedButton = this.props.users.username === 'Satan' ? <button className="mainButton" onClick={() => this.getStarted()}>Get Started</button> : '' ;
    return (
      <article className="landing-page">
        <h1 className="title">Across The Pond</h1>
        <h3 className="subTitle">This is a British to U.S. learning application. {getStartedLabel}</h3>
        <div className="landingButtonContainer">
          {getStartedButton}
          <ul>
            <li>
              <Link className="signUpButton" to="/signup" onClick={() => this.handleSignup()}>Sign Up</Link>
            </li>
            <li></li>
            <li>
              <Link className="logInButton" to="/login" onClick={() => this.handleLogin()}>Log In</Link>
            </li>
          </ul>
        </div>
      </article>
    )
  }

}

const mapStateToProps = state => ({
  display: state.display,
  users: state.users
});

export default connect(mapStateToProps)(LandingPage);