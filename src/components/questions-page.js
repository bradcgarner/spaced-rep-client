import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actionsDisplay from '../actions/display'
import * as actionsUsers from '../actions/users.js'
// import * as actionsQuestion from '../actions/question'

export class QuestionsPage extends React.Component {

  answerQuestions(value){
    console.log(value.answer)
    this.props.dispatch(actionsUsers.answerQuestion(
      this.props.users.id, 
      this.props.users.authToken,
      value.answer, 
      this.props.question.question, 
      this.props.question.questionHead));
    this.props.reset()
  };


  render() {
    console.log('this.props.question',this.props.question)
    const brit = this.props.question.question.brit || ''
    const us = this.props.question.question.us || ''
    return (
      <div className='login'>
        <p>What does {brit} mean in English?</p>
        <p>{us}</p>
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
  users: state.users,
  question: state.question
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'questions-page' })
)(QuestionsPage);