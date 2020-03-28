import React from 'react';

//Material-UI
import { Paper, Grow } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import changeContentNews from '../../actions/news/changeContentNews';

function SwitchButton({ changeContentNews, content }) {
	//Select Class
	const classNameN = content === 'noticias' ? 'ItemSwitchNews active' : 'ItemSwitchNews';
	const classNameA = content === 'anuncios' ? 'ItemSwitchNews active' : 'ItemSwitchNews';
	
	//HanldeClick
	const handleClickSwitch = e => {
		if (e.target.id === 'SwitchNoticias') {
			changeContentNews('noticias');
		} else {
			changeContentNews('anuncios');
		}
	};
	
	return (
		<div className="SwitchOptionNews">
			<Grow in={true}>
				<Paper variant="outlined">
					<span id="SwitchNoticias" 
						className={classNameN} 
						onClick={handleClickSwitch}
					>
						Noticias
					</span>
					<span id="SwitchAnuncios"
						className={classNameA} 
						onClick={handleClickSwitch}
					>
						Anuncios
					</span>
				</Paper>
			</Grow>
		</div>
	);
}

//REDUX
const mapStateToProps = state => ({
	content: state.news.content
});

const mapDispatchToProps = {
	changeContentNews
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchButton);