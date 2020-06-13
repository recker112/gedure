import React from 'react';

//Componentes
import PanelRouters from './PanelRouters';
import ShowInfoContent from '../../components/ShowInfoContent';
import { InfoContentShow } from '../../components/ListDataGlobal';

export default function RenderPanel({ content }) {
	//Titulo
	document.title = 'La Candelaria - Panel';
	
	return (
		<div className="BoxPagePanel">
			<main>
				<PanelRouters />
			</main>
			<ShowInfoContent 
				dataContent={InfoContentShow}
			/>
		</div>
	);
}