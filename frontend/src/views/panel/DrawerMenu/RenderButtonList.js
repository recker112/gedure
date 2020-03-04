//React
import React from 'react';

//Material-UI
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import toggleDrawer from '../../../actions/panel/toggleDrawer';
import updatePanelContent from '../../../actions/panel/updatePanelContent';
import updateIndexDrawer from '../../../actions/panel/updateIndexDrawer';

function RenderMobileButton({
	options,
	children,
	updatePanelContent,
	toggleDrawer,
	indexPass,
	index,
	updateIndexDrawer
}) {
	//Regresar boton de MOBIL, es decir, sin el tooltip.
	const { redirect, text } = options;
	return (
		<ListItem
			button
			key={text}
			onClick={() => {
				updatePanelContent(redirect);
				toggleDrawer();
				updateIndexDrawer(indexPass);
			}}
			selected={index === indexPass}
      className={index === indexPass ? 'drawerSelect' : null}
		>
			<ListItemIcon>{children}</ListItemIcon>
			<ListItemText primary={text} />
		</ListItem>
	);
}

//REDUX
const mapStateToProps = state => ({
	index: state.panelSettings.drawer.index
});

const mapDispatchToProps = {
	updatePanelContent,
	toggleDrawer,
	updateIndexDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderMobileButton);