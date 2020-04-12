//React
import React, { useState } from 'react';

//Material-UI
import { Grid, Paper } from '@material-ui/core';

//Component
import { RenderInputs, RenderSelect } from '../../../../components/RendersGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';
import LoadArchives from '../../../../components/LoadArchives';
import verifyErrorCustom from '../../../../components/reutilizar/verifyErrorCustom';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';
import errorInfo from '../../../../actions/errorInfo';
import updateLoading from '../../../../actions/updateLoading';

//NotiStack
import { useSnackbar } from 'notistack';

function RenderPublicar({ data, updateInputValue, errorInfo, updateLoading }) {
	//Destructing
	const { option, loading, error, title, content, img } = data;
	
	//Máximo de caracteres.
	const contentMaxLength = option === 'noticia' ? 10000 : 520;
	
	//Progress
	const [progress, setProgress] = useState(0);

	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	const handleChange = e => {
		updateInputValue(e, 'PUBLICAR');
	};
	
	const onUploadProgress = (progressEvent) => {
		let percentCompleted = Math.round(
			progressEvent.loaded * 100 / progressEvent.total
		);
		
		setProgress(percentCompleted);
	}
	
	const fetchData = async (formData) => {
		try {
			let res;
			
			if (option === 'noticia') {
				res = await axios.post('api/news', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					onUploadProgress: onUploadProgress
				});
			}else {
				res = await axios.post('api/anuncios', formData);
			}
			
			const { description } = res.data;
			
			enqueueSnackbar(description, {
				variant: 'success'
			});
		} catch (error) {
			const { status, data } = error.response;

			if (status === 400) {
				enqueueSnackbar(data.description, {
					variant: 'warning'
				});
			} else if (status === 403) {
				enqueueSnackbar(data.description, {
					variant: 'error'
				});
			} else if (status === 422) {
				enqueueSnackbar(data.description, {
					variant: 'error'
				});
			} else if (status === 500) {
				enqueueSnackbar('No se ha podido conectar con la base de datos', {
					variant: 'error'
				});
			} else {
				enqueueSnackbar('Error interno en el sistema', {
					variant: 'error'
				});
			}
		}
		
		//Revertir loading
		updateLoading(false, 'PUBLICAR');
	}

	const handleSubmit = e => {
		//Preparativos
		e.preventDefault();
		let errorStatus = false;

		//Verificar datos
		const InputsArray = [
			{
				value: title,
				name: 'title',
				minValue: 5
			},
			{
				value: content,
				name: 'content',
				minValue: 20
			}
		];

		errorStatus = verifyErrorCustom(InputsArray, errorInfo, 'PUBLICAR');

		if (content.length > contentMaxLength) {
			errorInfo('content', '', 'PUBLICAR');
			errorStatus = true;
		}

		// if (option === 'noticia') {
		// 	if (img.length === 0) {
		// 		enqueueSnackbar('Recuerde que puede subir imagenes', {
		// 			variant: 'warning'
		// 		});
		// 	}
		// }

		if (errorStatus) {
			return null;
		}

		//Loading
		updateLoading(true, 'PUBLICAR');
		
		//Preparar data
		const formData = new FormData
		
		formData.append('title', title);
		//Formatear contenido
		formData.append('content', content.replace (/\r?\n/g,"</br>"));
		//Guardar todos los archivos en un array
		for (let i = 0; i < img.length; i++) {
			const archivo = img[i];
			formData.append('img[]', archivo);
		}
		
		//Realizar consulta
		fetchData(formData);
	};

	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} sm={2} md={3}>
				<Paper variant="outlined">
					<SelectorPublicar action={handleChange} value={option} />
				</Paper>
			</Grid>
			<Grid item xs={12} sm={10}>
				<Paper variant="outlined">
					<div className="Box">
						<div className="content">
							<form
								autoComplete="off"
								onSubmit={handleSubmit}
								method="POST"
								style={{ marginTop: '0' }}
							>
								<RenderForm 
									handleChange={handleChange} 
									error={error}
									values={{ title, content, img }}
									loading={loading}
									updateInputValue={updateInputValue}
									option={option}
									contentMaxLength={contentMaxLength}
									progress={progress}
								/>
							</form>
						</div>
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
}

function RenderForm({
	handleChange,
	error,
	values,
	option,
	loading,
	updateInputValue,
	contentMaxLength,
	progress,
	
}) {
	//Destructing
	const { title, content, img } = values;
	
	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={5} sm={4} md={3}>
				<RenderInputs
					data={{ val: title, name: 'title', label: 'Título' }}
					size="small"
					accion={handleChange}
					error={error.title}
				/>
			</Grid>
			<Grid item xs={12} style={{ textAlign: 'center' }}>
				<RenderInputs
					data={{
						val: content,
						name: 'content',
						label: 'Contenido de la publicación'
					}}
					accion={handleChange}
					error={error.content}
					textarea={true}
					maxWidth="500px"
				/>
			</Grid>
			<Grid item xs={12} style={{ textAlign: 'center' }}>
				{error.content.status && error.content.message === '' ? (
					<span style={{ color: '#f44336' }}>
						{`${content.length}/${contentMaxLength} caracteres`}
					</span>
				) : (
					<span>{`${content.length}/${contentMaxLength} caracteres`}</span>
				)}
			</Grid>
			{option === 'noticia' && (
				<LoadArchives
					idName="uploadPublic"
					accepted="image/*"
					reset={option}
					files={img}
					action={updateInputValue}
					multiple={true}
					maxSizeFile={{ unique: '3MB', multiple: '3MB' }}
					label={{ unique: 'imagenes', multiple: 'imagenes' }}
					name="img"
					type="PUBLICAR"
				/>
			)}
			<Grid item xs={12} style={{ textAlign: 'center' }}>
				<Grid container 
					direction={'column'} 
					justify={'center'} 
					alignItems={'center'}
				>
					<ButtonLoading 
						estilo="outlined" 
						colorsito="inherit" 
						text="Publicar" 
						loading={loading}
						progressBar={option === 'noticia' ? true : false}
						progress={progress}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}

function SelectorPublicar({ action, value }) {
	//Config de opciones
	const publicarSelect = {
		name: 'option',
		values: [
			{
				value: 'noticia',
				name: 'Noticia'
			},
			{
				value: 'anuncio',
				name: 'Anuncio'
			}
		]
	};

	return (
		<div className="Box">
			<span className="title">Publicar</span>
			<div className="content">
				<RenderSelect
					action={action}
					val={value}
					data={publicarSelect}
					classNameSet="select"
					customWidth="auto"
					empty={false}
				/>
			</div>
		</div>
	);
}

//Redux
const mapStateToProps = state => ({
	data: state.panelSettings.publicarSection
});

const mapDispatchToProps = {
	updateInputValue,
	errorInfo,
	updateLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderPublicar);