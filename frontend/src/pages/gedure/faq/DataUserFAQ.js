import React from 'react';

// MUI
import { Box } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const classes = {
  heading: (theme) => ({
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }),
  secondaryHeading: (theme) => ({
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  })
}

export const dataFAQV = {
  npdb: {
    icon: <InsertDriveFileIcon sx={{ fontSize: 30, color: 'white' }} />,
    sortTitle: 'No puedo descargar boletas',
    title: '¿Por qué no puedo descargar boletas?',
    color: '#2f80ED',
    type: 'boletas',
  },
}

export default function DataUserFAQText({ sortTitle }) {
  if (sortTitle === 'No puedo descargar boletas') {
    return (
      <>
        Si recibe el <strong>error "No tienes permisos para esta acción"</strong> al intentar <strong>descargar</strong> sus boletas es posible que tenga las boletas desactivadas, para poder solucionar este problema <strong>contacte directamente con un directivo</strong> del instituto <Box component='span' sx={classes.secondaryHeading}>(preferiblemente control de estudio)</Box> para poder solventar este inconveniente.
      </>
    )
  }

  return null;
}