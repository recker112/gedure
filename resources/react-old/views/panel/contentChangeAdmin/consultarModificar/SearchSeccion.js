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
	useMediaQuery,
	Slide
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Componentes
import TableShowInfoSecion from './TableShowInfoSecion';
import ConverterCursoCode from '../../../../components/reutilizar/ConverterCursoCode';
import { CursosList } from '../../../../components/ListDataGlobal';
import { RenderSelect } from '../../../../components/RendersGlobal';
import AnimationDialog from '../../../../components/AnimationDialog';

function SearchSeccion() {
	const [select, setSelect] = useState('');
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [lista, setLista] = useState([]);
	const [curso, setCurso] = useState('none');
	const [error, setError] = useState('');

	//Resolution RESPONSIVE DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	const fetchData = async (curso)=>{
		//Descargar lista
		setLista([]);
		try {
			const res = await axios.get(`api/curso/${curso}`);
			
			//Actualizar datos
			setLista(res.data);
			setCurso(ConverterCursoCode(curso));
		} catch (error) {
			const { status, data } = error.response;
			
			if (status === 403){
				setError(data.description + '.');
			}else if (status === 400){
				setError(data.description + '.');
			}else if (status === 500){
				setError('No se ha podido conectar con la base de datos.');
			}else {
				setError('Error interno en el sistema.');
			}
		}
		//Quitar loading
		setLoading(false);
	}

	function handleChange(e) {
		const curso = e.target.value;
		setSelect(curso);

		if (curso !== '') {
			setOpen(true);
			setLoading(true);

			fetchData(curso);
		}
	}
	
	const handleClose = () => {
		setOpen(false);
		setSelect('');
	}

	//Config de seccionSearch
	const searchSelect = {
		name: 'seachSeccion',
		values: [
			{
				value: '',
				name: 'Buscar Sección...'
			},
			...CursosList
		]
	};

	return (
		<React.Fragment>
			<div className="SearchSeccion" style={{ padding: '10px' }}>
				<RenderSelect action={handleChange} val={select} data={searchSelect} />
			</div>

			{/*DIALOG*/}
			<Dialog
				open={open}
				fullScreen={fullScreen}
				scroll="paper"
				TransitionComponent={AnimationDialog}
				aria-labelledby="popad-dialog-title"
				aria-describedby="popad-dialog-description"
			>
				<DialogTitle id="popad-dialog-title">Lista de estudiantes</DialogTitle>
				<DialogContent dividers={true}>
					{loading ? (
						<DialogContentText id="popad-dialog-description">
							<span>
								Buscando usuarios en la base de datos, por favor espere...
							</span>
						</DialogContentText>
					) : 
					lista.length > 0 ?
					(
						<React.Fragment>
							<DialogContentText id="popad-dialog-description">
								<span>
									A continuación se muestran los estudiates encontrados en {curso}:
								</span>
							</DialogContentText>
							<TableShowInfoSecion data={lista} changeOpen={handleClose} />
						</React.Fragment>
					)
					:
					(
						<React.Fragment>
							<DialogContentText id="popad-dialog-description">
								<span>
									{error}
								</span>
							</DialogContentText>
						</React.Fragment>
					)
					}
					{loading && <CircularProgress />}
				</DialogContent>
        {!loading && 
          <DialogActions>
            <Button
              color="primary"
              onClick={handleClose}
            >
              Entendido
            </Button>
          </DialogActions>
        }
			</Dialog>
		</React.Fragment>
	);
}

export default SearchSeccion;