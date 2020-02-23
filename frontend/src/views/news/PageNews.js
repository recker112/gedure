//React
import React from "react";

//Material-UI
import { Hidden } from "@material-ui/core";

//Componentes
import SwitchButton from "./SwitchButton";
import ShowComponentResponsive from "./ShowComponentResponsive";
import RedirectVerify from '../../components/RedirectVerify';

function PageNews({ Mmobile }) {
	//Titulo
	document.title = "La Candelaria - News";
  return (
		<RedirectVerify>
			<RenderNews />
		</RedirectVerify>
  );
}

//Separado para poder renderizar las noticias en
//el panel
export function RenderNews(){
	return (
		<div className="BoxPageNews">
			<main>
				{/* Ocultar SwitchNews hasta que la pantalla entre en modo
				celular. */}
				<Hidden smUp>
					<SwitchButton />
				</Hidden>
				<ShowComponentResponsive />
			</main>
		</div>
	)
}

export default PageNews;
