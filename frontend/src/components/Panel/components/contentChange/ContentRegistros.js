import React, { useState, useEffect } from 'react';
import { Grid, Paper  } from '@material-ui/core';

import { SelectorRegistrosDisplay } from './registros/SelectorRegistrosDisplay';
import { TableShow } from './registros/TableShow';

export function ContentRegistros() {
  const [selectSearch, setsSlectSearch] = useState('all');
  const [Req, setReq] = useState({});
  const [search, setSearch] = useState(true);

  const handleChangeSelect = (e) => {
    const value = e.target.value;

    setsSlectSearch(value);
  }

  useEffect(() => {
    setSearch(true);
    setReq({});
    if (selectSearch === 'all'){
      const res = {
        "query": {
          "status": true
        },
        "data": [
          {
          "cedula": "28438812",
          "user": "Recker",
          "accion": "Inicio de sesión",
          "opciones": {
              "desbloquear": false
            }
          },
          {
          "cedula": "12941274",
          "user": "Luis",
          "accion": "Baneo",
          "opciones": {
              "desbloquear": true
            }
          }
        ]
      }
      setReq(res);
    }else if(selectSearch === 'ban') {
      const res = {
        "query": {
          "status": true
        },
        "data": [
          {
          "cedula": "20401247",
          "user": "Fernando",
          "accion": "Baneo",
          "opciones": {
              "desbloquear": true
            }
          },
          {
          "cedula": "12941274",
          "user": "Luis",
          "accion": "Baneo",
          "opciones": {
              "desbloquear": true
            }
          }
        ]
      }
      setReq(res);
    }
    setTimeout(() => {
      setSearch(false);
    }, 2000);
  }, [selectSearch])

  return (
    <Grid container spacing={2}>
      <Grid item xs={10} sm={5} md={3}>
        <Paper>
          <SelectorRegistrosDisplay options={{selectSearch,
            handleChangeSelect}}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TableShow options={{ Req, search }} />
      </Grid>
    </Grid>
  );
}
//ERROR AQUÍ
/* No se logra solucionar el error de que setRows consiga
setear el valor de la DATA recibida, en espera de una solución.
Todo lo demás funciona correctamente pero yo no...
Yo del futuro, arregla esta vaina plo, yo ya no puedo más.
No, nada de lo que intento funciona.
NADA...... Bueno, ya que.
Dejo por aquí que en el primer UPDATE del state no lo realiza,
pero en el segundo y posterior si. Es decir, no tengo ni la
más MINIMA idea de como solventar eso..... Nada, adios.
Pos al final lo que hice fue cederles las funciones del req al
padre, ahora todo funciona correctamente. El padre es ESTE archivo,
por si acaso. xD*/