//React
import React from 'react';

//Componentes
import ListNoticias from './ListNoticias';
import ListAnuncios from './ListAnuncios';

//redux
import { connect } from 'react-redux';

function ShowComponentResponsive({content, mobile}) {
  return (<div className="container">
    {/* Verificar matches para saber si la pantalla está
    mas pequeña de lo recomendable y realizar el cambio.
    False = No recomendable.
    True = Recompendable. */}
    {!mobile ? (<React.Fragment>
      <ListNoticias />
      <ListAnuncios />
    </React.Fragment>) :
      /* Verificar el estado del switchNews de la app, para
      saber cual componente se debe mostrar. */
      content === 'noticias' ? (
      <ListNoticias styles={{marginTop: "0px"}} />
      )
        :
        (
        <ListAnuncios />
      )}
  </div>);
}

const mapStateToProps = (state) => ({
  content: state.news.content,
  mobile: state.settings.mobile,
})


export default connect(mapStateToProps)(ShowComponentResponsive);