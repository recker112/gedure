//React
import React from "react";

//Material-UI
import { Hidden } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab';

//Componentes
import SwitchButton from "./SwitchButton";
import ShowComponentResponsive from "./ShowComponentResponsive";
import ListNoticias from "./ListNoticias";

function PageNews() {
	//Titulo
	document.title = "La Candelaria - News";
	
  return (
		<main className='Container Container--News'>
			<Skeleton width="100%" variant="rect" height="250px" 
				style={{marginBottom: '15px'}} />
			<ListNoticias />
		</main>
	);
}

export default PageNews;
