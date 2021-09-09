import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import Header from './header/header'
import Home from './main/Home'
import ShowPaste from './main/ShowPaste'
import List from './main/List'

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";



 ReactDOM.render(
    <React.StrictMode>
      <Header />
      <Router>
            <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='/list'>
                <List />
            </Route>
            <Route path='/:hash'>
                <ShowPaste />
            </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );