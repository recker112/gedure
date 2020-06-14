import React from 'react';

//Componentes
import CloseDrawerMenu from './CloseDrawerMenu';
import RenderButtonList from './RenderButtonList';

//Material-UI
import { List, Divider } from '@material-ui/core';
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
	const dataListAdmin = [
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
  ];
  
  const dataListEstu = [
    {
			redirect: '/panel/boletas',
			text: 'Boletas',
			icon: <ListAltIcon />
    },
		// {
		// 	redirect: '/panel?show=horario',
		// 	text: 'Horario',
		// 	queryParams: {
		// 		param: 'show',
		// 		value: 'horario'
		// 	},
		// 	icon: <QueryBuilderIcon />
		// },
		// {
		// 	redirect: '/panel?show=constancias',
		// 	text: 'Constancias',
		// 	queryParams: {
		// 		param: 'show',
		// 		value: 'constancias'
		// 	},
		// 	icon: <ArchiveIcon />
		// },
	];
	
	const dataListCreador = [
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
	];

	const theme = useTheme();
	
	let darkModeColor = theme.palette.type === 'dark' ? 'HeadDrawer--Dark' : '';
	
	return (
		<div role="presentation">
			<div className={`HeadDrawer ${darkModeColor}`}>
				<span className="HeadDrawer__Text">Menú</span>
				<CloseDrawerMenu />
			</div>
			<List style={{ width: '250px' }} dense={true}>
				{/*Globales*/}
				<RenderButtonList
					options={{
						redirect: '/panel',
						text: 'Dashboard'
					}}
				>
					<HomeIcon />
				</RenderButtonList>
				<Divider />
				{/*Listas*/}
				{privilegio === "A-" && dataListAdmin.map((data, i) => {
					return (
						<React.Fragment key={i}>
							<RenderButtonList
								options={{
									redirect: data.redirect,
									text: data.text
								}}
								queryParams={data.queryParams ? data.queryParams : null}
							>
								{data.icon}
							</RenderButtonList>
							{/*Poner dividers*/}
							{(i === 5) ? (<Divider />) : null}
						</React.Fragment>
					);
        })}
        {privilegio === "V-" && dataListEstu.map((data, i) => {
					return (
						<React.Fragment key={i}>
							<RenderButtonList
								options={{
									redirect: data.redirect,
									text: data.text
								}}
								queryParams={data.queryParams ? data.queryParams : null}
								defaultPath='home'
							>
								{data.icon}
							</RenderButtonList>
						</React.Fragment>
					);
				})}
				{privilegio === "CR-" && dataListCreador.map((data, i) => {
					return (
						<React.Fragment key={i}>
							<RenderButtonList
								options={{
									redirect: data.redirect,
									text: data.text
								}}
								queryParams={data.queryParams ? data.queryParams : null}
								defaultPath='home'
							>
								{data.icon}
							</RenderButtonList>
						</React.Fragment>
					);
				})}
			</List>
		</div>
	);
};

//REDUX
const mapStateToProps = (state) => ({
  privilegio: state.userData.privilegio
});

export default connect(mapStateToProps)(ContentBarList);