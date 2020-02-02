import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ContentController } from '../RenderPanel';

function MenuButtonOpen() {
  return (
  <ContentController.Consumer>
    {(contentData)=> {
      const { changeToggleDrawer } = contentData;
      return (
        <Tooltip title='Mostrar menú' arrow>
          <IconButton onClick={changeToggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      )
    }}
  </ContentController.Consumer>
  );
}

export default MenuButtonOpen;