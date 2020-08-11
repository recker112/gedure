import React from 'react';

//Componentes
import CloseDrawerMenu from './CloseDrawerMenu';
import RenderButtonList from './RenderButtonList';

//Material-UI
import { List } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Iconos
import History from '@material-ui/icons/History';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockIcon from '@material-ui/icons/Lock';

//Redux
import { connect } from 'react-redux';

const ContentBarList = ({privilegio}) => {
	
	const DrawerList = [
		{
			title: 'Dashboard',
			listItems: [
				{
					redirect: '/panel',
					text: 'Inicio',
					icon: <HomeIcon />
				}
			]
		},
		{
			title: 'Administración',
			access: ['A-'],
			listItems: [
				{
					redirect: '/panel/registros',
					text: 'Registros',
					icon: <History />
				},
				{
					redirect: '/panel/modifyUsers',
					text: 'Consultar/Modificar',
					icon: <ReceiptIcon />
				},
				{
					redirect: '/panel/desblockAccount',
					text: 'Desbloquear',
					icon: <LockIcon />
				},
				{
					redirect: '/panel/uploadData',
					text: 'Cargar',
					icon: <CloudUploadIcon />
				},
				{
					redirect: '/panel/userOptions',
					text: 'Opciones',
					icon: <BuildIcon />
				},
				{
					redirect: '/panel/deleteData',
					text: 'Borrar',
					icon: <DeleteIcon />
				},
			]
		},
		{
			title: 'Publicaciones',
			access: ['CR-','A-'],
			listItems: [
				{
					redirect: '/panel/toPost',
					text: 'Publicar',
					icon: <NewReleasesIcon />
				},
				{
					redirect: '/panel/deletePost',
					text: 'Borrar publicación',
					icon: <DeleteSweepIcon />
				},
			]
		},
		{
			title: 'Estudio',
			access: ['V-'],
			listItems: [
				{
					redirect: '/panel/boletas',
					text: 'Boletas',
					icon: <ListAltIcon />
				},
			]
		}
	]

	const theme = useTheme();
	
	let darkModeColor = theme.palette.type === 'dark' ? 'HeadDrawer--Dark' : '';
	
	return (
		<div role="presentation" className='DrawerBody'>
			<div className={`HeadDrawer ${darkModeColor}`}>
				<span className="HeadDrawer__Text">Menú</span>
				<CloseDrawerMenu />
			</div>
			{DrawerList.map((section, i)=>{
				let renderSection = true;
				
				//Verificar privilegio
				if (section.access) {
					let found = false;
					section.access.map((access)=>{
						if (access === privilegio) {
							renderSection = true;
							found = true;
						}
						
						if (!found) {
							renderSection = false;
						}
						
						return null;
					})
				}
				
				if (renderSection) {
					return (
						<div className='DrawerSection' key={i}>
							<span className='DrawerSection__Title'>{section.title}</span>
							<List dense={true}>
								{section.listItems.map((item, i)=>{
									let renderItem = true;
									
									//Verificar privilegio
									if (item.access) {
										let found = false;
										item.access.map((access)=>{
											if (access === privilegio) {
												renderItem = true;
												found = true;
											}

											if (!found) {
												renderItem = false;
											}

											return null;
										})
									}
									
									if (renderItem) {
										return (
											<RenderButtonList
												key={i}
												options={{
													redirect: item.redirect,
													text: item.text
												}}
											>
												{item.icon}
											</RenderButtonList>
										);
									}
									
									return null;
								})}
							</List>
						</div>
					);
				}
				
				return null;
			})}
		</div>
	);
};

//REDUX
const mapStateToProps = (state) => ({
  privilegio: state.userData.privilegio,
});

export default connect(mapStateToProps)(ContentBarList);