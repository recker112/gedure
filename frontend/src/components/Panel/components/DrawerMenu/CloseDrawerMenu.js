import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ContentController } from '../../RenderPanel';


export function CloseDrawerMenu() {
  return (
    <ContentController.Consumer>
      {(contentData) => {
        const { changeToggleDrawer } = contentData;
        return (
          <Tooltip title="Cerrar menú" arrow>
            <IconButton onClick={changeToggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
        )
      }}
    </ContentController.Consumer>
  );
}