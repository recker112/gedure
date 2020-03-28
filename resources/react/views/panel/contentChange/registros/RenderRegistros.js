import React, { useState, useEffect } from 'react';

//Material-UI
import { Grid, Paper } from '@material-ui/core';

//Componentes
import RenderTableOk from './RenderTableOk';
import RenderTableError, { RenderTableSearch } from './RenderTableStatus';
import { RenderSelect } from '../../../../components/RendersGlobal';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';

function RenderRegistros({ dataLog, updateInputValue }) {
	//Destructing
	const { selectSearch, dataTable, searching } = dataLog;

	useEffect(
		() => {
			let cancel = false;

			//Iniciar effecto de busqueda.
			updateInputValue(true, 'LOGS_SEARCHING');
			//Descargar datos
			updateInputValue(null, 'LOGS_DATATABLE');

			//FetchData
			const fetchData = async option => {
				try {
					//Consulta
					const res = await axios.get(`api/logs?get=${option}`);

					if (res.status !== 200) {
						throw new Error(res.data);
					}

					if (!cancel) {
						//Set datos
						updateInputValue(res.data, 'LOGS_DATATABLE');
					}
				} catch (error) {
					//Destructing
					const { data } = error.response;

					updateInputValue(data, 'LOGS_ERROR');
				}
				//Finalizar effecto de busqueda.
				updateInputValue(false, 'LOGS_SEARCHING');
			};

			//PETICION
			fetchData(selectSearch);
			//Al desmontar
			return () => {
				cancel = true;
			};
		},
		[selectSearch]
	);

	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} sm={5} md={3}>
				<Paper variant="outlined">
					<SelectorRegistrosDisplay select={selectSearch} updateInputValue={updateInputValue} />
				</Paper>
			</Grid>
			<Grid item xs={10}>
				<TableShow search={searching} dataTable={dataTable} />
			</Grid>
		</Grid>
	);
}

function TableShow({ search, dataTable }) {
	//Verificar si existe data
	let noData = dataTable !== null && dataTable.length > 0 ? false : true;

	if (!search && !noData) {
		return (
			<div>
				<RenderTableOk />
			</div>
		);
	} else {
		if (!search) {
			return (
				<div>
					<RenderTableError />
				</div>
			);
		} else {
			return (
				<div>
					<RenderTableSearch />
				</div>
			);
		}
	}
}

function SelectorRegistrosDisplay({ select, updateInputValue }) {
	const handleChangeSelect = e => {
		const value = e.target.value;

		updateInputValue(value, 'LOGS_SELECT');
	};

	//Config de registros
	const registSelect = {
		name: 'registros',
		values: [
			{
				value: 'all',
				name: 'Todos'
			},
			{
				value: 'bans',
				name: 'Baneados'
			},
			{
				value: 'session',
				name: 'Inicio de sesión'
			},
			{
				value: 'changePass',
				name: 'Cambio de contraseña'
			}
		]
	};

	return (
		<div className="Box">
			<span className="title">Buscar Registros</span>
			<div className="content">
				<RenderSelect
					action={handleChangeSelect}
					val={select}
					data={registSelect}
					classNameSet="select"
					customWidth="auto"
					empty={false}
				/>
			</div>
		</div>
	);
}
//ERROR AQUÍ
/* No se logra solucionar el error de que setRows consiga
setear el valor de la DATA recibida, en espera de una solución.
Todo lo demás funciona correctamente pero yo no...
Yo del futuro, arregla esta vaina plo, yo ya no puedo más.
No, nada de lo que intento funciona.
NADA...... Bueno, ya que.
Dejo por aquí que en el primer UPDATE del state no lo realiza,
pero en el segundo y posterior si. Es decir, no tengo ni la
más MINIMA idea de como solventar eso..... Nada, adios.
Pos al final lo que hice fue cederles las funciones del req al
padre, ahora todo funciona correctamente. El padre es ESTE archivo,
por si acaso. xD*/

const mapStateToProps = state => ({
	dataLog: state.panelSettings.logsSection
});

const mapDispatchToProps = {
	updateInputValue
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderRegistros);