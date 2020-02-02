import React from 'react';
import { ListNoticias } from './ListNoticias';
import { ListAnuncios } from './ListAnuncios';

export function ShowComponentResponsive(props) {
  return (<div className="container">
    {/* Verificar matches para saber si la pantalla está
    mas pequeña de lo recomendable y realizar el cambio.
    False = No recomendable.
    True = Recompendable. */}
    {props.options.resolution ? (<React.Fragment>
      <ListNoticias />
      <ListAnuncios />
    </React.Fragment>) :
      /* Verificar el estado del switchNews de la app, para
      saber cual componente se debe mostrar. */
      props.options.SwitchOption === "noticias" ? (
      <ListNoticias styles={{marginTop: "0px"}} />
      )
        :
        (
        <ListAnuncios />
      )}
  </div>);
}
