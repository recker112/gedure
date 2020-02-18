//React
import React from 'react';

//Redux
import { connect } from 'react-redux';

//Material-UI
import { Button, CircularProgress } from '@material-ui/core';

function ButtonForm({ validating }) {
	if (validating) {
		return <CircularProgress />;
	} else {
		return (
			<Button variant="contained" type="submit" color="primary">
				Acceder
			</Button>
		);
	}
}

//REDUX
const mapStateToProps = state => ({
	validating: state.loginStatus.validating
});

export default connect(mapStateToProps)(ButtonForm);