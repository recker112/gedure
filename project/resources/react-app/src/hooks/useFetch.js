import { useSnackbar } from 'notistack';

import { useDispatch } from 'react-redux';
import logoutApp from '../actions/logoutApp';

function useFetch() {
	const axios = window.axios;

	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const fetchData = async (prepareData) => {
		let {
			url,
			data = null,
			otherData = null,
			messageToFinish = true,
			messageTo422 = false,
			message422 = 'Error al verificar los datos',
			successText = false,
			type = 'post',
			variant = 'success',
		} = prepareData;

		try {
			const res = await axios[type](url, data, otherData);

			if (messageToFinish) {
				enqueueSnackbar(successText ? successText : res.data.description, {
					variant: variant,
				});
			}

			return res.data;
		} catch (error) {
			if (axios.isCancel(error)) {
				//No hacer nada
			}else if (error.response) {
				//Errores HTTP
				const { status, data } = error.response;

				if (status === 400) {
					enqueueSnackbar(data.description, {
						variant: 'warning',
					});
				} else if (status === 401) {
					enqueueSnackbar('Sesiรณn expirada', {
						variant: 'info',
					});

					dispatch(logoutApp());
				} else if (status === 403) {
					enqueueSnackbar('No tienes permisos para esta acciรณn', {
						variant: 'error',
					});
				} else if (status === 422) {
					if (messageTo422) {
						enqueueSnackbar(message422, {
							variant: 'error',
						});
					}

					return '422';
				} else if (status === 500) {
					enqueueSnackbar('No se ha podido conectar con la base de datos', {
						variant: 'error',
					});
				} else {
					enqueueSnackbar('Error interno en el servidor', {
						variant: 'error',
					});
				}
			} else {
				enqueueSnackbar('Error interno en la app', {
					variant: 'error',
				});
			}
			
			console.log(error);

			return false;
		}
	};

	return { fetchData };
}

export default useFetch;