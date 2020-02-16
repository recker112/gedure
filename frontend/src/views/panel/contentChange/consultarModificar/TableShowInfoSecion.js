import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

function TableShowInfoSecion({ data }) {
  return (<Table aria-label="table seccion info">
    <TableHead>
      <TableRow>
        <TableCell>Cedula</TableCell>
        <TableCell>Nombre</TableCell>
        <TableCell>N° lista</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(row => {
        return (<TableRow key={row.cedula}>
          <TableCell>
            <Button>
              {row.cedula}
            </Button>
          </TableCell>
          <TableCell>
            {row.name}
          </TableCell>
          <TableCell>
            {row.lista}
          </TableCell>
        </TableRow>);
      })}
    </TableBody>
  </Table>);
}

export default TableShowInfoSecion;