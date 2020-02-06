import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
  Button
} from '@material-ui/core';

export function TableShow(props) {
  //Destructurar props.
  const {Req, search} = props.options;
  const {query, data} = Req;

  //Verificar si existe query.status
  let error = (query !== undefined && query.status) ? false : true;

  if (!search && !error) {
    return <div><RenderTableOk data={data} /></div>
  }else {
    if (!search){
      return <div><RenderTableError /></div>;
    }else {
      return <div><RenderTableSearch /></div>;
    }
  }

  // if (dataReq && !search && dataReq.query.status) {
  //   return (<TableContainer component={Paper} style={{
  //     maxHeight: '450px',
  //     overflow: 'auto'
  //   }}>
  //     <Table aria-label="Tabla de Registros" size="small">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Cédula</TableCell>
  //           <TableCell align="right">Usuario</TableCell>
  //           <TableCell align="right">Acción</TableCell>
  //           <TableCell align="center">Opciones</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {dataReq.map(row => (<TableRow key={row.cedula}>
  //           <TableCell component="th" scope="row">
  //             <Button variant="outlined">
  //               {row.cedula}
  //             </Button>
  //           </TableCell>
  //           <TableCell align="right">{row.user}</TableCell>
  //           <TableCell align="right">{row.accion}</TableCell>
  //           <TableCell align="center">
  //             {row.opciones.map((button, i) => {
  //               if (button.desbloquear && !button.error) {
  //                 return (<div key={i}>
  //                   <Button>Buscar</Button>
  //                   <Button>Desbloquear</Button>
  //                 </div>);
  //               }
  //               else if (!button.desbloquear && !button.error) {
  //                 return (<Button key={i}>Buscar</Button>);
  //               }
  //               else {
  //                 return 'Error';
  //               }
  //             })}
  //           </TableCell>
  //         </TableRow>))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>);
  // }
  // else {
  //   return (<TableContainer component={Paper} style={{
  //     maxHeight: '450px',
  //     overflow: 'auto'
  //   }}>
  //     <Table aria-label="Tabla de Registros" size="small">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Cédula</TableCell>
  //           <TableCell align="right">Usuario</TableCell>
  //           <TableCell align="right">Acción</TableCell>
  //           <TableCell align="center">Opciones</TableCell>
  //         </TableRow>
  //       </TableHead>
  //     </Table>
  //     <LinearProgress style={{width: "100%"}} />
  //   </TableContainer>);
  // }
}

function RenderTableOk(props){
  const {data} = props;
  const table = (
    <TableContainer component={Paper} style={{
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
          {Object.values(data).map((row, i)=>{
            return (
              <TableRow key={i}>
                <TableCell align="center">
                  <Button variant="outlined" color="primary">
                    {row.cedula}
                  </Button>
                </TableCell>
                <TableCell align="center">{row.user}</TableCell>
                <TableCell align="center">{row.accion}</TableCell>
                <TableCell align="center">
                  {Object.values(row.opciones).map((options, i)=>{
                    if (options){
                      return (<div key={i}>
                        <Button>Modificar</Button>
                        <Button>Desbloquear</Button>
                      </div>)
                    }else {
                      return (<Button key={i}>Modificar</Button>)
                    }
                  })}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return <React.Fragment>
    {table}
  </React.Fragment>
}

function RenderTableSearch() {
  return (
    <TableContainer component={Paper} style={{
      maxHeight: '450px',
      overflow: 'auto'
    }}>
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
      <LinearProgress style={{width: "100%"}} />
    </TableContainer>
  )
}

function RenderTableError() {
  return (
    <TableContainer component={Paper} style={{
      maxHeight: '450px',
      overflow: 'auto'
    }}>
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
      <LinearProgress variant="determinate" value={100} color="secondary" style={{width: "100%"}} />
    </TableContainer>
  )
}