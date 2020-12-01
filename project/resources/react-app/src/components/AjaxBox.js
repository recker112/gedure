import React from 'react';

import { 
	Paper, 
	Typography, 
	Grid,
	Button,
	Box,
	Grow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

// Redux
import { useDispatch } from 'react-redux';
import updateForms from '../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	circleBox: {
		background: theme.palette.primary.main,
		height: 170,
		width: 170,
		borderRadius: 100,
	},
	fixHeight: {
		height: '100%'
	},
	button: {
		minWidth: 250,
	}
}));

function AjaxBox(props) {
	const { title, content, form, error=false, disableButton=false } = props;
	
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const handleContinue = () => {
		dispatch(updateForms(form, false));
	}
	
	return(
		<Grow in={true}>
		<Grid container justify='center'>
			<Grid item xs={12} sm={6}>
				<Paper className='paper--padding'>
					<Grid container spacing={4}>
						<Grid container justify='center' item xs={12}>
							<Box className={classes.circleBox}>
								<Grid 
									container 
									justify='center' 
									alignItems='center' 
									className={classes.fixHeight}
								>
									{!error ? (
										<DoneIcon className='ajaxBox__icon' />
									) : (
										<ClearIcon className='ajaxBox__icon' />
									)}
								</Grid>
							</Box>
						</Grid>
						<Grid container justify='center' item xs={12}>
							<Typography variant='h6'>
								{title}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography align='center' variant='body1'>
								{content}
							</Typography>
						</Grid>
						{!disableButton && (
							<Grid container justify='center' item xs={12}>
								<Button 
									className={classes.button}
									color='primary' 
									variant='contained' 
									onClick={handleContinue}
									disableElevation
								>
									Continuar
								</Button>
							</Grid>
						)}
					</Grid>
				</Paper>
			</Grid>
		</Grid>
		</Grow>
	);
}

export default AjaxBox;