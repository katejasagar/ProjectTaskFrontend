import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import Projects from './Components/Projects';
import Project from './Components/Project';
import Task from './Components/Task';


const App = () => {
  return (
   <BrowserRouter>
    <Switch>
      <Route exact path = '/' />
      <Route exact path='/projects' component={Projects} /> 
      <Route exact path='/projects/:pid' component={Project}/>
      
    </Switch>
   </BrowserRouter>
  );
}

export default App;
