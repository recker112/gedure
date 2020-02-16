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
import ReloginVerify from '../../components/ReloginVerify';

function RenderNews({ Mmobile }) {
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
		<ReloginVerify>
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
		</ReloginVerify>
  );
}

const mapDispatchToProps = {
  Mmobile
};

export default connect(null, mapDispatchToProps)(RenderNews);
