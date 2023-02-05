import React from 'react';

// MUI
import { Box } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';

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

export const dataFAQA = {
  cde: {
    icon: <PersonIcon sx={{ fontSize: 30, color: 'white' }} />,
    sortTitle: 'Carga de estudiantes',
    title: '¿Cómo puedo cargar estudiantes?',
    color: '#219653',
    type: 'usuarios',
    priv: 'A-',
  },
  cdb: {
    icon: <InsertDriveFileIcon sx={{ fontSize: 30, color: 'white' }} />,
    sortTitle: 'Carga de boletas',
    title: '¿Cómo puedo cargar boletas?',
    color: '#2f80ED',
    type: 'boletas',
    priv: 'A-',
  },
}

export default function DataAdminFAQText({ sortTitle }) {
  if (sortTitle === 'Carga de estudiantes') {
    return (
      <>
        Para poder cargar estudiantes dentro de <strong>Gedure</strong> ustéd necesita tener una <strong>nómina en excel</strong>, esta debe contener el <strong>formato de SACE</strong>, lo único que debe tener en cuenta es que <strong>cada sección debe estar separada en una hoja</strong>, y el nombre de las hoja debe contener el <strong>código del curso</strong> al que se desean cargar <Box component='span' sx={classes.secondaryHeading}>(los códigos de los cursos los puede ver en la Configurar Gedure)</Box>. Tenga en cuenta que si un estudiante <strong>no posee correo electrónico</strong> en esa nómina, no se le podrá enviar la invitación, pero el usuario <strong>se creará de todas maneras</strong>.
        <br />
        <br />
        Si un usuario <strong>ya está creado</strong> en el sistema, simplemente se le moverá de sección y se le actualizará el nombre <Box component='span' sx={classes.secondaryHeading}>(si es que se ha cambiado)</Box>.
      </>
    )
  } else if (sortTitle === 'Carga de boletas') {
    return (
      <>
        <strong>Gedure busca automáticamente</strong> al estudiante después de <strong>encontrar una cédula</strong> en el archivo <strong>PDF</strong>, esto le permite <strong>usar cualquier formato en la boleta</strong> ya que el sistema se encargará de adaptarse al formato dado. Debe de tener en cuenta que <strong>cada boleta</strong> debe estar <strong>separada</strong> y debe de tener el <strong>formato PDF</strong>, una vez cumpla esto requisitos simplemente <strong>comprima</strong> todas las boletas en el <strong>orden que quiera</strong> en un <strong>archivo ZIP</strong> y súbalo al servidor, el sistema se encargará de distribuirlas a los estudiantes existentes.
        <br />
        <br />
        Cabe destacar que <strong>solo puede subir boletas del curso actual</strong> donde esté el estudiante, si desea modificar boletas anteriores tendrá que hacerlo manualmente.
      </>
    )
  }

  return null;
}