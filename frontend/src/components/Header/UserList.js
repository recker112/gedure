import React, { useState } from 'react';

import { 
	ListItemIcon,
	ListItemText,
	Collapse,
	List,
} from '@material-ui/core';
//import WatchLaterIcon from '@material-ui/icons/WatchLater';
//import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
//import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
	School as SchoolIcon,
	FilePdf as FilePdfIcon,
	//FileWord as FileWordIcon,
	//HammerWrench as HammerWrenchIcon,
	//BookAlert as BookAlertIcon,
	PiggyBank as PiggyBankIcon,
} from 'mdi-material-ui';

// Components
import { ReturnSelected } from './HeaderNoAuth';

function UserList({ handleClose }) {
	const [control, setControl] = useState(false);
	
	const handleOpenControl = () => {
		setControl(!control);
	}
	
	return (
		<React.Fragment>
			<ReturnSelected handle={handleOpenControl}>
				<ListItemIcon>
					<SchoolIcon />
				</ListItemIcon>
				<ListItemText primary='Control de estudio' /> 
				{control ? <ExpandLess /> : <ExpandMore />}
			</ReturnSelected>
			<Collapse in={control} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ReturnSelected url='/gedure/boletas' handle={handleClose} nested>
						<ListItemIcon>
							<FilePdfIcon />
						</ListItemIcon>
						<ListItemText primary="Boletas" />
					</ReturnSelected>
					{/*<ReturnSelected url='/gedure/horario' handle={handleClose} nested>
						<ListItemIcon>
							<WatchLaterIcon />
						</ListItemIcon>
						<ListItemText primary="Horario" />
					</ReturnSelected>
					<ReturnSelected url='/gedure/constancias' handle={handleClose} nested>
						<ListItemIcon>
							<FileWordIcon />
						</ListItemIcon>
						<ListItemText primary="Constancias" />
					</ReturnSelected>*/}
				</List>
			</Collapse>
			<ReturnSelected url='/gedure/deudas' handle={handleClose}>
				<ListItemIcon>
					<PiggyBankIcon />
				</ListItemIcon>
				<ListItemText primary="Deudas" />
			</ReturnSelected>
			{/*<ReturnSelected handle={handleOpenAdmin}>
				<ListItemIcon>
					<HammerWrenchIcon />
				</ListItemIcon>
				<ListItemText primary='Administraciรณn' /> 
				{admin ? <ExpandLess /> : <ExpandMore />}
			</ReturnSelected>
			<Collapse in={admin} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ReturnSelected url='/gedure/saldo' handle={handleClose} nested>
						<ListItemIcon>
							<AttachMoneyIcon />
						</ListItemIcon>
						<ListItemText primary="Saldo" />
					</ReturnSelected>
					<ReturnSelected url='/gedure/deudas' handle={handleClose} nested>
						<ListItemIcon>
							<BookAlertIcon />
						</ListItemIcon>
						<ListItemText primary="Deudas" />
					</ReturnSelected>
				</List>
			</Collapse>
			<ReturnSelected url='/gedure/tienda' handle={handleClose}>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary='Tienda' /> 
			</ReturnSelected>*/}
		</React.Fragment>
	);
}

export default UserList;