import React from 'react';

import {
	IconButton,
	Tooltip,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Redux
import { useDispatch } from 'react-redux';
import updateDrawer from '../../actions/updateDrawer';

function DrawerButton({ ...rest }) {
	const dispatch = useDispatch();
	
	const handleClick = () => {
		dispatch(updateDrawer(true));
	}
	
	return (
		<div {...rest}>
			<Tooltip title="Menú" arrow leaveDelay={200}>
				<IconButton data-tour="drawer__button" onClick={handleClick}>
					<MenuIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
}

export default DrawerButton;