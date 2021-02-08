import React, { useEffect, useState, useCallback } from 'react';

import {
	Grid,
	Avatar,
	Button,
	Divider,
	Box,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		height: theme.spacing(10),
		width: theme.spacing(10),
	}
}));

export function PerfilAvatarForm(props) {
	const { user, loading, progress, handleChange } = props;
	
	const classes = useStyles();
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant='h6' component='span' className='text__bold--semi'>
					Avatar del usuario
				</Typography>
				<Box mt={1}>
					<Divider />
				</Box>
			</Grid>
			<Grid container alignItems='center' spacing={2} item xs={12}>
				<Grid item>
					<Avatar 
						alt='Avatar User' 
						src={user.avatar} 
						className={classes.avatar}
					>
						{user.name.substring(0, 1).toUpperCase()}
					</Avatar>
				</Grid>
				<Grid item>
					<input 
						id='update_avatar_user' 
						type='file' 
						style={{display: 'none'}}
						accept="image/*"
						name='avatar' 
						onChange={handleChange}
						value=''
					/>
					<label htmlFor='update_avatar_user'>
						<LoadingComponent 
							loading={loading} 
							progressLoading 
							progress={progress}
						>
							<Button variant='contained' color='primary' component='span' disableElevation>
								Cambiar avatar
							</Button>
						</LoadingComponent>
					</label>
				</Grid>
				<Grid item>
					<Button 
						onClick={()=>handleChange({target:{name:'avatar',files:['delete']}})} 
						variant='outlined'
						disabled={loading}
					>
						Quitar avatar
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default function PerfilAvatar({ id }) {
	const [progress, setProgress] = useState(0);
	const { user, loading, data, userData } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updateAvatar.loading,
		data: state.forms.updateAvatar.data,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);
	
	useEffect(()=>{
		const changeAvatar = async () => {
			dispatch(updateForms('updateAvatar', true));
			
			// FormData
			const formData = new FormData();
			if (data.avatar === 'delete') {
				formData.append('delete_avatar', true);
			}else {
				formData.append('avatar', data.avatar);
			}
			formData.append('_method', 'PUT');
			
			const prepare = {
				url: `v1/user/${id}`,
				type: 'post',
				data: formData,
				otherData: {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					onUploadProgress: onUploadProgress,
				},
				successText: 'Avatar actualizado',
			};

			const response = await fetchData(prepare);

			if (response) {
			
				dispatch(updateForms('showUser', false, response));
				
				if (response.user.id === userData.id) {
					dispatch(updateDataUser({
						user: response.user
					}));
				}
			}
			
			dispatch(updateForms('updateAvatar', false, {}));
			setProgress(0);
		}
		
		if (data.avatar) {
			changeAvatar();
		}
		// eslint-disable-next-line
	},[data.avatar]);
	
	const handleChange = (e) => {
		dispatch(updateForms('updateAvatar', false, {
			[e.target.name]: e.target.files[0]
		}));
	}
	
	return (
		<Box mb={4}>
			<PerfilAvatarForm 
				user={user}
				handleChange={handleChange}
				progress={progress}
				loading={loading}
			/>
		</Box>
	);
}