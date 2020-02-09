import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Divider, Tooltip } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import toggleDrawer from '../../../../store/action/panel/toggleDrawer';
import updatePanelContent from '../../../../store/action/panel/updatePanelContent';

function RenderButton({
  options, 
  toggleDrawer, 
  updatePanelContent,
  children
}) {
  const { title, 
    content, 
    text, 
    redirect } = options;
  
  //Regresar boton de MOBIL, es decir, con el tooltip.
  return (
    <Tooltip title={
      <React.Fragment>
        <span className="ToolTipDrawerMenu-Title">{title}</span>
        <Divider />
        <span className="ToolTipDrawerMenu-Content">{content}</span>
      </React.Fragment>
      } 
      enterDelay={500} 
      leaveDelay={200}
      placement="right" 
      interactive 
      arrow
    >
    <ListItem button key={text} onClick={() => {
      updatePanelContent(redirect);
      toggleDrawer();
    }}>
      <ListItemIcon>
        {children}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </Tooltip>);
}

const mapDispatchToProps = {
  toggleDrawer,
  updatePanelContent
}

export default connect(null,mapDispatchToProps)(RenderButton);