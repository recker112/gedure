import React, { useState } from 'react';

//Material-UI
import { IconButton, MenuItem, Menu, Avatar, Tooltip } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import logout from '../../../actions/login/logout';

//Componentes
import { clearAllData } from '../../ReloginVerify';
import MenuDialog from './MenuDialog';

//SnackBar
import { useSnackbar } from 'notistack';
import updateMenuUser from '../../../actions/panel/updateMenuUser';

//Boton con MENU INTERNO BOYYYYYYYYYYS
function ButtonUser({ name, avatar, logout, updateMenuUser, privilegio }) {
	//State la cual controlará el estado del menú.
	const [buttonItem, setButtonItem] = useState(null);

	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	//El que seteará el item en el cual debe aparecer el menú.
	const handleClick = event => {
		setButtonItem(event.currentTarget);
	};

	//Cerrar pos.
	const handleClose = () => {
		setButtonItem(null);
	};

	//Funcion del menú.
	const handleSelected = e => {
		const option = e.target.dataset.option;
		if (option === 'logout') {
			clearAllData();
			enqueueSnackbar('Sección cerrada', {
				variant: 'info'
			});
			logout();
		} else if (option === 'password') {
			updateMenuUser(true, 'password');
		} else if (option === 'avatar') {
			updateMenuUser(true, 'avatar');
		}
		setButtonItem(null);
	};
	return (
		<React.Fragment>
			<Tooltip title="Opciones" arrow enterDelay={1000}>
				{/*Aria-controls indica el item por ID el cual será controlado el
      en este caso será controlado por el MENÚ.
      aria-haspopud no sé que hace. xDDD
      */}
				<IconButton aria-controls="ButtonUser" aria-haspopup="true" onClick={handleClick}>
					<Avatar
						src={avatar}
						alt="Usuario"
						style={{
							backgroundColor: '#B46BD6',
							height: '35px',
							width: '35px'
						}}
					>
						{/*Mostrar el nombre del usuario en caso de que no tenga
          una foto*/}
						{name.substring(0, 1).toUpperCase()}
					</Avatar>
				</IconButton>
			</Tooltip>
			<MenuAvatar
				handleClose={handleClose}
				buttonItem={buttonItem}
				handleSelected={handleSelected}
				privilegio={privilegio}
			/>
			<MenuDialog />
		</React.Fragment>
	);
}

function MenuAvatar({ buttonItem, handleClose, handleSelected, privilegio }) {
	//Configuración del menú.
	const configMenu = [
		{
			option: 'avatar',
			text: 'Cambiar avatar',
			access: ['A-', 'CR-']
		},
		{
			option: 'password',
			text: 'Cambiar contraseña',
			access: 'all'
		},
		{
			option: 'logout',
			text: 'Salir',
			access: 'all'
		}
	];

	/* Recordar que el archoEl es simplemente el item en el cual
    se posicionará el menú. */
	return (
		<Menu
			id="ButtonUser"
			anchorEl={buttonItem}
			keepMounted
			open={Boolean(buttonItem)}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'left'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
		>
			{//Verificar configuraciones.
			configMenu.map((menu, i) => {
				if (menu.access === 'all') {
					//Verificar si todos pueden acceder.
					return (
						<MenuItem key={i} data-option={menu.option} onClick={handleSelected}>
							{menu.text}
						</MenuItem>
					);
				} else {
					//Verificar si solo algunos rangos puden acceder.
					return menu.access.map((access, i) => {
						//Verificar el privilegio actual con los solicitados.
						if (access === privilegio) {
							return (
								<MenuItem key={`Access${i}`} data-option={menu.option} onClick={handleSelected}>
									{menu.text}
								</MenuItem>
							);
						} else {
							return null;
						}
					});
				}
			})}
		</Menu>
	);
}

//REDUX
const mapStateToProps = state => ({
	name: state.userData.name,
	avatar: state.userData.avatar,
	privilegio: state.userData.privilegio
});

const mapDispatchToProps = {
	logout,
	updateMenuUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonUser);