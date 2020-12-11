import React from 'react';

import { 
	AppBar,
	Toolbar,
	Tooltip,
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

// Components
import { HiddeOnScroll } from '../Header';
import DrawerButton from './DrawerButton';
import AvatarButton from './AvatarButton';
import DrawerMenu from './DrawerMenu';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateTema from '../../actions/updateTema';

const useStyles = makeStyles((theme) => ({
	menuButtom: {
		marginLeft: theme.spacing(1),
	},
	drawerButton: {
		flexGrow: 1,
	}
}));


function ChangeTheme({children, ...rest}) {
	const dispatch = useDispatch();
	
	const handleClick = ()=>{
		dispatch(updateTema())
	}
	
	return (
		<div {...rest} onClick={handleClick}>
			{children}
		</div>
	)
}

function HeaderAuth() {
	const { tema } = useSelector((state) => ({
		tema: state.settings.tema,
	}));
	
	const classes = useStyles();
	
	const temaText = tema === 'light' ? 'Modo Oscuro' : 'Modo Claro';
	
	return (
		<HiddeOnScroll>
			<AppBar color='primary' elevation={0}>
				<Toolbar>
					<DrawerButton className={classes.drawerButton} />
					<ChangeTheme className={classes.menuButtom}>
						<Tooltip title={temaText} arrow leaveDelay={200}>
							<IconButton data-tour='theme__button'>
								<WbIncandescentIcon style={{ color: 'white' }} />
							</IconButton>
						</Tooltip>
					</ChangeTheme>
					<AvatarButton className={classes.menuButtom} />
					<DrawerMenu />
				</Toolbar>
			</AppBar>
		</HiddeOnScroll>
	);
}

export default HeaderAuth;