import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/display.js'
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actionsDisplay from '../actions/display.js'
import * as actionsUsers from '../actions/users.js'

export class QuestionsPage extends React.Component {

  handleSubmit(){
    console.log(value)
    // for signed in uses 
  }

  render() {
    return (
      <div className='login'>
        <p>What does {this.props.question} mean in English?</p>
        <form onSubmit={this.props.handleSubmit(values => this.handleSignup(values))}>
          <Field component='input' type='text' name='answer' id='answer' placeholder='answer' required/>
          <button type='submit' className="Signup">Submit</button>
        </form>
        <p>Create an account to save your progress</p>
        <p>Already have an account? Login here.</p>
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