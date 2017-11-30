import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/display.js'
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actionsDisplay from '../actions/display.js'
import * as actionsUsers from '../actions/users.js'

export class QuestionsPage extends React.Component {

  answerQuestions(value){
    console.log(value.answer)
    this.props.dispatch(actionsUsers.answerQuestions(value.answer, this.props.users.questions, this.props.users.questionHead))
    this.props.reset()
  }

  render() {
    return (
      <div className='login'>
        <p>What does {this.props.users.questions[this.props.users.questionHead].brit} mean in English?</p>
        <p>{this.props.users.questions[this.props.users.questionHead].us}</p>
        <form onSubmit={this.props.handleSubmit(value => this.answerQuestions(value))}>
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