//React
import React from 'react';

//React Router
import {
  Link,
  useRouteMatch,
	useLocation
} from "react-router-dom";

//Material-UI
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import toggleDrawer from '../../actions/panel/toggleDrawer';
import updateMasterPath from '../../actions/updateMasterPath';

function RenderMobileButton({
	options,
	children,
	toggleDrawer,
	updateMasterPath,
	theme,
	queryParams = null
}) {
	//Destructing.
	const { redirect, text } = options;
	
	let query = useQuery();
	
	let match;
	
	if (queryParams) {
		match = query.get(queryParams.param) === queryParams.value ? true : false;
	}else {
		match = useRouteMatch({
			path: redirect,
			exact: true
		});
	}
	
	//Fix theme
	const colorText = theme === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'white';
	
	return (
		<Link to={redirect} style={{color: colorText}}>
			<ListItem
				button
				key={text}
				onClick={() => {
					updateMasterPath(redirect);
					toggleDrawer(false);
				}}
				selected={match}
				className={match ? 'drawerItemSelected' : 'drawerItem'}
			>
				<ListItemIcon>{children}</ListItemIcon>
				<ListItemText primary={text} />
			</ListItem>
		</Link>
	);
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

//REDUX
const mapStateToProps = state => ({
	theme: state.settings.tema
});

const mapDispatchToProps = {
	toggleDrawer,
	updateMasterPath
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderMobileButton);