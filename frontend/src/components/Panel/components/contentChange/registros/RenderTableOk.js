import React from 'react';

import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';

export function RenderTableOk(props) {
  const { data } = props;
  const table = (<TableContainer component={Paper} style={{
    maxHeight: '450px',
    overflow: 'auto'
  }}>
    <Table aria-label="Tabla de Registros" size="small">
      <TableHead>
        <TableRow>
          <TableCell align="center">Cédula</TableCell>
          <TableCell align="center">Usuario</TableCell>
          <TableCell align="center">Acción</TableCell>
          <TableCell align="center">Opciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(data).map((row, i) => {
          return (<TableRow key={i}>
            <TableCell align="center">
              <Button variant="outlined" color="primary">
                {row.cedula}
              </Button>
            </TableCell>
            <TableCell align="center">{row.user}</TableCell>
            <TableCell align="center">{row.accion}</TableCell>
            <TableCell align="center">
              {Object.values(row.opciones).map((options, i) => {
                if (options) {
                  return (<div key={i}>
                    <Button>Modificar</Button>
                    <Button>Desbloquear</Button>
                  </div>);
                }
                else {
                  return (<Button key={i}>Modificar</Button>);
                }
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
