//React
import React from "react";

//Material-UI
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';

//Componentes
import ListNoticias from "./ListNoticias";
import ListAnuncios from './ListAnuncios';

function PageNews() {
	//Titulo
	document.title = "La Candelaria - News";
	
	//Resolution RESPONSIVE
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	const classMobile = fullScreen ? 'Container--Mobile' : '';
	
  return (
		<main className={`Container ${classMobile}`}>
			<ListAnuncios />
			<ListNoticias />
		</main>
	);
}

export default PageNews;
