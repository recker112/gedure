import React from 'react';

import {
	AppBar,
	Toolbar,
	IconButton,
	Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

// Components
import { HiddeOnScroll } from './../Header';
import AvatarButton from './AvatarButton';

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
			<AppBar>
				<Toolbar>
					<div className={classes.drawerButton}>
						M
					</div>
					<ChangeTheme className={classes.menuButtom}>
						<Tooltip title={temaText} arrow leaveDelay={200}>
							<IconButton>
								<WbIncandescentIcon />
							</IconButton>
						</Tooltip>
					</ChangeTheme>
					<AvatarButton className={classes.menuButtom} />
				</Toolbar>
			</AppBar>
		</HiddeOnScroll>
	);
}

export default HeaderAuth;