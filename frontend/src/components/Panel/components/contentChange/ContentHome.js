import React from 'react';
import { Paper, Grid, Grow } from '@material-ui/core';
import { AnnounceBox } from './home/AnnounceBox';

export function ContentHome() {
  return (
    <React.Fragment>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12} sm={6} md={4}>
          <AnnounceBox options={{background: '#4879FC', 
            text: 'Estudiantes registrado en el sistema',
            data: 'StudientsTotal'}}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnnounceBox options={{background: '#F8C822', 
            text: 'Estudiantes bloqueados',
            data: 'StudientsBlock'}} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnnounceBox options={{background: '#FC4850', 
            text: 'Estudiantes bloqueados permanentemente',
            data: 'StudientsPermaBlock'}} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnnounceBox options={{background: '#b448fc', 
            text: 'Noticias publicadas',
            data: 'PublicNotice'}} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnnounceBox options={{background: '#39CCCC', 
            text: '"Me gusta" recibidos',
            data: 'Likes'}} />
        </Grid>
      </Grid>
      <Grid container spacing={2} className="FixGrid">
        <Grid item xs={12}>
          <Grow in={true} timeout={500}>
            <Paper variant="outlined" className="Box">
              <span className="title">Bienvenidos</span>
              <div className="content">
                <p>
                  Le damos la bienvenida al Panel de Administación, aquí usted prodrá realizar acciones como: cargar matricula, ver registros, consultar, modificar, cargar archivos, cargar boletas, entre otros. Para más información por favor mantenga el mouse encima de la opción que desea saber más información en el menú.
                </p>
              </div>
            </Paper>
            </Grow>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}