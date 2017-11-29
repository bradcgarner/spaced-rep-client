import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/display.js'
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actionsDisplay from '../actions/display.js'
import * as actionsUsers from '../actions/users.js'

export class QuestionsPage extends React.Component {

  handleSignup(values) {
    console.log(values)
    const {username, password, firstName, lastName} = values;
    const user = {username, password, firstName, lastName}
    this.props.dispatch(actionsUsers.registerUser(user))
    console.log(user);
  }

  render() {
    return (
      <div className='login'>
        <p>QUESTIONS PAGE</p>
        <form onSubmit={this.props.handleSubmit(values => this.handleSignup(values))}>
          <Field component='input' type='text' name='firstName' id='firstName' placeholder='first name' required/>
          <Field component='input' type='text' name='lastName' id='lastName' placeholder='last name' required/>
          <Field component='input' type='text' name='username' id='username' placeholder='username' required/>
          <Field component='input' type='password' name='password' id='password' placeholder='password' required/>
          <button type='submit' className="Signup">Sign Up</button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  display: state.display,
  users: state.users
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'questions-page' })
)(QuestionsPage);