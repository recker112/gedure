import React, { useState } from 'react';

import { 
	ListItemIcon,
	ListItemText,
	SvgIcon,
	Collapse,
	List,
} from '@material-ui/core';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { mdiSchool } from '@mdi/js';
import { mdiFilePdf } from '@mdi/js';
import { mdiFileWord } from '@mdi/js';
import { mdiHammerWrench } from '@mdi/js';
import { mdiBookAlert } from '@mdi/js'; 

// Components
import { ReturnSelected } from './HeaderNoAuth';

function SchoolIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiSchool} />
    </SvgIcon>
  );
}

function FilePdfIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiFilePdf} />
    </SvgIcon>
  );
}

function FileWordIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiFileWord} />
    </SvgIcon>
  );
}

function HammerWrenchIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiHammerWrench} />
    </SvgIcon>
  );
}

function BookAlertIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiBookAlert} />
    </SvgIcon>
  );
}

function UserList({ handleClose }) {
	const [control, setControl] = useState(false);
	const [admin, setAdmin] = useState(false);
	
	const handleOpenControl = () => {
		setControl(!control);
	}
	
	const handleOpenAdmin = () => {
		setAdmin(!admin);
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
					<ReturnSelected url='/panel/boletas' handle={handleClose} nested>
						<ListItemIcon>
							<FilePdfIcon />
						</ListItemIcon>
						<ListItemText primary="Boletas" />
					</ReturnSelected>
					<ReturnSelected url='/panel/horario' handle={handleClose} nested>
						<ListItemIcon>
							<WatchLaterIcon />
						</ListItemIcon>
						<ListItemText primary="Horario" />
					</ReturnSelected>
					<ReturnSelected url='/panel/constancias' handle={handleClose} nested>
						<ListItemIcon>
							<FileWordIcon />
						</ListItemIcon>
						<ListItemText primary="Constancias" />
					</ReturnSelected>
				</List>
			</Collapse>
			<ReturnSelected handle={handleOpenAdmin}>
				<ListItemIcon>
					<HammerWrenchIcon />
				</ListItemIcon>
				<ListItemText primary='Administración' /> 
				{admin ? <ExpandLess /> : <ExpandMore />}
			</ReturnSelected>
			<Collapse in={admin} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ReturnSelected url='/panel/saldo' handle={handleClose} nested>
						<ListItemIcon>
							<AttachMoneyIcon />
						</ListItemIcon>
						<ListItemText primary="Saldo" />
					</ReturnSelected>
					<ReturnSelected url='/panel/deudas' handle={handleClose} nested>
						<ListItemIcon>
							<BookAlertIcon />
						</ListItemIcon>
						<ListItemText primary="Deudas" />
					</ReturnSelected>
				</List>
			</Collapse>
			<ReturnSelected url='/panel/tienda' handle={handleClose}>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary='Tienda' /> 
			</ReturnSelected>
		</React.Fragment>
	);
}

export default UserList;