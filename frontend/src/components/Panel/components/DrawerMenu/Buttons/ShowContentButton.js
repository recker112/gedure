import React from 'react';
import { ContentController } from '../../../RenderPanel';
import { RenderMobileButton } from "./RenderMobileButton";
import { RenderButton } from "./RenderButton";
export function ShowContentButton(props) {
  //Verificar si existe contenido para el Tooltip.
  if (props.options.content) {
    const { title, content, text, redirect } = props.options;
    return (<ContentController.Consumer>
      {
        //Mostrar el contenido para la pantalla de escritorio.
        (contentData) => {
          const { changeContent } = contentData;
          return (<RenderButton options={{
            title,
            content,
            text,
            redirect,
            changeContent
          }}>
            {props.children}
          </RenderButton>);
        }}
    </ContentController.Consumer>);
  }
  else {
    const { text, redirect } = props.options;
    //Mostrar el contenido para la pantalla de mobil.
    return (<ContentController.Consumer>
      {(contentData) => {
        const { changeContent } = contentData;
        return (<RenderMobileButton options={{
          text,
          redirect,
          changeContent
        }}>
          {props.children}
        </RenderMobileButton>);
      }}
    </ContentController.Consumer>);
  }
}
