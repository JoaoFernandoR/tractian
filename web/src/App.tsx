import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
// pages
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Home} exact={true}/>
      <Route path='/cadastro' component={Cadastro} exact={true}/>
      <Redirect to="/" />
    </Switch>    
  </BrowserRouter>
  );
}

export default App;
