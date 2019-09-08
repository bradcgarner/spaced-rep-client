import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actionsDisplay from '../actions/display'
import * as actionsUsers from '../actions/users.js'
import * as actionsQuestion from '../actions/question'

export class QuestionsPage extends React.Component {

  answerQuestion(value) {
    if (this.props.question.answered) {
      this.props.dispatch(actionsQuestion.loadQuestion(
        this.props.question.questionHeadNext,
        this.props.question.questionNext
      ));
      this.props.reset()
    } else {
      this.props.dispatch(actionsUsers.answerQuestion(
        this.props.users.id,
        this.props.users.authToken,
        value.answer.toLowerCase(),
        this.props.question.question,
        this.props.question.questionHead));
    }
  };

  render() {
    const brit = this.props.question.question.brit || ''
    const us = this.props.question.question.us || ''
    const buttonLabel = this.props.question.answered ? 'Next' : 'Submit';
    const theAnswer = this.props.question.answered ? this.props.question.questionScored.us : '';
    const score = this.props.question.answered ? this.props.question.questionScored.score : this.props.question.question.score;

    let information;
    if (this.props.users.username === "testing123") {
      information =
        <div>
          <p>CURRENT: Answered = {this.props.question.answered}</p>
          <table>
            <tr>
              <th> </th>
              <th>Brit</th>
              <th>US</th>
              <th>Score</th>
              <th>Index</th>
              <th>Next Index</th>
            </tr>
            <tr>
              <td>Current</td>
              <td>{brit}</td>
              <td>{us}</td>
              <td>{score}</td>
              <td>{this.props.question.questionHead}</td>
              <td>{this.props.question.question.nextIndex}</td>
            </tr>
            <tr>
              <td>Next</td>
              <td>{this.props.question.questionNext.brit}</td>
              <td>{this.props.question.questionNext.us}</td>
              <td>{this.props.question.questionNext.score}</td>
              <td>{this.props.question.questionHeadNext}</td>
              <td>{this.props.question.questionNext.nextIndex}</td>
            </tr>
          </table>
        </div>
    } else {
      information = '';
    }

    let guestMessage;
    if (!this.props.users.loggedIn) {
      guestMessage = <div>
        <p>Create an account to save your progress</p>
        <p>Already have an account? Login here.</p>
      </div>
    } else {
      guestMessage = '';
    }

    let answer;
    let rightOrWrong;
    const answerCorrectClass = this.props.users.right ? 'correct' : 'incorrect' ;
    const answerClass = `answer ${answerCorrectClass}`;
    
    if (this.props.question.answered) {
      answer = <p className={answerClass}>Answer = {theAnswer}</p>
      if (this.props.users.right) {
        rightOrWrong = <p>Correct!</p>
      }
      else {
        rightOrWrong = <p>Wrong!</p>
      }
    }

    return (
      <article className='question-page'>
        <div className="questionContainer">
          <p className="question">What does <span className="keyword">{brit}</span> mean in English?</p>
        </div>
        <div className="answerContainer">
          {rightOrWrong}
          {answer}
        </div>
        <form className="questionForm" onSubmit={this.props.handleSubmit(value => this.answerQuestion(value))}>
          <Field component='input' type='text' name='answer' id='answer' placeholder='answer' required/>
          <button type='submit' className="mainButton">{buttonLabel}</button>
        </form>
        {guestMessage}
       {information}
       <p className="score">Score</p>
       <p className="scoreNumber">{this.props.users.totalScore}</p>

      </article>
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

