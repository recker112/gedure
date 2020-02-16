import React from 'react';
import { ShowContentButton } from './Buttons/ShowContentButton';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export function BarListButton(props) {
  const { title, content, text, redirect } = props.options;
  //NO LLAMAR AL CONTEXTO PARA SABER EL TAMAÑO DELA PANTALLA
  //OCACIONA UN BUCLE E IRRUMPE EN EL CICLO DE VIDA.
  //Preferiblemente es mejor llamarlo directamente desde el archivo.

  //Controlar la resolución para evitar los tooltips.
  const theme = useTheme();
  const resolution = useMediaQuery(theme.breakpoints.up('sm'));
  //True = resolución es adecuada; False = NEL.

  if (resolution) {
    /* De esta manera funcionan los children, añade al return el
      contenido que se secuentra dentro. */
    return (
      <ShowContentButton options={{title, content, text, redirect}} 
      >
        {props.children}
      </ShowContentButton>
    );
  }else {
    return (
      <ShowContentButton options={{text, redirect}}>
        {props.children}
      </ShowContentButton>
    );
  }
}