import React from 'react';
import { 
  IconButton, 
  Badge,
  Tooltip
} from '@material-ui/core';

//Componentes
import ButtonTheme from './../../reutilizar/ButtonTheme';
import NoticiasChangeContent from './contentChange/NoticiasChangeContent';
import MenuButtonOpen from './MenuButtonOpen';

//Icons
import MailIcon from '@material-ui/icons/Mail';
import ButtonUser from './ButtonUser';


function HeaderNoPanel() {
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

export default HeaderNoPanel;