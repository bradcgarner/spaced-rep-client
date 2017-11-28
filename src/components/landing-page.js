import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/display.js'
import {Link} from 'react-router-dom';


export class LandingPage extends React.Component {

handleSignup(){
  this.props.dispatch(actions.goToSignup())
  console.log('im working')
}

  render() {
    return (
      <div>
        <p>This is a British to U.S. learning application. Click "Get Started" below to begin!</p>
        <button>Get Started</button>
        <ul>
          <li>
          <Link to="/signup" onClick={() => this.handleSignup()}>Sign Up</Link>
           </li>
          <li>
            Login
          </li>
        </ul>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  view: state.view
});

export default connect(mapStateToProps)(LandingPage);