import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actionsDisplay from '../actions/display.js'
import * as actionsUsers from '../actions/users.js'

export class LoginPage extends React.Component {

  handleLogin(values) {
    const {username, password} = values;
    const user = {username, password}
    this.props.dispatch(actionsUsers.login(user))
    .then(()=>{
      if ( this.props.display.view === 'questionsPage') {
        this.props.history.push('/questions');      
      }
    });
  }

  render() {
    return (
      <article className='login-page'>
        <h1 className="title">Across The Pond</h1>
        <h3 className="subTitle">Log In</h3>
        <form className="loginForm" onSubmit={this.props.handleSubmit(values => this.handleLogin(values))}>
          <Field component='input' type='text' name='username' id='username' placeholder='username' required/>
          <Field component='input' type='password' name='password' id='password' placeholder='password' required/>
          <button type='submit' className="mainButton">Log In</button>
        </form>
        <h4 className="demo-login">Demo Login</h4>
        <p className="demo-username">username: <i>guestuser</i></p> <p className="demo-password">password: <i>guestuser</i></p>
      </article>
    )
  }
}

const mapStateToProps = state => ({
  display: state.display,
  users: state.users
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'login-page' })
)(LoginPage);