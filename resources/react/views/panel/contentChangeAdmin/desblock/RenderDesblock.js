//React
import React from 'react';

//React Route
import { useHistory } from "react-router-dom";

//Material-UI
import { Grid, Paper, Button } from '@material-ui/core';

//Components
import SearchUsers from '../../../../components/SearchUsers';
import ConverterCursoCode from '../../../../components/reutilizar/ConverterCursoCode';
import ButtonLoading from '../../../../components/ButtonLoading';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';
import updateLoading from '../../../../actions/updateLoading';

function RenderDesblock({ blockData, updateLoading, updateValue }) {
	const { loading } = blockData;
	let history = useHistory();
	
	const handleClick = ()=> {
		
	}
	
	return (
		<Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={6}>
        <Paper variant="outlined">
          <SearchUsers
						apiUrl="api/user/"
						updateData={updateValue}
						updateDataOption="DESBLOCK"
					/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper className='Box' variant="outlined">
          <span className="title">Información del usuario</span>
          <div className="content">
            <UserInfo 
							data={blockData.data} 
							updateData={updateValue} 
							loading={loading}
							history={history}
						/>
          </div>
        </Paper>
      </Grid>
    </Grid>
	)
}

function UserInfo({ loading, data, updateData, history, handleClick }){
	const {  
		cedula, 
		name, 
		privilegio, 
		curso, 
		seccion, 
		locks, 
		attemps 
	} = data;
	
	const MakeData = {
		cedula,
		name,
		privilegio,
		option: 'update',
		curso,
		seccion
	}
	
	const cursoParse = ConverterCursoCode(curso);
	
	if (cedula) {
		return (
			<Grid container spacing={2} justify="center">
				<Grid item xs={12} style={{fontSize: '20px'}}>
						Privilegio: {privilegio}
				</Grid>
				<Grid item xs={12} style={{fontSize: '20px'}}>
					Cédula: {cedula}
				</Grid>
				<Grid item xs={12} style={{fontSize: '20px'}}>
					Nombre: {name}
				</Grid>
				{privilegio === 'V-' && (
					<Grid item xs={12} style={{fontSize: '20px'}}>
						Curso: {cursoParse} sección {seccion}
					</Grid>
				)}
				<Grid container justify="center" spacing={2}>
					<Grid xs={12} sm={3} style={{textAlign: 'center'}}>
						<Button
							color="primary"
							variant="outlined"
							onClick={()=>{
								updateData(MakeData, 'MODIFY_EXTERNO');
								history.push('/panel?show=modify');
							}}
							style={{margin: '10px'}}
						>
							Editar
						</Button>
					</Grid>
					<Grid xs={12} sm={3} style={{textAlign: 'center', padding: '10px'}}>
						<ButtonLoading 
							estilo="outlined" 
							colorsito="secondary" 
							text="Desbloquear" 
							loading={loading}
							onClick={handleClick}
						/>
					</Grid>
				</Grid>
			</Grid>
		)
	}
	
	return null;
}

//Redux
const mapStateToProps = state => ({
	blockData: state.panelSettings.desblockSection
});

const mapDispatchToProps = {
	updateLoading,
	updateValue
};

export default connect(mapStateToProps,mapDispatchToProps)(RenderDesblock);