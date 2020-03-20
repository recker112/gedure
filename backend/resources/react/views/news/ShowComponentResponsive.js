//React
import React from 'react';

//Material-UI
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

//Componentes
import ListNoticias from './ListNoticias';
import ListAnuncios from './ListAnuncios';

//redux
import { connect } from 'react-redux';

function ShowComponentResponsive({ content }) {
	//SwitchButton modo responsive.
  const theme = useTheme();
  //True si la resoluciรณn es mayor a sm.
  const resolution = useMediaQuery(theme.breakpoints.up("md"));
	
	return (
		<div className="container">
			{/* Verificar matches para saber si la pantalla está
    mas pequeña de lo recomendable y realizar el cambio.
    False = No recomendable.
    True = Recompendable. */}
			{resolution ? (
				<React.Fragment>
					<ListNoticias />
					<ListAnuncios />
				</React.Fragment>
			) : /* Verificar el estado del switchNews de la app, para
      saber cual componente se debe mostrar. */
			content === 'noticias' ? (
				<ListNoticias styles={{ marginTop: '0px' }} />
			) : (
				<ListAnuncios />
			)}
		</div>
	);
}

const mapStateToProps = state => ({
	content: state.news.content
});

export default connect(mapStateToProps)(ShowComponentResponsive);