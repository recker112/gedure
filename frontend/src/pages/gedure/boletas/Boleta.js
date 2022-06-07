import React, { useState } from 'react'

// MUI
import { Grid, Paper, Box, Tooltip } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';

// Components
import conveterCursorCode from '../../../components/Utils/converterCursoCode';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { downloadBoletaUserBF } from '../../../store/slices/gedure/boletas';

const listColors = [
  '#2f80ED',
  '#219653',
  '#f2994A',
  '#9B51E0',
  '#EB5757',
  '#c1c1c1',
];

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max + 1));
}

export default function Boleta({ 
  id, 
  lapso, 
  fecha_humano, 
  fecha_humano_modify,
  curso,
  created_at,
  updated_at,
}) {
  const [random] = useState(getRandomInt(listColors.length - 1));
  const [loadingDownload, setLoadingDonwload] = useState(false);

  const progress = useSelector(state => state.gdUserBForm.download.progress);
  const dispatch = useDispatch();

  const handleDownload = async () => {
    setLoadingDonwload(true);
    await dispatch(downloadBoletaUserBF({ id, curso, lapso }));
    setLoadingDonwload(false);
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={0} className='paper--padding'>
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Grid item xs={2} sm={3} md={3}>
              <InsertDriveFileIcon style={{fontSize: 60, color: listColors[random]}} />
            </Grid>
            <Grid item xs>
              <Box
                component='span' 
                style={{color: listColors[random]}} 
                fontSize='h6.fontSize' 
                fontWeight={600}
              >
                {conveterCursorCode(curso.curso)} {curso.seccion} - {lapso}° Lapso
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box 
                fontSize='body1.fontSize'
                color='text.disabled'
                fontWeight={600}
              >
                {(created_at === updated_at) ? `Subido ${fecha_humano}` : `Modificado ${fecha_humano_modify}`}
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent='flex-end' alignItems='center' item xs={12}>
            <Tooltip title='Descargar' arrow>
              <LoadingButton loading={loadingDownload} loadingIndicator={loadingDownload && progress < 99 ? `${progress}%` : null} onClick={handleDownload} color='inherit'>
                <DownloadIcon />
              </LoadingButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}