import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from './components/landing-page.js'
import {BrowserRouter as Router, Route} from 'react-router-dom';


export default function Layout() {
  return (
    <Router>
      <div className="router">
        <Route path="/" component={LandingPage}/>
      </div>
    </Router>
  )
}


