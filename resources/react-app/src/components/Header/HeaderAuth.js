import React from 'react';

import {
	AppBar,
	Toolbar,
	IconButton,
	Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

import { connect } from 'react-redux';
import updateTheme from './../../actions/updateTheme';

import { HiddeOnScroll } from './../Header';
import AvatarButton from './AvatarButton';
import DrawerButton from './DrawerButton';

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: `${theme.spacing(2)}px`
	},
	drawer__itemExpand: {
		flexGrow: 1
	},
	marginAppBar: {
		marginRight: theme.spacing(1)
	},
	marginAppBar__avatar: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1)
	}
}));

function ChangeTheme({updateTheme, children}) {
	const handleClick = ()=>{
		updateTheme()
	}
	
	return (
		<div onClick={handleClick}>
			{children}
		</div>
	)
}

function HeaderAuth({ updateTheme, tema }) {
	const classes = useStyles();
	
	const temaText = tema === 'light' ? 'Modo Oscuro' : 'Modo Claro';
	
	return (
		<HiddeOnScroll>
			<AppBar>
				<Toolbar className={classes.appBar}>
					<div className={classes.drawer__itemExpand}>
						<DrawerButton />
					</div>
					<ChangeTheme updateTheme={updateTheme}>
						<Tooltip title={temaText} arrow leaveDelay={200}>
							<IconButton className={classes.marginAppBar}>
								<WbIncandescentIcon />
							</IconButton>
						</Tooltip>
					</ChangeTheme>
					<div className={classes.marginAppBar__avatar}>
						<AvatarButton />
					</div>
				</Toolbar>
			</AppBar>
		</HiddeOnScroll>
	);
}

//REDUX
const mapStateToProps = (state) => ({
	permissions: state.userData.permissions,
	tema: state.settings.tema,
});

const mapDispatchToProps = {
	updateTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuth);