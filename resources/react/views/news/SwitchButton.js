import React from 'react';

//Material-UI
import { Paper, Grow } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import changeContentNews from '../../actions/news/changeContentNews';

function SwitchButton({ changeContentNews }) {
	const handleClickSwitch = e => {
		if (e.target.id === 'SONnoticias') {
			//Cambiar background
			document.getElementById('SONnoticias').classList.add('active');
			document.getElementById('SONanuncios').classList.remove('active');
			changeContentNews('noticias');
		} else {
			//Cambiar background
			document.getElementById('SONnoticias').classList.remove('active');
			document.getElementById('SONanuncios').classList.add('active');
			changeContentNews('anuncios');
		}
	};
	return (
		<div className="SwitchOptionNews">
			<Grow in={true}>
				<Paper variant="outlined">
					<span id="SONnoticias" className={`ItemSwitchNews active`} onClick={handleClickSwitch}>
						Noticias
					</span>
					<span id="SONanuncios" className="ItemSwitchNews" onClick={handleClickSwitch}>
						Anuncios
					</span>
				</Paper>
			</Grow>
		</div>
	);
}

//REDUX

const mapDispatchToProps = {
	changeContentNews
};

export default connect(null, mapDispatchToProps)(SwitchButton);