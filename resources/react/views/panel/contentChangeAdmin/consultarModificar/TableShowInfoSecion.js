//React
import React, { useState } from 'react';

//Material-UI
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
	Tab,
	Tabs,
	Typography,
	Box,
} from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';

function TableShowInfoSecion({ data, changeOpen, updateValue }) {
	const [tabValue, setTabValue] = useState(0);

	const handleChange = (e, value) => {
		setTabValue(value);
	};
	
	//Selector de panel a controlar
	function a11yProps(index) {
		return {
			id: `seccion-tab-${index}`,
			'aria-controls': `seccion-tabpanel-${index}`
		};
	}

	return (
		<React.Fragment>
			<Tabs
				value={tabValue}
				indicatorColor="primary"
				onChange={handleChange}
				aria-label="Tab seccion"
				variant="scrollable"
				scrollButtons="auto"
			>
				{data.map((curso, i) => {
					return <Tab 
						key={i} 
						label={`Sección ${curso.seccion}`} 
						{...a11yProps(i)} 
					/>;
				})}
			</Tabs>
			{data.map((curso, i) => {
				return (
					<TabPanel key={i} value={tabValue} index={i}>
						<RenderTable 
							data={curso.estudiantes} 
							changeOpen={changeOpen}
							update={updateValue}
						/>
					</TabPanel>
				);
			})}
		</React.Fragment>
	);
}

/*
Renderizador de tablas.
*/
function RenderTable({ data, changeOpen, update }) {
	
	if (data.length > 0) {
		return (
			<Table aria-label="table seccion info">
				<TableHead>
					<TableRow>
						<TableCell>Cedula</TableCell>
						<TableCell>Nombre</TableCell>
						<TableCell>N° lista</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(row => {
						return (
							<TableRow key={row.cedula}>
								<TableCell>
									<Button
										variant="outlined"
										onClick={() => {
											delete row.lista;
											update(row,'MODIFY_EXTERNO');
											changeOpen();
										}}
									>
										{row.privilegio + row.cedula}
									</Button>
								</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.lista}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		);
	}
	
	return (
		<div style={{textAlign: 'center'}}>
			<p>No hay estudiantes.</p>
		</div>
	)
}

/*
Creador de panels en TABS, tomado de
material-UI
*/
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`seccion-tabpanel-${index}`}
			aria-labelledby={`seccion-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

const mapDispatchToProps = {
	updateValue
};

export default connect(null, mapDispatchToProps)(TableShowInfoSecion);