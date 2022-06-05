import React, { useState } from 'react';

// Router
import { useMatch, useNavigate, useParams } from "react-router-dom";

// MUI
import { Box, Grid, Collapse } from '@mui/material';

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

export function ReturnSelected({ children, url='', onClick, nested }) {
	const match = useMatch({
		path: url,
		exact: !Boolean(onClick),
	});
	
	let navigate = useNavigate();
	
	const handleClick = () => navigate(url, { replace: true });
	
	return (
		<Box sx={classes[nested ? 'buttonNested' : 'button']} component='span' fontSize='body1.fontSize' color={!match ? "text.secondary" : null} onClick={onClick ? onClick : handleClick}>
			{children}
		</Box>
	);
}

export default function Navs({
	user,
	path,
	permissions = true,
	toBack = true,
	children = () => {},
}) {
  const [personalNav, setPersonalNav] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

  const handleClick = () => setPersonalNav(value => !value);

  const handleReturn = () => navigate('/gedure/usuarios');

  let url = path ? path : `/gedure/usuarios/ver/${id}`;

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
        {user.privilegio === 'V-' && (
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
				{user.privilegio === 'A-' && (
					<Box mb={1}>
						<ReturnSelected url={`${url}/personal/usuario`} nested>
							Usuario
						</ReturnSelected>
					</Box>
				)}
      </Collapse>
      {user.privilegio === 'V-' && (
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
			{permissions && (
				<Box mb={1} data-tour='permisos'>
					<ReturnSelected url={`${url}/permisos`}>
						Permisos
					</ReturnSelected>
				</Box>
			)}
			<Box mb={1} data-tour='opciones'>
				<ReturnSelected url={`${url}/opciones`}>
					Opciones
				</ReturnSelected>
			</Box>

			{toBack && (
				<Box mb={1} data-tour='regresar'>
					<ReturnSelected onClick={handleReturn}>
						Regresar
					</ReturnSelected>
				</Box>
			)}

			{children(ReturnSelected)}
    </Grid>
  )
}
