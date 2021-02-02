import React, { useState } from 'react';

import {
	Box,
	Grid,
	Paper,
	SvgIcon,
	IconButton,
	Tooltip,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

import { mdiFileReplaceOutline } from '@mdi/js';
import { mdiFilePdf } from '@mdi/js';

import useFetch from '../../../hooks/useFetch';

// Components
import converterCursoCode from '../../../components/funciones/converterCursoCode';
import downloadFiles from '../../../components/funciones/downloadFiles';

// Redux
import { useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

function FileReplace(props) {
  return (
    <SvgIcon {...props}>
      <path d={mdiFileReplaceOutline} />
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

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

export default function Boleta(props) {
	const { 
		id, 
		lapso, 
		fecha_humano, 
		fecha_humano_modify,
		curso_boleta,
		created_at,
		updated_at,
		handleRefresh,
	} = props;
	
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
	
	const onDownload = async () => {
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
			downloadFiles(response, `Boleta_${curso_boleta.curso}_${curso_boleta.seccion}_${lapso}_lapso.pdf`);
		}else {
			handleRefresh();
		}
	}
	
	const onReplace = () => {
		const data = {
			id,
			lapso,
			curso: converterCursoCode(curso_boleta.curso),
			seccion: curso_boleta.seccion,
		}
		dispatch(updateDialogs('replaceBoleta', true, false, data));
	}
	
	const onDelete = () => {
		const data = {
			id,
			lapso,
			curso: converterCursoCode(curso_boleta.curso),
			seccion: curso_boleta.seccion,
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
						{converterCursoCode(curso_boleta.curso)} {curso_boleta.seccion} - {lapso}° Lapso
						<Box 
							fontSize='body1.fontSize'
							color='text.disabled'
							fontWeight={600}
						>
							{(created_at === updated_at) ? `Subido ${fecha_humano}` : `Modificado ${fecha_humano_modify}`}
						</Box>
					</Box>
				</Box>
				<Box align='right'>
					<Tooltip title="Eliminar" arrow>
						<IconButton onClick={onDelete} component='span'>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Reemplazar" arrow>
						<IconButton onClick={onReplace} component='span'>
							<FileReplace />
						</IconButton>
					</Tooltip>
					<Tooltip title="Descargar" arrow>
						<IconButton onClick={onDownload} component='span'>
							<GetAppIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</Paper>
		</Grid>
	);
}