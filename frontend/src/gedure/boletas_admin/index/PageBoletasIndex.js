import React, { useState, useRef } from 'react';

import { 
	Grid, 
	Container,
	Box,
	Badge,
	Button,
	Collapse,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';

// Components
import { CursosList, SeccionList } from '../../../components/funciones/CursosList';
import TableBoletas from './TableBoletas';
import DeleteBoletas from './DeleteBoletas';
import UploadBoletas from './UploadBoletas';
import TourBoletasAdmin from './TourBoletasAdmin';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDialogs from '../../../actions/updateDialogs';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(5),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
	button: {
		marginRight: theme.spacing(1),
	},
	filter: {
		marginBottom: theme.spacing(2),
	}
}));

export default function PageBoletasIndex() {
	document.title = 'La Candelaria - Boletas';
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	const [countFilters, setCountFilters] = useState({});
	const [openFilter, setOpenFilter] = useState(false);
	const [massiveDelete, setMassiveDelete] = useState(false);
	const tableRef = useRef(null);
	
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const handleMassive = () => {
		setMassiveDelete(!massiveDelete);
	}
	
	const handleChange = (event) => {
		const counts = countFilters;
		if (event.target.value === '') {
			if (counts[event.target.name]) {
				delete counts[event.target.name];
				setCountFilters({...counts});
				dispatch(updateForms('usersIndex', true));
				tableRef.current && tableRef.current.onQueryChange();
			}
		}else {
			if (event.target.value !== counts[event.target.name]) {
				setCountFilters({...counts, [event.target.name]: event.target.value});
				dispatch(updateForms('boletasIndex', true));
				tableRef.current && tableRef.current.onQueryChange();
			}
		}
  };
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Boletas</Box>
				<Grid container>
					<Grid container justify='flex-end' item xs={12}>
						<Button 
							onClick={()=>dispatch(updateDialogs('uploadBoletas', true, false))} 
							variant='contained' 
							color='primary'
							data-tour="upload"
							disabled={!permissions?.administrar?.boletas_upload}
						>
							Cargar boletas liceo
						</Button>
					</Grid>
					
					<Grid container item xs={12}>
						<Grid item xs={12} className={classes.filter}>
							<Badge badgeContent={Object.keys(countFilters).length} color="primary">
								<Button 
									onClick={()=> setOpenFilter(!openFilter)} 
									startIcon={<FilterListIcon />}
									data-tour="filters"
								>
									Filtrador
								</Button>
							</Badge>
							
							<Collapse in={openFilter} timeout="auto" unmountOnExit>
								<Box my={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={3} md={2}>
											<FormControl style={{ width: '100%' }}>
												<InputLabel id="users-filter-curso">Curso</InputLabel>
												<Select
													labelId="users-filter-curso"
													id="users-filter-curso-select"
													value={countFilters.curso || ''}
													onChange={handleChange}
													name='curso'
												>
													<MenuItem value=''><em>Todos</em></MenuItem>
													{CursosList.map((data, i) => (
														<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={3} md={2}>
											<FormControl style={{ width: '100%' }}>
												<InputLabel id="users-filter-seccion">Sección</InputLabel>
												<Select
													labelId="users-filter-seccion"
													id="users-filter-seccion-select"
													value={countFilters.seccion || ''}
													onChange={handleChange}
													name='seccion'
												>
													<MenuItem value=''><em>Todos</em></MenuItem>
													{SeccionList.map((data, i) => (
														<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										<Grid container alignItems='center' item xs={12} sm={3} md={2}>
											<Button
												onClick={() => {
													setCountFilters({});
													dispatch(updateForms('boletasIndex', true));
													tableRef.current && tableRef.current.onQueryChange();
												}}
											>
												Limpiar filtros
											</Button>
										</Grid>
									</Grid>
								</Box>
							</Collapse>
						</Grid>
						<Grid item xs={12}>
							<TableBoletas
								tableRef={tableRef}
								filters={countFilters}
								massiveDelete={massiveDelete}
								handleMassive={handleMassive}
							/>
						</Grid>
					</Grid>
				</Grid>
				<DeleteBoletas tableRef={tableRef} />
				<UploadBoletas tableRef={tableRef} />
				<TourBoletasAdmin />
			</Container>
		</main>
	);
}