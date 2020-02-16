//React
import React, { useEffect } from "react";

//Material-UI
import { Hidden, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

//Redux
import { connect } from "react-redux";
import Mmobile from "../../actions/settings/mobile";

//Componentes
import SwitchButton from "./SwitchButton";
import ShowComponentResponsive from "./ShowComponentResponsive";
import RedirectVerify from '../../components/RedirectVerify';

function PageNews({ Mmobile }) {
	//Titulo
	document.title = "La Candelaria - News";
	
  //SwitchButton modo responsive.
  const theme = useTheme();
  //True si la resoluciรณn es mayor a sm.
  const resolution = useMediaQuery(theme.breakpoints.up("sm"));
  //Cambiar setting

  useEffect(() => {
    Mmobile(!resolution);
    //Al desmontar
    return () => {
      Mmobile(false);
    };
  });

  return (
		<RedirectVerify>
			<RenderNews />
		</RedirectVerify>
  );
}

const mapDispatchToProps = {
  Mmobile
};

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

export default connect(null, mapDispatchToProps)(PageNews);
