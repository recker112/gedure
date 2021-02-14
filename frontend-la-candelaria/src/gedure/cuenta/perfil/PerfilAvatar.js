import React, { useEffect, useState, useCallback } from 'react';

import { Box } from '@material-ui/core';

// Components
import { PerfilAvatarForm } from '../../usuarios/show/perfil/PerfilAvatar';

import useFetch from '../../../hooks/useFetch';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function PerfilAvatar() {
	const [progress, setProgress] = useState(0);
	const { user, loading, data, permissions } = useSelector((state) => ({
		loading: state.forms.updateAvatar.loading,
		data: state.forms.updateAvatar.data,
		user: state.userData.user,
		permissions: state.userData.permissions,
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
				url: `v1/user`,
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
				dispatch(updateDataUser({
					user: response.user
				}));
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
	
	if (user.privilegio !== 'V-' || permissions?.sin_asignar?.change_avatar) {
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
	
	return null;
}