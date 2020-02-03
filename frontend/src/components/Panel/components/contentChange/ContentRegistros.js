import React, { useState, useEffect } from 'react';
import { Grid, Paper, MenuItem, Select, Button  } from '@material-ui/core';

//TABLE
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export function ContentRegistros() {
  const [selectSearch, setsSlectSearch] = useState('all');

  const handleChangeSelect = (e) => {
    const value = e.target.value;

    setsSlectSearch(value);
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper>
          <SelectorRegistrosDisplay options={{selectSearch,
            handleChangeSelect}}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <div className="Box">
            <div className="content">
              <TableShow options={{selectSearch}} />
            </div>
        </div>
      </Grid>
    </Grid>
  );
}

function SelectorRegistrosDisplay(props) {
  const { handleChangeSelect, selectSearch } = props.options;
  return (
    <div className='Box'>
      <span className='title'>Selector</span>
      <div className='content'>
        <Select className="select" 
          onChange={handleChangeSelect} 
          value={selectSearch}
        >
          <MenuItem value="all">
            <em>Todos</em>
          </MenuItem>
          <MenuItem value="ban">Baneos</MenuItem>
          <MenuItem value="login">Inicio de sesión</MenuItem>
          <MenuItem value="changePass">Cambios de contraseña</MenuItem>
        </Select>
      </div>
    </div>
  )
}

function TableShow (props) {
  const [rows, setRows] = useState([])
  const [getRows, setGetRows] = useState(false);
  const { selectSearch } = props.options;

  useEffect(() => {
    let canceled = false;

    if (!canceled) {
      const interval = setTimeout(() => {
        if (selectSearch === 'all'){
          const obj = [
            {
              cedula: 'V-12471941',
              user: 'Recker',
              accion: 'Inicio de sesión',
              opciones: [{
                buscar: true
              },{
                desbloquear: true
              }]
            }
          ]
          //ERROR AQUÍ
          /* No se logra solucionar el error de que setRows consiga
          setear el valor de la DATA recibida, en espera de una solución.
          Todo lo demás funciona correctamente pero yo no...
          Yo del futuro, arregla esta vaina plo, yo ya no puedo más.
          No, nada de lo que intento funciona.
          NADA...... Bueno, ya que.
          Dejo por aquí que en el primer UPDATE del state no lo realiza,
          pero en el segundo y posterior si. Es decir, no tengo ni la
          más MINIMA idea de como solventar eso..... Nada, adios.*/
          console.log(obj);
          console.log(selectSearch);
          setRows(obj);
          console.log(rows);
        }
      }, 2000);
    }

    return () => {
      canceled = true;
    };
  }, [selectSearch, rows]);

  if (getRows) {
    return (
      <TableContainer component={Paper} style={{maxHeight: '450px',
        overflow: 'auto'}}
      >
        <Table aria-label="Tabla de Registros" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Cédula</TableCell>
              <TableCell align="right">Usuario</TableCell>
              <TableCell align="right">Acción</TableCell>
              <TableCell align="center">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows[selectSearch].map(row => (
            <TableRow key={row.cedula}>
              <TableCell component="th" scope="row">
                <Button variant="outlined">
                  {row.cedula}
                </Button>
              </TableCell>
              <TableCell align="right">{rows.user}</TableCell>
              <TableCell align="right">{rows.accion}</TableCell>
              <TableCell align="center">
                {row.opciones.map(button => {
                  if (button.desbloquear) {
                    return (
                      <div>
                        <Button>Buscar</Button>
                        <Button>Desbloquear</Button>
                      </div>
                    )
                  }else {
                    return (
                      <Button>Buscar</Button>
                    )
                  }
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    );
  }else {
    return (
      <TableContainer component={Paper} style={{maxHeight: '450px',
        overflow: 'auto'}}
      >
        <Table aria-label="Tabla de Registros" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Cédula</TableCell>
              <TableCell align="right">Usuario</TableCell>
              <TableCell align="right">Acción</TableCell>
              <TableCell align="center">Opciones</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
  }
}