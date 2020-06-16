//React
import React from "react";

//Material-UI
import { Hidden } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab';

//Componentes
import ListNoticias from "./ListNoticias";
import ListAnuncios from './ListAnuncios';

function PageNews() {
	//Titulo
	document.title = "La Candelaria - News";
	
  return (
		<main className='Container Container--News'>
			<ListAnuncios />
			<ListNoticias />
		</main>
	);
}

export default PageNews;
