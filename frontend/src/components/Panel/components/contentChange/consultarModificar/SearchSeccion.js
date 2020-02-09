import React, { useState } from 'react';

//Material-UI
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  CircularProgress,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Componentes
import SearchSeccionInput from './SearchSeccionInput';
import TableShowInfoSecion from './TableShowInfoSecion';


function SearchSeccion() {
  const [select, setSelect] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lista, setLista] = useState([]);

  //Resolution RESPONSIVE DIALOG
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  function handleChange(e) {
    setSelect(e.target.value);
    if (e.target.value !== ''){
      setOpen(true);
      setLoading(true);

      setTimeout(() => {
        const data = [
          {
            cedula: 'V-28432441',
            name: 'Recker Ortiz',
            lista: '1',
          },
           {
            cedula: 'V-94756213',
            name: 'Fernando Ortiz',
            lista: '2',
          },
           {
            cedula: 'V-84759302',
            name: 'Castaño',
            lista: '3',
          },
           {
            cedula: 'V-84750224',
            name: 'Luis Hernandez',
            lista: '4',
          },
          {
            cedula: 'V-94750224',
            name: 'Maria ANTONIETA de las NIEVES',
            lista: '4',
          }
        ];
        setLista(data);
        setLoading(false);
      }, 3000);
    }
  }
  
  return (
    <React.Fragment>
      <SearchSeccionInput options={{handleChange, select}} />
      
      {/*DIALOG*/}
      <Dialog 
        open={open}
        fullScreen={fullScreen}
        onClose={()=>{
          setOpen(false);
        }}
        scroll="paper"
        aria-labelledby="popad-dialog-title"
        aria-describedby="popad-dialog-description"
      >
        <DialogTitle id="popad-dialog-title">Test1</DialogTitle>
        <DialogContent dividers={true}>
          {loading ? 
          <DialogContentText id="popad-dialog-description">
            <span>
              Buscando usuarios en la base de datos,
              por favor espere...
            </span>
          </DialogContentText>
          :
          <React.Fragment>
            <DialogContentText id="popad-dialog-description">
              <span>
                A continuación se muestran los estudiates
                encontrados en la sección:
              </span>
            </DialogContentText>
            <TableShowInfoSecion data={lista} />
          </React.Fragment>
          }
          {loading ? 
          <CircularProgress /> 
          : 
          <DialogActions>
            <Button color="primary" onClick={()=>{
              setOpen(false);
            }}>Entendido</Button>
          </DialogActions>
          }
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default SearchSeccion;