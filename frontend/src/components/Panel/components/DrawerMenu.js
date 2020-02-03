import React from 'react';
import { Drawer } from '@material-ui/core';

//Componentes
import { ContentController } from '../RenderPanel';
import { ContentBarList } from './DrawerMenu/ContentBarList';

//Iconos
import HistoryIcon from '@material-ui/icons/History';

export default function DrawerMenu() {
  return (
    //Usar el controlador del contenido para cambiar
    //el estado del drawerMenu.
    <ContentController.Consumer>
      {(contentData) => {
        const { toggleDrawe, changeToggleDrawer } = contentData;
        return (
          <Drawer 
            open={toggleDrawe} 
            onClose={changeToggleDrawer}
          >
            {/* Ejemplo claro de como se renderiza el children */}
            <ContentBarList options={{
              title: 'Registros',
              content: `Sirve para poder ver todos los movimientos<br />
              realizados en la aplicación, desde inicios
              de sesión hasta movimientos en la matrícula.`,
              text: 'Registros',
              redirect: 'registros'
            }}>
              <HistoryIcon />
            </ContentBarList>
          </Drawer>
        )
      }}
    </ContentController.Consumer>
  )
}