import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Divider, Tooltip } from '@material-ui/core';

export function RenderButton(props) {
  const { title, 
    content, 
    text, 
    redirect, 
    changeContent, 
    changeToggleDrawer } = props.options;
  
  //Regresar boton de MOBIL, es decir, con el tooltip.
  return (
    <Tooltip title={
      <React.Fragment>
        <span className="ToolTipDrawerMenu-Title">{title}</span>
        <Divider />
        <span className="ToolTipDrawerMenu-Content">{content}</span>
      </React.Fragment>
      } 
      placement="right" 
      interactive 
      arrow
    >
    <ListItem button key={text} onClick={() => {
      changeContent(redirect);
      changeToggleDrawer();
    }}>
      <ListItemIcon>
        {props.children}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </Tooltip>);
}
