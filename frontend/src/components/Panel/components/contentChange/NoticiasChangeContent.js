import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { ContentController } from '../../RenderPanel';

//Aplicando el método del contexto de react, se
//cambia el estado del componente superior para así mostrar
//el contenido deseado.
function NoticiasChangeContent() {
  return <ContentController.Consumer>
    {(contentData) => {
      const { changeContent } = contentData;
      return (<Tooltip title="Noticias" arrow>
        <IconButton onClick={() => changeContent('news')}>
          <AnnouncementIcon />
        </IconButton>
      </Tooltip>);
    }}
  </ContentController.Consumer>;
}

export default NoticiasChangeContent;