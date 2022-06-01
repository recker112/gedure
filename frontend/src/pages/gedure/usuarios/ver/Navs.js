import React, { useState } from 'react';

// Router
import { useMatch, useNavigate, useParams } from "react-router-dom";

// MUI
import { Box, Grid, Collapse } from '@mui/material';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  button: {
		cursor: 'pointer',
		userSelect: 'none'
	},
	buttonNested: tema => ({
		cursor: 'pointer',
		ml: tema.spacing(2),
		userSelect: 'none'
	})
}

export function ReturnSelected(props) {
	const { children, url='', onClick, nested } = props;
	
	const match = useMatch({
		path: url,
		exact: !Boolean(onClick),
	});
	
	let navigate = useNavigate();
	
	const handleClick = () => navigate(url);
	
	return (
		<Box sx={classes[nested ? 'buttonNested' : 'button']} component='span' fontSize='body1.fontSize' color={!match ? "text.secondary" : null} onClick={onClick ? onClick : handleClick}>
			{children}
		</Box>
	);
}

export default function Navs() {
  const [personalNav, setPersonalNav] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

  const userSelected = useSelector(state => state.gdUSelected.userSelected);

  const handleClick = () => setPersonalNav(value => !value);

  const handleReturn = () => navigate('/gedure/usuarios');

  let url = `/gedure/usuarios/ver/${id}`;

  return (
    <Grid item xs={12} sm={3}>
      <Box mb={1}>
        <ReturnSelected url={`${url}`}>
          Perfil
        </ReturnSelected>
			</Box>
      <Box mb={1}>
        <ReturnSelected url={`${url}/personal`} onClick={handleClick}>
          Datos personales
        </ReturnSelected>
			</Box>
      <Collapse in={personalNav} timeout="auto" unmountOnExit>
        {userSelected.privilegio === 'V-' && (
					<React.Fragment>
						<Box mb={1}>
							<ReturnSelected url={`${url}/personal/estudiante`} nested>
								Estudiante
							</ReturnSelected>
						</Box>
						<Box mb={1}>
							<ReturnSelected url={`${url}/personal/representante`} nested>
								Representante
							</ReturnSelected>
						</Box>
						<Box mb={1}>
							<ReturnSelected url={`${url}/personal/padres`} nested>
								Padres
							</ReturnSelected>
						</Box>
					</React.Fragment>
				)}
				{userSelected.privilegio === 'A-' && (
					<Box mb={1}>
						<ReturnSelected url={`${url}/personal/usuario`} nested>
							Usuario
						</ReturnSelected>
					</Box>
				)}
      </Collapse>
      {userSelected.privilegio === 'V-' && (
				<Box mb={1}>
					<ReturnSelected url={`${url}/curso`}>
						Curso
					</ReturnSelected>
				</Box>
			)}
      <Box mb={1} data-tour='contraseña'>
				<ReturnSelected url={`${url}/credenciales`}>
					Credenciales
				</ReturnSelected>
			</Box>
			<Box mb={1} data-tour='permisos'>
				<ReturnSelected url={`${url}/permisos`}>
					Permisos
				</ReturnSelected>
			</Box>
			<Box mb={1} data-tour='opciones'>
				<ReturnSelected url={`${url}/opciones`}>
					Opciones
				</ReturnSelected>
			</Box>

			<Box mb={1} data-tour='regresar'>
				<ReturnSelected onClick={handleReturn}>
					Regresar
				</ReturnSelected>
			</Box>
    </Grid>
  )
}
