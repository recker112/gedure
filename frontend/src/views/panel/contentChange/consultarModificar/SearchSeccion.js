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
import ConverterCursoCode from '../../../../components/ConverterCursoCode';
import { CursosList } from '../../../../components/ListDataGlobal';
import { RenderSelect } from '../../../../components/RendersGlobal';

//Animación
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function SearchSeccion() {
	const [select, setSelect] = useState('');
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [lista, setLista] = useState([]);
	const [curso, setCurso] = useState('none');

	//Resolution RESPONSIVE DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	function handleChange(e) {
		setSelect(e.target.value);

		if (e.target.value !== '') {
			setOpen(true);
			setLoading(true);

			setTimeout(() => {
				const data = [
					{
						seccion: 'A',
						estudiantes: [
							{
								cedula: '28432441',
								name: 'Recker Ortiz',
								lista: '1',
								curso: '6',
								seccion: 'A',
								privilegio: 'V-'
							},
							{
								cedula: '94756213',
								name: 'Fernando Ortiz',
								lista: '2',
								curso: '6',
								seccion: 'A',
								privilegio: 'V-'
							},
							{
								cedula: '84759302',
								name: 'Castaño',
								lista: '3',
								curso: '6',
								seccion: 'A',
								privilegio: 'V-'
							},
							{
								cedula: '84750224',
								name: 'Luis Hernandez',
								lista: '4',
								curso: '6',
								seccion: 'A',
								privilegio: 'V-'
							},
							{
								cedula: '94750224',
								name: 'Maria ANTONIETA de las NIEVES',
								lista: '5',
								curso: '6',
								seccion: 'A',
								privilegio: 'V-'
							}
						]
					},
					{
						seccion: 'B',
						estudiantes: [
							{
								cedula: '29493812',
								name: 'Recker Ortiz',
								lista: '1',
								curso: '6',
								seccion: 'B',
								privilegio: 'V-'
							},
							{
								cedula: '93013949814',
								name: 'Fernando Ortiz',
								lista: '2',
								curso: '6',
								seccion: 'B',
								privilegio: 'V-'
							},
							{
								cedula: '818283123',
								name: 'Castaño',
								lista: '3',
								curso: '6',
								seccion: 'B',
								privilegio: 'V-'
							},
							{
								cedula: '823184812',
								name: 'Luis Hernandez',
								lista: '4',
								curso: '6',
								seccion: 'B',
								privilegio: 'V-'
							},
							{
								cedula: '11112914',
								name: 'Maria ANTONIETA de las NIEVES',
								lista: '5',
								curso: '6',
								seccion: 'B',
								privilegio: 'V-'
							}
						]
					},
					{
						seccion: 'C',
						estudiantes: [
							{
								cedula: '29493812',
								name: 'Recker Ortiz',
								lista: '1',
								curso: '6',
								seccion: 'C',
								privilegio: 'V-'
							},
							{
								cedula: '93013949814',
								name: 'Fernando Ortiz',
								lista: '2',
								curso: '6',
								seccion: 'C',
								privilegio: 'V-'
							},
							{
								cedula: '818283123',
								name: 'Castaño',
								lista: '3',
								curso: '6',
								seccion: 'C',
								privilegio: 'V-'
							},
							{
								cedula: '823184812',
								name: 'Luis Hernandez',
								lista: '4',
								curso: '6',
								seccion: 'C',
								privilegio: 'V-'
							},
							{
								cedula: '11112914',
								name: 'Maria ANTONIETA de las NIEVES',
								lista: '5',
								curso: '6',
								seccion: 'C',
								privilegio: 'V-'
							}
						]
					}
				];

				//Actualizar datos
				setLista(data);
				setCurso(ConverterCursoCode(e.target.value));
				setLoading(false);
			}, 3000);
		}
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
			<div className="searchSeccion" style={{ padding: '10px' }}>
				<RenderSelect action={handleChange} val={select} data={searchSelect} />
			</div>

			{/*DIALOG*/}
			<Dialog
				open={open}
				fullScreen={fullScreen}
				scroll="paper"
				TransitionComponent={Transition}
				aria-labelledby="popad-dialog-title"
				aria-describedby="popad-dialog-description"
			>
				<DialogTitle id="popad-dialog-title">Lista de estudiantes</DialogTitle>
				<DialogContent dividers={true}>
					{loading ? (
						<DialogContentText id="popad-dialog-description">
							<span>Buscando usuarios en la base de datos, por favor espere...</span>
						</DialogContentText>
					) : (
						<React.Fragment>
							<DialogContentText id="popad-dialog-description">
								<span>A continuación se muestran los estudiates encontrados en {curso}:</span>
							</DialogContentText>
							<TableShowInfoSecion data={lista} changeOpen={setOpen} />
						</React.Fragment>
					)}
					{loading ? (
						<CircularProgress />
					) : (
						<DialogActions>
							<Button
								color="primary"
								onClick={() => {
									setOpen(false);
								}}
							>
								Entendido
							</Button>
						</DialogActions>
					)}
				</DialogContent>
			</Dialog>
		</React.Fragment>
	);
}

export default SearchSeccion;