import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageIndex from './index/PageIndex';
import PageNews from './news/PageNews';
// import PagePanel from './Panel/PagePanel';

function Routers() {
  return (
    /* Switch sirve para escojer la ruta la que mas se acerque a la
    ruta actual, es decir, que de todas esas rutas, la app escogerá
    la que más se asemeje, excepto si se coloca el atributo "exact" */
    <Switch>
      <Route exact path="/" component={PageIndex} />
      <Route exact path="/login" component={PageIndex} />
      <Route exact path="/news" component={PageNews} />
      {/* <Route exact path="/panel" component={PagePanel} /> */}
      <Route>No se ha encontrado una ruta.</Route>
    </Switch>
  )
}

export default Routers;