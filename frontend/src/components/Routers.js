import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageIndex from './Index/PageIndex';
import PageNews from './News/PageNews';
import PagePanel from './Panel/PagePanel';


class Routers extends Component {
  render(){
    return(
      /* Switch sirve para escojer la runa la que mas se acerque a la
      ruta actual, es decir, que de todas esas rutas, la app escogerá
      la que más se asemeje, excepto si se coloca el atributo "exact" */
      <Switch>
        <Route exact path="/" component={PageIndex} />
        <Route exact path="/login" component={PageIndex} />
        <Route eact path="/news" component={PageNews} />
        <Route eact path="/panel" component={PagePanel} />
        <Route>No se ha encontrado una ruta.</Route>
      </Switch>
    )
  }
}

export default Routers;