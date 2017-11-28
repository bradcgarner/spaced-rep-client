import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/users.js'


export class LandingPage extends React.Component {

  render() {
    return (
      <div>
        <p>This is a British to U.S. learning application. Click "Get Started" below to begin!</p>
        <button>Get Started</button>
        <ul>
          <li>
            Sign Up
           </li>
          <li>
            Login
          </li>
        </ul>
      </div>
    )
  }

}

// const mapStateToProps = state => ({
// });

export default connect()(LandingPage);