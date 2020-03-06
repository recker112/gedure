import React from 'react';
import { 
  IconButton, 
  Badge,
  Tooltip
} from '@material-ui/core';

//Componentes
import ButtonTheme from '../ButtonTheme';
import NoticiasButton from './HeaderAuth/NoticiasButton';
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
              <Tooltip title="Mensajes" arrow enterDelay={1000} >
                <IconButton>
                  <Badge color="secondary" badgeContent={12} max={10}>
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </span>
            <span className="IconBoxButton">
                <NoticiasButton />
            </span>
            <span className="IconBoxButton">
              <ButtonUser />
            </span>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default RenderHeaderAuth;