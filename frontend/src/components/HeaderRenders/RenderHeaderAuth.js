import React from 'react';
import { 
  IconButton, 
  Badge,
  Tooltip
} from '@material-ui/core';

//Componentes
import ButtonTheme from '../ButtonTheme';
import NoticiasChangeContent from '../../views/panel/contentChange/NoticiasChangeContent';
import MenuButtonOpen from './HeaderAuth/MenuButtonOpen';
import ButtonUser from './HeaderAuth/ButtonUser';

//Icons
import MailIcon from '@material-ui/icons/Mail';


function RenderHeaderAuth() {
  return (
    <div>
      <header className="headerNoPanel fixPanel">
        <nav>
          <MenuButtonOpen />
          <div className="Options">
            <span className="IconBoxButton">
              <ButtonTheme />
            </span>
            <span className="IconBoxButton">
              <Tooltip title="Mensajes" arrow>
                <IconButton>
                  <Badge color="secondary" badgeContent={12} max={10}>
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </span>
            <span className="IconBoxButton">
                <NoticiasChangeContent />
            </span>
            <span className="IconBoxButton">
              <ButtonUser></ButtonUser>
            </span>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default RenderHeaderAuth;