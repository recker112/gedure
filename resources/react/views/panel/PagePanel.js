import React from 'react';

//Componentes
import PanelRouters from './PanelRouters';
import ShowInfoContent from '../../components/ShowInfoContent';
import { InfoContentShowPanel } from '../../components/ListDataGlobal';

export default function RenderPanel() {
	//Titulo
	document.title = 'La Candelaria - Panel';
	
	return (
		<React.Fragment>
			<main className='Container'>
				<PanelRouters />
			</main>
			<ShowInfoContent 
				dataContent={InfoContentShowPanel}
			/>
		</React.Fragment>
	);
}