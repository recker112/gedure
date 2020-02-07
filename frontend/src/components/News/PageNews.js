//React
import React, { useEffect } from 'react'

//Material-UI
import { Grow, Hidden, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Redux
import { connect } from 'react-redux';
import Mmobile from '../store/action/mobile';

//Componentes
import HeaderNoPanel from '../reutilizar/HeaderNoPanel'
import SwitchButton from './components/SwitchButton';
import ShowComponentResponsive from './components/ShowComponentResponsive';

function PageNews({Mmobile}) {

  //SwitchButton modo responsive.
  const theme = useTheme();
  //True si la resolución es mayor a sm.
  const resolution = useMediaQuery(theme.breakpoints.up('sm'));
  //Cambiar setting
  Mmobile(!resolution);

  useEffect(() => {
    document.title = "La Candelaria - News";

    //Al desmontar
    return () => {
      Mmobile(false);
    }
  });
  
  return (
    <div className="BoxPageNews">
      <HeaderNoPanel />
      <Grow in={true}>
        <main>
          {/* Ocultar SwitchNews hasta que la pantalla entre en modo
          celular. */}
          <Hidden smUp>
            <SwitchButton />
          </Hidden>
          <ShowComponentResponsive />
        </main>
      </Grow>
    </div>
  )
}

const mapDispatchToProps = {
  Mmobile,
}

export default connect(null,mapDispatchToProps)(PageNews);