import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import toggleDrawer from '../../../../actions/panel/toggleDrawer';
import updatePanelContent from '../../../../actions/panel/updatePanelContent';

function RenderMobileButton({
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
