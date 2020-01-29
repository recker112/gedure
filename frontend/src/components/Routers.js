import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageIndex from './Index/PageIndex';
import PageLogin from './Login/PageLogin';


class Routers extends Component {
  render(){
    return(
      <Switch>
        <Route exact path="/" component={PageIndex} />
        <Route path="/login" component={PageLogin}/>
        <Route>No se ha encontrado una ruta.</Route>
      </Switch>
    )
  }
}

export default Routers