import React from 'react';
import { ContentController } from '../../RenderPanel';
import { ShowContentButton } from './Buttons/ShowContentButton';

export function BarListButton(props) {
  const { title, content, text, redirect } = props.options;
  //Llama al contexto para poder saber el estado actual de la
  //resolución y cambiar el estado de este componente
  return (<ContentController.Consumer>
    {(contentData) => {
      const { resolution } = contentData;
      //Se compara para ver si la resolución es adecuada.
      //True = YESS; False = NEL.
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
    }}
  </ContentController.Consumer>);
}