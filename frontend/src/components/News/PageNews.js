import React, { useState, useEffect } from 'react'
import { Grow, Hidden, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Componentes
import HeaderNoPanel from '../reutilizar/HeaderNoPanel'
import { SwitchButton } from './components/SwitchButton';
import { ShowComponentResponsive } from './components/ShowComponentResponsive';

export default function PageNews() {
  const theme = useTheme();
  const [SwitchOption, setSwitchOption] = useState('noticias');
  const resolution = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    document.title = "La Candelaria - News";
  }, []);
  
  return (
    <div className="BoxPageNews">
      <HeaderNoPanel />
      <Grow in={true}>
        <main>
          {/* Ocultar SwitchNews hasta que la pantalla entre en modo
          celular. */}
          <Hidden smUp>
            <SwitchButton setestado={setSwitchOption} />
          </Hidden>
          <ShowComponentResponsive options={{SwitchOption, resolution}} />
        </main>
      </Grow>
    </div>
  )
}

