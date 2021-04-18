import React, { useState } from 'react';

import { 
	ListItemIcon,
	ListItemText,
	SvgIcon,
	Collapse,
	List,
} from '@material-ui/core';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import {
	HammerWrench as HammerWrenchIcon,
	ConsoleLine as ConsoleLineIcon,
	AccountMultiple as AccountMultipleIcon,
	Post as PostIcon,
	FilePdf as FilePdfIcon,
	PiggyBank as PiggyBankIcon,
	Wallet as WalletIcon,
} from 'mdi-material-ui';

// Components
import { ReturnSelected } from './HeaderNoAuth';

// Redux
import { useSelector } from 'react-redux';

function GedureIcon(props) {
  return (
    <SvgIcon {...props} viewBox='200.082 335.055 89.655 109.545'>
      <path d='M 289.593 386.16 L 289.593 429.96 C 285.64 434.353 279.853 437.893 272.233 440.58 C 264.62 443.26 256.27 444.6 247.183 444.6 C 233.223 444.6 222.066 440.33 213.713 431.79 C 205.366 423.243 200.9 411.353 200.313 396.12 L 200.082 391.077 L 226.796 405.655 C 226.829 408.333 228.133 411.463 231.773 416.81 C 235.406 422.157 241.13 424.83 248.943 424.83 C 255.636 424.83 260.616 423.34 263.883 420.36 L 263.883 403.81 L 246.013 403.81 L 246.013 386.16 Z M 226.982 399.182 L 200.457 385.15 C 200.457 374.65 202.31 367.318 206.017 359.485 C 209.73 351.645 215.04 345.615 221.947 341.395 C 228.86 337.168 236.857 335.055 245.937 335.055 C 259.217 335.055 269.53 338.095 276.877 344.175 C 284.23 350.255 288.517 359.325 289.737 371.385 L 264.977 371.385 C 264.097 365.425 262.194 361.178 259.267 358.645 C 256.334 356.105 252.184 354.835 246.817 354.835 C 240.37 354.835 235.39 357.568 231.877 363.035 C 228.357 368.502 226.574 376.315 226.527 386.475 L 226.527 392.915 C 226.527 395.99 226.982 399.182 226.982 399.182 Z' />
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
			{Object.keys(permissions.administrar).length !== 0 && (
				<React.Fragment>
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
								<ReturnSelected 
									url='/gedure/usuarios' 
									handle={handleClose} 
									nested 
									noExact
								>
									<ListItemIcon>
										<AccountMultipleIcon />
									</ListItemIcon>
									<ListItemText primary="Usuarios" />
								</ReturnSelected>
							)}
							{permissions?.administrar?.posts_index && (
								<ReturnSelected url='/gedure/publicaciones' handle={handleClose} nested>
									<ListItemIcon>
										<PostIcon />
									</ListItemIcon>
									<ListItemText primary="Publicaciones" />
								</ReturnSelected>
							)}
							{permissions?.administrar?.boletas_index && (
								<ReturnSelected url='/gedure/boletas' handle={handleClose} nested noExact>
									<ListItemIcon>
										<FilePdfIcon />
									</ListItemIcon>
									<ListItemText primary="Boletas" />
								</ReturnSelected>
							)}
							{permissions?.administrar?.debt_lote_index && (
								<ReturnSelected url='/gedure/lotes-deudas' handle={handleClose} nested noExact>
									<ListItemIcon>
										<PiggyBankIcon />
									</ListItemIcon>
									<ListItemText primary="Lotes de deudas" />
								</ReturnSelected>
							)}
							<ReturnSelected url='/gedure/monederos' handle={handleClose} nested noExact>
								<ListItemIcon>
									<WalletIcon />
								</ListItemIcon>
								<ListItemText primary="Monederos" />
							</ReturnSelected>
							{permissions?.administrar?.contact_index && (
								<ReturnSelected url='/gedure/soli-contacto' handle={handleClose} nested noExact>
									<ListItemIcon>
										<ContactMailIcon />
									</ListItemIcon>
									<ListItemText primary="Solicitúd de contácto" />
								</ReturnSelected>
							)}
						</List>
					</Collapse>
				</React.Fragment>
			)}
			{Object.keys(permissions.gedure).length !== 0 && (
				<ReturnSelected url='/gedure/configuracion' handle={handleClose} noExact>
					<ListItemIcon>
						<GedureIcon />
					</ListItemIcon>
					<ListItemText primary='Configurar Gedure' /> 
				</ReturnSelected>
			)}
		</React.Fragment>
	);
}

export default AdminList;