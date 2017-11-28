import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/display.js'
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actionsDisplay from '../actions/display.js'
import * as actionsUsers from '../actions/users.js'

export class LoginPage extends React.Component {

  handleLogin(values) {
    console.log(values)
    const {username, password} = values;
    const user = {username, password}
    this.props.dispatch(actionsUsers.login(user))
    console.log('user to log in',user);
  }

  render() {
    return (
      <div className='login'>
        <form onSubmit={this.props.handleSubmit(values => this.handleLogin(values))}>
          <Field component='input' type='text' name='username' id='username' placeholder='username' required/>
          <Field component='input' type='password' name='password' id='password' placeholder='password' required/>
          <button type='submit' className="login">Log In</button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  view: state.view
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'login-page' })
)(LoginPage);