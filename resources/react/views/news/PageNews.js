//React
import React from "react";

//Material-UI
import { Hidden } from "@material-ui/core";

//Componentes
import SwitchButton from "./SwitchButton";
import ShowComponentResponsive from "./ShowComponentResponsive";

function PageNews() {
	//Titulo
	document.title = "La Candelaria - News";
	
  return (
		<div className="BoxPageNews">
			<main>
				{/* Ocultar SwitchNews hasta que la pantalla entre en modo
				celular. */}
				<Hidden mdUp>
					<SwitchButton />
				</Hidden>
				<ShowComponentResponsive />
			</main>
		</div>
	);
}

export default PageNews;
