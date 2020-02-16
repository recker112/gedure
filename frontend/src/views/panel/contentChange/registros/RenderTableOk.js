import React from 'react';

//Material-UI
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Hidden } from '@material-ui/core';

//Componentes
import UserUnlock from './UserUnlock';
import UserModify from './UserModify';

function RenderTableOk({data}) {
  const table = (<TableContainer component={Paper} style={{
    maxHeight: '450px',
    overflow: 'auto'
  }}>
    <Table aria-label="Tabla de Registros" size="small">
      <TableHead>
        <TableRow>
          <TableCell align="center">Cédula</TableCell>
          <Hidden smDown>
            <TableCell align="center">Usuario</TableCell>
          </Hidden>
          <TableCell align="center">Acción</TableCell>
          <TableCell align="center">Opciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(data).map((row, i) => {
          return (<TableRow key={i}>
            <TableCell align="center">
              {row.cedula}
            </TableCell>
            <Hidden smDown>
              <TableCell align="center">{row.name}</TableCell>
            </Hidden>
            <TableCell align="center">{row.accion}</TableCell>
            <TableCell align="center">
              {Object.values(row.opciones).map((options, i) => {
                return (
                  <div key={i}>
                    <UserModify data={row} />
                    {options ? <UserUnlock cedula={row.cedula} /> : null}
                  </div>
                )
              })}
            </TableCell>
          </TableRow>);
        })}
      </TableBody>
    </Table>
  </TableContainer>);
  return <React.Fragment>
    {table}
  </React.Fragment>;
}

export default RenderTableOk; 