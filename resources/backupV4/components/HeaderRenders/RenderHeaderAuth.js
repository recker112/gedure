import React from 'react';

//Componentes
import ButtonTheme from '../ButtonTheme';
import NoticiasButton from './HeaderAuth/NoticiasButton';
import MenuButtonOpen from './HeaderAuth/MenuButtonOpen';
import ButtonUser from './HeaderAuth/ButtonUser';
import DrawerMenu from './../DrawerMenu';

import { useTheme } from '@material-ui/core/styles';

function RenderHeaderAuth() {
	const theme = useTheme();
	
	let darkModeColor = theme.palette.type === 'dark' ? 'Header--Dark' : '';
	return (
		<div>
			<header className={`Header Header--Auth ${darkModeColor}`}>
				<nav className="Header__Nav Header__Nav--Auth">
					<MenuButtonOpen />
					<div>
						<span className="Header__Button">
							<ButtonTheme />
						</span>
						{/* DESACTIVADO PARA REALIZAR EN UN FUTURO
            <span className="IconBoxButton">
              <Tooltip title="Mensajes" arrow enterDelay={1000} >
                <IconButton>
                  <Badge color="secondary" badgeContent={12} max={10}>
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </span> */}
						<span className="Header__Button">
							<NoticiasButton />
						</span>
						<span className="Header__Button">
							<ButtonUser />
						</span>
					</div>
				</nav>
			</header>
			<DrawerMenu />
		</div>
	);
}

export default RenderHeaderAuth;