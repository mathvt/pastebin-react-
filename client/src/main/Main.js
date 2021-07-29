import React from 'react';
import Home from './Home'
import ShowPaste from './ShowPaste'
import List from './List'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


function Main(){
    return(
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
    )
}

export default Main



