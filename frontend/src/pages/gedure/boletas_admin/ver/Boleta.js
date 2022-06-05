import React, { useState } from 'react'

// MUI
import { Grid, Paper, Box, Tooltip } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
	FileReplaceOutline as FileReplace,
} from 'mdi-material-ui';

// Components
import conveterCursorCode from '../../../../components/Utils/converterCursoCode';

// Redux
import { useDispatch } from 'react-redux';
import { setConfgsBC } from '../../../../store/slices/gedure/boletas_admin/confirmDialogs';

const listColors = [
  '#2f80ED',
  '#0F3F6A',
  '#219653',
  '#f2994A',
  '#9B51E0',
  '#EB5757',
  '#333333',
];

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
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
  const [random] = useState(getRandomInt(listColors.length -1));

  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(setConfgsBC({open: true, data: { curso, lapso, id }, confirm: 'deleteBoleta'}))
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
            <Tooltip title='Eliminar' arrow>
              <LoadingButton onClick={handleDelete} color='inherit'>
                <DeleteForeverIcon />
              </LoadingButton>
            </Tooltip>
            <Tooltip title='Reemplazar' arrow>
              <LoadingButton color='inherit'>
                <FileReplace />
              </LoadingButton>
            </Tooltip>
            <Tooltip title='Descargar' arrow>
              <LoadingButton color='inherit'>
                <DownloadIcon />
              </LoadingButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
