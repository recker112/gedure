import React, { useState } from 'react';

//Material-UI
import {
	IconButton,
	Tooltip,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

//Components
import RegistrosDialog from '../../../../components/RegistrosDialog';

function UserUnlock({ cedula }) {
	const [open, setOpen] = useState(false);

	function handleClick(cedula) {
		setOpen(!open);
	}

	return (
		<React.Fragment>
			<Tooltip title="Desbloquear" placement="right" enterDelay={1000} leaveDelay={200} arrow>
				<IconButton
					variant="outlined"
					color="secondary"
					onClick={() => {
						handleClick(cedula);
					}}
				>
					<LockIcon />
				</IconButton>
			</Tooltip>
			<RegistrosDialog open={open} action={handleClick} cedula={cedula} />
		</React.Fragment>
	);
}

export default UserUnlock;