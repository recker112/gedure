import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export function RenderMobileButton(props) {
  //Regresar boton de MOBIL, es decir, sin el tooltip.
  const { redirect, text, changeContent } = props.options;
  return (<ListItem button key={text} onClick={() => changeContent(redirect)}>
    <ListItemIcon>

      {props.children}
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>);
}
