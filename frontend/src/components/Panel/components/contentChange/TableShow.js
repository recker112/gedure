import React from 'react';

export function TableShow(props) {
  //Destructurar props.
  const {Req, search} = props.options;
  console.log(Req);
  console.log(search);
  if (!search && Req.data) {
    return (<h1>YESS</h1>)
  }else {
    return <div>Buscando...</div>;
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