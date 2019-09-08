import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './components/landing-page'
import SignupPage from './components/signup-page'
import LoginPage from './components/login-page'
import QuestionsPage from './components/questions-page'


export default function Layout() {
  return (
    <Router>
      <main className="main">
        <Route exact path="/" component={LandingPage}/>
        <Route path="/signup" component={SignupPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/questions" component={QuestionsPage}/>
      </main>
    </Router>
  )
}


