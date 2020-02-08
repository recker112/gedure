import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import updatePanelContent from '../../../../store/action/panel/updatePanelContent';
import toggleDrawer from '../../../../store/action/panel/toggleDrawer';

export function RenderMobileButton({
  options, 
  children,
  updatePanelContent,
  toggleDrawer
}) {
  //Regresar boton de MOBIL, es decir, sin el tooltip.
  const { redirect, text } = options;
  return (<ListItem button key={text} onClick={() => {
    updatePanelContent(redirect);
    toggleDrawer();
  }}>
    <ListItemIcon>
      {children}
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>);
}

const mapDispatchToProps = {
  updatePanelContent,
  toggleDrawer
}

export default connect(null,mapDispatchToProps)(RenderMobileButton);
