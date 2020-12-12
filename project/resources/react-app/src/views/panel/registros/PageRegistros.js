import React, { useState, useRef } from 'react';

import { 
	Grid, 
	Container,
	Box,
	Button,
	Collapse,
	Badge,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';

// Components
import TableRegistros from './TableRegistros';
import ShowRegistro from './ShowRegistro';

// Redux
import { useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
}));

export default function PageRegistros() {
	document.title = 'La Candelaria - Registros';
	const [openFilter, setOpenFilter] = useState(false);
	const [countFilters, setCountFilters] = useState({});
	const tableRef = useRef(null);
	
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const handleChange = (event) => {
		const counts = countFilters;
		if (event.target.value === 'all') {
			if (counts[event.target.name]) {
				delete counts[event.target.name];
				setCountFilters({...counts});
				dispatch(updateForms('registros', true));
				tableRef.current && tableRef.current.onQueryChange();
			}
		}else {
			if (event.target.value !== counts[event.target.name]) {
				setCountFilters({...counts, [event.target.name]: event.target.value});
				dispatch(updateForms('registros', true));
				tableRef.current && tableRef.current.onQueryChange();
			}
		}
  };
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Registros</Box>
				
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Badge badgeContent={Object.keys(countFilters).length} color="primary">
							<Button 
								onClick={()=> setOpenFilter(!openFilter)} 
								startIcon={<FilterListIcon />}
							>
								Filtrador
							</Button>
						</Badge>
						
						<Collapse in={openFilter} timeout="auto" unmountOnExit>
							<Box my={2}>
								<Grid container>
									<Grid item xs={12} sm={3} md={2}>
										<FormControl style={{ width: '100%' }}>
											<InputLabel id="registros-filter-type">Tipo</InputLabel>
											<Select
												labelId="registros-filter-type"
												id="registros-filter-type-select"
												value={countFilters.type || 'all'}
												onChange={handleChange}
												name='type'
											>
												<MenuItem value='all'><em>Todos</em></MenuItem>
												<MenuItem value='gedure'>Gedure</MenuItem>
												<MenuItem value='session'>Sesión</MenuItem>
												<MenuItem value='user'>Usuario</MenuItem>
											</Select>
										</FormControl>
									</Grid>
								</Grid>
							</Box>
						</Collapse>
					</Grid>
					
					<Grid item xs={12}>
						<TableRegistros 
							tableRef={tableRef}
							filters={countFilters}
						/>
						<ShowRegistro />
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}