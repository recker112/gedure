import React from 'react';

//Componentes
import ChangeAvatar from './ChangeAvatar';
import ChangePassword from './ChangePassword';

//Material-UI
import { Paper, Grid } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';

function PageAccount({ privilegio }) {
	//Titulo
	document.title = 'La Candelaria - Account';
	
	const Skeleton = ({title, content})=> (
		<Grid item xs={12} sm={12} md={6}>
			<Paper className='Box'>
				<span className='Box__Title Box__Title--NoBorder'>
					{title}
				</span>
				<div className='Box__Content'>
					{content}
				</div>
			</Paper>
		</Grid>
	);
	
	const OptionsList = [
		{
			access: ['CR-', 'A-'],
			skeleton: <Skeleton 
				title='Cambiar Avatar'
				content={<ChangeAvatar />}
			/>
		},
		{
			skeleton: <Skeleton 
				title='Cambiar Contraseña'
				content={<ChangePassword />}
			/>
		},
		
	]
	
	return (
		<main className='Container'>
			<Grid container spacing={2}>
				{OptionsList.map((option, i)=>{
					let renderOption = true;
					
					//Verificar privilegio
					if (option.access) {
						let found = false;
						option.access.map((access)=>{
							if (access === privilegio) {
								renderOption = true;
								found = true;
							}

							if (!found) {
								renderOption = false;
							}

							return null;
						});
					}
					
					if (renderOption) {
						return <React.Fragment key={i}>
							{option.skeleton}
						</React.Fragment>
					}
					
					return null;
				})}
			</Grid>
		</main>
	);
}

//REDUX
const mapStateToProps = (state) => ({
  privilegio: state.userData.privilegio
});

export default connect(mapStateToProps)(PageAccount);