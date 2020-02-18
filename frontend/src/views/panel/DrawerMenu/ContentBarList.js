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
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import HomeIcon from '@material-ui/icons/Home';

export const ContentBarList = () => {
	return (
		<div role="presentation">
			<div className="drawerMenu">
				<span className="TextHead">Menú</span>
				<CloseDrawerMenu />
			</div>
			<List style={{ width: '250px' }} dense={true}>
				<RenderButtonList
					options={{
						redirect: 'home',
						text: 'Dashboard'
					}}
				>
					<HomeIcon />
				</RenderButtonList>
				<Divider />
				<RenderButtonList
					options={{
						text: 'Registros',
						redirect: 'reg'
					}}
				>
					<History />
				</RenderButtonList>
				<RenderButtonList
					options={{
						text: 'Consultar/Modificar',
						redirect: 'co/mo'
					}}
				>
					<ReceiptIcon />
				</RenderButtonList>
				<RenderButtonList
					options={{
						text: 'Cargar',
						redirect: 'upload'
					}}
				>
					<CloudUploadIcon />
				</RenderButtonList>
				<RenderButtonList
					options={{
						text: 'Opciones',
						redirect: 'options'
					}}
				>
					<BuildIcon />
				</RenderButtonList>
				<RenderButtonList
					options={{
						text: 'Archivos',
						redirect: 'files'
					}}
				>
					<ArchiveIcon />
				</RenderButtonList>
				<RenderButtonList
					options={{
						text: 'Borrar',
						redirect: 'delete'
					}}
				>
					<DeleteIcon />
				</RenderButtonList>
				<Divider />
				<RenderButtonList
					options={{
						text: 'Publicar',
						redirect: 'notice'
					}}
				>
					<NewReleasesIcon />
				</RenderButtonList>
				<RenderButtonList
					options={{
						text: 'Borrar publicación.',
						redirect: 'deleteNotices'
					}}
				>
					<DeleteSweepIcon />
				</RenderButtonList>
			</List>
		</div>
	);
};