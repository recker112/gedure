import React from 'react';

//Componentes
import RenderHeaderNoAuth from './HeaderRenders/RenderHeaderNoAuth';
import RenderHeaderAuth from './HeaderRenders/RenderHeaderAuth';

//Redux
import { connect } from 'react-redux';

function HeaderMenu({auth}){
	if (auth) {
		return <RenderHeaderAuth />
	}
	
	return <RenderHeaderNoAuth />
}

const mapStateToProps = (state) => ({
  auth: state.loginStatus.auth
})

export default connect(mapStateToProps)(HeaderMenu);