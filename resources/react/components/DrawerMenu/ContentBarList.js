import React from 'react';

//Componentes
import CloseDrawerMenu from './CloseDrawerMenu';
import RenderButtonList from './RenderButtonList';

//Material-UI
import { List, Divider } from '@material-ui/core';

//Iconos
import History from '@material-ui/icons/History';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import HomeIcon from '@material-ui/icons/Home';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import ArchiveIcon from '@material-ui/icons/Archive';
import ListAltIcon from '@material-ui/icons/ListAlt';

//Redux
import { connect } from 'react-redux';

const ContentBarList = ({privilegio}) => {
	const dataListAdmin = [
		{
			redirect: '/panel?show=home',
			text: 'Dashboard',
			queryParams: {
				param: 'show',
				value: 'home'
			},
			icon: <HomeIcon />
		},
		{
			redirect: '/panel?show=reg',
			text: 'Registros',
			queryParams: {
				param: 'show',
				value: 'reg'
			},
			icon: <History />
		},
		{
			redirect: '/panel?show=modify',
			text: 'Consultar/Modificar',
			queryParams: {
				param: 'show',
				value: 'modify'
			},
			icon: <ReceiptIcon />
		},
		{
			redirect: '/panel?show=upload',
			text: 'Cargar',
			queryParams: {
				param: 'show',
				value: 'upload'
			},
			icon: <CloudUploadIcon />
		},
		{
			redirect: '/panel?show=userOptions',
			text: 'Opciones',
			queryParams: {
				param: 'show',
				value: 'userOptions'
			},
			icon: <BuildIcon />
		},
		{
			redirect: '/panel?show=delete',
			text: 'Borrar',
			queryParams: {
				param: 'show',
				value: 'delete'
			},
			icon: <DeleteIcon />
		},
		{
			redirect: '/panel?show=posting',
			text: 'Publicar',
			queryParams: {
				param: 'show',
				value: 'posting'
			},
			icon: <NewReleasesIcon />
		},
		{
			redirect: '/panel?show=delPosting',
			text: 'Borrar publicación',
			queryParams: {
				param: 'show',
				value: 'delPosting'
			},
			icon: <DeleteSweepIcon />
		},
  ];
  
  const dataListEstu = [
		{
			redirect: '/panel?show=home',
			text: 'Dashboard',
			queryParams: {
				param: 'show',
				value: 'home'
			},
			icon: <HomeIcon />
    },
    {
			redirect: '/panel?show=boleta',
			text: 'Boleta',
			queryParams: {
				param: 'show',
				value: 'boleta'
			},
			icon: <ListAltIcon />
    },
    {
			redirect: '/panel?show=horario',
			text: 'Horario',
			queryParams: {
				param: 'show',
				value: 'horario'
			},
			icon: <QueryBuilderIcon />
    },
    {
			redirect: '/panel?show=constancias',
			text: 'Constancias',
			queryParams: {
				param: 'show',
				value: 'constancias'
			},
			icon: <ArchiveIcon />
		},
	];

	return (
		<div role="presentation">
			<div className="drawerMenu">
				<span className="TextHead">Menú</span>
				<CloseDrawerMenu />
			</div>
			<List style={{ width: '250px' }} dense={true}>
				{privilegio === "A-" && dataListAdmin.map((data, i) => {
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
							{/*Poner dividers*/}
							{(i === 0 || i === 5) ? (<Divider />) : null}
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
							{/*Poner dividers*/}
							{(i === 0 || i === 5) ? (<Divider />) : null}
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