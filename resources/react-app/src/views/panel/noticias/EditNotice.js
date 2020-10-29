import React, { useState, useEffect } from 'react';

import {
	Container,
	Grid,
	Button,
	Dialog,
	AppBar,
	Toolbar,
	DialogContent,
	Typography,
	Switch,
	FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

import AnimationDialog from './../../../components/AnimationDialog';
import LoadingComponent from './../../../components/LoadingComponent';
import { RenderInput } from './../../../components/RendersGlobals';

import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from './../../../actions/updateDialogs';

const useStyles = makeStyles((theme) => ({
	appBar: {
		alignItems: 'flex-end',
		position: 'relative',
	},
	paddingTopDialog: {
		paddingTop: theme.spacing(3),
	},
	button: {
		marginRight: theme.spacing(1),
	},
}));

function EditNotice () {
	const [progress, setProgress] = useState(0);
	
	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.editNotice.open,
		loading: state.dialogs.editNotice.loading,
		data: state.dialogs.editNotice.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const handleClose = () => {
		dispatch(updateDialogs('editNotice', false, false, 'clear'));
	};
	
	return (
		<Dialog open={open} TransitionComponent={AnimationDialog} fullScreen>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Button disabled={loading} onClick={handleClose} className={classes.button}>
						Cerrar
					</Button>
					<LoadingComponent loading={loading} progressLoading progress={progress} color="inherit">
						<label htmlFor="submit-editNotice">
							<Button variant="contained" component="span" endIcon={<SaveIcon />}>
								Guardar
							</Button>
						</label>
					</LoadingComponent>
				</Toolbar>
			</AppBar>
		</Dialog>
	)
}

export default EditNotice;