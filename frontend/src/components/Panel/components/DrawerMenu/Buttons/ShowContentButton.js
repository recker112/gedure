import React from 'react';
import { RenderMobileButton } from "./RenderMobileButton";
import RenderButton from "./RenderButton";
export function ShowContentButton(props) {
  //Verificar si existe contenido para el Tooltip.
  if (props.options.content) {
    const { title, content, text, redirect } = props.options;
    return (
      <RenderButton options={{
        title,
        content,
        text,
        redirect,
      }}>
        {props.children}
      </RenderButton>
    );
  }
  else {
    const { text, redirect } = props.options;
    //Mostrar el contenido para la pantalla de mobil.
    return (
      <RenderMobileButton options={{
        text,
        redirect,
      }}>
        {props.children}
      </RenderMobileButton>
    );
  }
}
