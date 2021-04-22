import React, { useState } from 'react';

import {
	Box,
	Grid,
	Paper,
	IconButton,
	Tooltip,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

import {
	FileReplaceOutline as FileReplace,
	FilePdf as FilePdfIcon,
} from 'mdi-material-ui';

import useFetch from '../../../hooks/useFetch';

// Components
import converterCursoCode from '../../../components/funciones/converterCursoCode';
import downloadFiles from '../../../components/funciones/downloadFiles';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

export default function Boleta(props) {
	const { 
		id, 
		lapso, 
		fecha_humano, 
		fecha_humano_modify,
		curso,
		created_at,
		updated_at,
		handleRefresh,
	} = props;
	
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const listColors = [
		'#2f80ED',
		'#0F3F6A',
		'#219653',
		'#f2994A',
		'#9B51E0',
		'#EB5757',
		'#333333',
	];
	
	const [random] = useState(getRandomInt(listColors.length -1));
	const [loading, setLoading] = useState(false);
	
	const onDownload = async () => {
		setLoading(true);
		const prepare = {
			url: `v1/download/boleta/${id}`,
			type: 'get',
			messageToFinish: false,
			data: {
				responseType: 'blob',
			}
		};

		const response = await fetchData(prepare);

		if (response) {
			downloadFiles(response, `Boleta_${curso.curso}-${curso.seccion}_${lapso}_lapso.pdf`);
			setLoading(false);
		}else {
			handleRefresh();
		}
	}
	
	const onReplace = () => {
		const data = {
			id,
			lapso,
			curso: converterCursoCode(curso.curso),
			seccion: curso.seccion,
		}
		dispatch(updateDialogs('replaceBoleta', true, false, data));
	}
	
	const onDelete = () => {
		const data = {
			id,
			lapso,
			curso: converterCursoCode(curso.curso),
			seccion: curso.seccion,
		}
		dispatch(updateDialogs('deleteConfirmation', true, false, data));
	}
	
	return(
		<Grid item xs={12} sm={6} md={4}>
			<Paper elevation={0} className='paper--padding'>
				<Box display='flex'>
					<Box mr={1} component='span'>
						<FilePdfIcon style={{fontSize: 60, color: listColors[random]}}/>
					</Box>
					<Box 
						component='span' 
						style={{color: listColors[random]}} 
						fontSize='h6.fontSize' 
						fontWeight={600}
					>
						{converterCursoCode(curso.curso)} {curso.seccion} - {lapso}° Lapso
						<Box 
							fontSize='body1.fontSize'
							color='text.disabled'
							fontWeight={600}
						>
							{(created_at === updated_at) ? `Subido ${fecha_humano}` : `Modificado ${fecha_humano_modify}`}
						</Box>
					</Box>
				</Box>
				<Grid container justify='flex-end' alignItems='center'>
					<Tooltip title="Eliminar" arrow>
						<IconButton 
							onClick={onDelete} 
							component='span'
							disabled={!permissions?.administrar?.boletas_destroy}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Reemplazar" arrow>
						<IconButton 
							onClick={onReplace} 
							component='span' 
							disabled={!permissions?.administrar?.boletas_edit}
						>
							<FileReplace />
						</IconButton>
					</Tooltip>
					<LoadingComponent loading={loading}>
						<Tooltip title="Descargar" arrow>
							<IconButton onClick={onDownload} component='span'>
								<GetAppIcon />
							</IconButton>
						</Tooltip>
					</LoadingComponent>
				</Grid>
			</Paper>
		</Grid>
	);
}