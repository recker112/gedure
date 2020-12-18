import React, { useState } from 'react';

import { 
	ListItemIcon,
	ListItemText,
	SvgIcon,
	Collapse,
	List,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { mdiHammerWrench } from '@mdi/js';
import { mdiConsoleLine } from '@mdi/js'; 
import { mdiAccountMultiple } from '@mdi/js'; 
import { mdiPost } from '@mdi/js';
import { mdiFilePdf } from '@mdi/js'; 

// Components
import { ReturnSelected } from './HeaderNoAuth';

// Redux
import { useSelector } from 'react-redux';

function ConsoleLineIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiConsoleLine} />
    </SvgIcon>
  );
}

function AccountMultipleIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiAccountMultiple} />
    </SvgIcon>
  );
}

function PostIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiPost} />
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

function HammerWrenchIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiHammerWrench} />
    </SvgIcon>
  );
}

function AdminList({ handleClose }) {
	const [control, setControl] = useState(false);
	
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	
	const handleOpenControl = () => {
		setControl(!control);
	}
	
	return (
		<React.Fragment>
			{permissions?.sin_asignar?.registros_index && (
				<ReturnSelected url='/gedure/registros' handle={handleClose}>
					<ListItemIcon>
						<ConsoleLineIcon />
					</ListItemIcon>
					<ListItemText primary='Registros' /> 
				</ReturnSelected>
			)}
			<ReturnSelected handle={handleOpenControl}>
				<ListItemIcon>
					<HammerWrenchIcon />
				</ListItemIcon>
				<ListItemText primary='Controlar sistema' /> 
				{control ? <ExpandLess /> : <ExpandMore />}
			</ReturnSelected>
			<Collapse in={control} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{permissions?.administrar?.users_index && (
						<ReturnSelected url='/gedure/usuarios' handle={handleClose} nested noExact>
							<ListItemIcon>
								<AccountMultipleIcon />
							</ListItemIcon>
							<ListItemText primary="Usuarios" />
						</ReturnSelected>
					)}
					<ReturnSelected url='/gedure/publicaciones' handle={handleClose} nested>
						<ListItemIcon>
							<PostIcon />
						</ListItemIcon>
						<ListItemText primary="Publicaciones" />
					</ReturnSelected>
					<ReturnSelected url='/gedure/boletas' handle={handleClose} nested>
						<ListItemIcon>
							<FilePdfIcon />
						</ListItemIcon>
						<ListItemText primary="Boletas" />
					</ReturnSelected>
				</List>
			</Collapse>
			<ReturnSelected url='/gedure/saldo' handle={handleClose}>
				<ListItemIcon>
					<AttachMoneyIcon />
				</ListItemIcon>
				<ListItemText primary='Saldo' /> 
			</ReturnSelected>
			<ReturnSelected url='/gedure/tienda' handle={handleClose}>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary='Tienda' /> 
			</ReturnSelected>
			<ReturnSelected url='/gedure/configuracion' handle={handleClose}>
				<ListItemIcon>
					
				</ListItemIcon>
				<ListItemText primary='Configurar Gedure' /> 
			</ReturnSelected>
		</React.Fragment>
	);
}

export default AdminList;