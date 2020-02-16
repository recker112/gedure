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
import ConverterCursoCode from '../../../../components/reutilizar/ConverterCursoCode';


function SearchSeccion() {
  const [select, setSelect] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lista, setLista] = useState([]);
	const [curso, setCurso] = useState("none");

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
            curso: '6',
            seccion: 'A',
            privilegio: 'V-',
          },
           {
            cedula: 'V-94756213',
            name: 'Fernando Ortiz',
            lista: '2',
            curso: '6',
            seccion: 'A',
            privilegio: 'V-',
          },
           {
            cedula: 'V-84759302',
            name: 'Castaño',
            lista: '3',
            curso: '6',
            seccion: 'A',
            privilegio: 'V-',
          },
           {
            cedula: 'V-84750224',
            name: 'Luis Hernandez',
            lista: '4',
            curso: '6',
            seccion: 'A',
            privilegio: 'V-',
          },
          {
            cedula: 'V-94750224',
            name: 'Maria ANTONIETA de las NIEVES',
            lista: '4',
            curso: '6',
            seccion: 'A',
            privilegio: 'V-',
          }
        ];
				
				//Actualizar datos
        setLista(data);
				setCurso(ConverterCursoCode(e.target.value));
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
        <DialogTitle id="popad-dialog-title">Lista de estudiantes</DialogTitle>
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
                encontrados en {curso}:
              </span>
            </DialogContentText>
            <TableShowInfoSecion data={lista} changeOpen={setOpen} />
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