import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageIndex from './index/PageIndex';
import PageNews from './news/PageNews';
import PagePanel from './panel/PagePanel';
import { useSnackbar } from "notistack";

function Routers() {
  //Crear un SnackBar
  const { enqueueSnackbar } = useSnackbar();

  return (
    /* Switch sirve para escojer la ruta la que mas se acerque a la
    ruta actual, es decir, que de todas esas rutas, la app escogerรก
    la que mรกs se asemeje, excepto si se coloca el atributo "exact" */
    <Switch>
	{/* <span onClick={()=>enqueueSnackbar("SOY UNA PRUEBA", {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            variant: 'success',
          })}>SNAKBAR</span> */}
      <Route exact path="/" component={PageIndex} />
      <Route exact path="/login" component={PageIndex} />
      <Route exact path="/news" component={PageNews} />
      <Route exact path="/panel" component={PagePanel} />
      <Route>No se ha encontrado una ruta.</Route>
    </Switch>
  )
}

export default Routers;