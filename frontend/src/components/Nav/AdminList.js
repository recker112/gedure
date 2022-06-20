import React from 'react';

// MUI
import { Collapse, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import {
  Cash as CashIcon,
	HammerWrench as HammerWrenchIcon,
  PiggyBank as PiggyBankIcon,
  Post as PostIcon,
} from 'mdi-material-ui';

// Components
import { ListDrawerNav } from './NoAuth';

// Redux
import { useSelector } from 'react-redux';

function GedureIcon(props) {
  return (
    <SvgIcon {...props} viewBox='200.082 335.055 89.655 109.545'>
      <path d='M 289.593 386.16 L 289.593 429.96 C 285.64 434.353 279.853 437.893 272.233 440.58 C 264.62 443.26 256.27 444.6 247.183 444.6 C 233.223 444.6 222.066 440.33 213.713 431.79 C 205.366 423.243 200.9 411.353 200.313 396.12 L 200.082 391.077 L 226.796 405.655 C 226.829 408.333 228.133 411.463 231.773 416.81 C 235.406 422.157 241.13 424.83 248.943 424.83 C 255.636 424.83 260.616 423.34 263.883 420.36 L 263.883 403.81 L 246.013 403.81 L 246.013 386.16 Z M 226.982 399.182 L 200.457 385.15 C 200.457 374.65 202.31 367.318 206.017 359.485 C 209.73 351.645 215.04 345.615 221.947 341.395 C 228.86 337.168 236.857 335.055 245.937 335.055 C 259.217 335.055 269.53 338.095 276.877 344.175 C 284.23 350.255 288.517 359.325 289.737 371.385 L 264.977 371.385 C 264.097 365.425 262.194 361.178 259.267 358.645 C 256.334 356.105 252.184 354.835 246.817 354.835 C 240.37 354.835 235.39 357.568 231.877 363.035 C 228.357 368.502 226.574 376.315 226.527 386.475 L 226.527 392.915 C 226.527 395.99 226.982 399.182 226.982 399.182 Z' />
    </SvgIcon>
  );
}

export default function AdminList({
  expand1,
  handleExpand1,
  expand2,
  handleExpand2,
}) {
  const { permissions } = useSelector(state => state.auth);
  const { registros_index } = permissions.sin_asignar;
  const { users_index, posts_index, boletas_index, contact_index } = permissions.administrar;
  const { debt_lote_index } = permissions.administrar_transac;

  return (
    <>
      {registros_index && (
        <ListDrawerNav to='/gedure/registros'>
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText primary='Registros' />
        </ListDrawerNav>
      )}

      {Object.keys(permissions.administrar).length !== 0 && (
        <>
          <ListDrawerNav noNav onClick={handleExpand1}>
						<ListItemIcon>
							<HammerWrenchIcon />
						</ListItemIcon>
						<ListItemText primary='Sistema principal' /> 
						{expand1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</ListDrawerNav>
          <Collapse in={expand1} timeout="auto" unmountOnExit>
            {users_index && (
              <ListDrawerNav nested to='/gedure/usuarios'>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary='Usuarios' />
              </ListDrawerNav>
            )}
            {posts_index && (
              <ListDrawerNav nested to='/gedure/publicaciones'>
                <ListItemIcon>
                  <PostIcon />
                </ListItemIcon>
                <ListItemText primary='Publicaciones' />
              </ListDrawerNav>
            )}
            {boletas_index && (
              <ListDrawerNav nested to='/gedure/boletas'>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Boletas" />
              </ListDrawerNav>
            )}
            {contact_index && (
              <ListDrawerNav nested to='/gedure/soli-contacto'>
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary="Solicitudes de contacto" />
              </ListDrawerNav>
            )}
          </Collapse>

          {Object.keys(permissions.administrar_transac).length !== 0 && (
            <>
              <ListDrawerNav noNav onClick={handleExpand2}>
                <ListItemIcon>
                  <CashIcon />
                </ListItemIcon>
                <ListItemText primary='Sistema de pagos' /> 
                {expand2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListDrawerNav>
              <Collapse in={expand2} timeout="auto" unmountOnExit>
                {debt_lote_index && (
                  <ListDrawerNav nested to='/gedure/lotes-deudas'>
                    <ListItemIcon>
                      <PiggyBankIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lotes de deudas" />
                  </ListDrawerNav>
                )}
              </Collapse>
            </>
          )}
          
          {Object.keys(permissions.gedure).length !== 0 && (
            <ListDrawerNav to='/gedure/config'>
              <ListItemIcon>
                <GedureIcon />
              </ListItemIcon>
              <ListItemText primary='Configurar Gedure' /> 
            </ListDrawerNav>
          )}
        </>
      )}
    </>
  )
}
