import React from 'react';

//Material-UI
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';

//Componentes
import PanelRouters from './PanelRouters';
import ShowInfoContent from '../../components/ShowInfoContent';
import { InfoContentShowPanel } from '../../components/ListDataGlobal';

export default function RenderPanel() {
	//Titulo
	document.title = 'La Candelaria - Panel';
	
	//Resolution RESPONSIVE
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	const classMobile = fullScreen ? 'Container--Mobile' : '';
	
	return (
		<React.Fragment>
			<main className={`Container ${classMobile}`}>
				<PanelRouters />
			</main>
			<ShowInfoContent 
				dataContent={InfoContentShowPanel}
			/>
		</React.Fragment>
	);
}