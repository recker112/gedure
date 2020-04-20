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
import updateValue from '../../../../actions/updateValue';
import errorInfo from '../../../../actions/errorInfo';
import updateLoading from '../../../../actions/updateLoading';

//NotiStack
import { useSnackbar } from 'notistack';

function RenderPublicar({ data, updateValue, errorInfo, updateLoading }) {
	//Destructing
	const { option, loading, error, title, content, img, archives } = data;
	
	//Máximo de caracteres.
	const contentMaxLength = option === 'noticia' ? 5000 : 520;
	
	//Progress
	const [progress, setProgress] = useState(0);

	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	const handleChange = e => {
		updateValue(e, 'PUBLICAR');
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
			
			if (error.response){
				//Errores HTTP
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
					enqueueSnackbar('Error interno en el servidor', {
						variant: 'error'
					});
				}
			}else {
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

		//Verificar máximo de caracteres
		if (content.length > contentMaxLength) {
			errorInfo('content', '', 'PUBLICAR');
			errorStatus = true;
		}

		//Verificar máximo de archivos
		if (option === 'noticia') {
			if (archives.length > 4) {
				enqueueSnackbar('Solo puede subir un máximo de 4 archivos', {
					variant: 'warning'
				});
				errorStatus = true;
			}
		}
		
		//Preparar data
		const formData = new FormData
		
		formData.append('title', title);
		//Formatear contenido
		formData.append('content', content.replace (/\r?\n/g,"</br>"));
		
		//Guardar todos las imagenes en un array
		for (let i = 0; i < img.length; i++) {
			const archivo = img[i];
			formData.append('img[]', archivo);
			
			//Verificar tamaño máximo
			if (archivo.size / 1024 > 3072){
				enqueueSnackbar('Una de las imagenes supera el tamaño máximo', {
					variant: 'warning'
				});
				errorStatus = true;
			}
		}
		
		//Guardar todos los archivos en un array
		for (let i = 0; i < archives.length; i++) {
			const archivo = archives[i];
			formData.append('archives[]', archivo);
			
			//Verificar tamaño máximo
			if (archivo.size / 1024 > 2048){
				enqueueSnackbar('Uno de los archivos supera el tamaño máximo', {
					variant: 'warning'
				});
				errorStatus = true;
			}
		}
		
		
		//Verificar errores
		if (errorStatus) {
			return null;
		}
		
		//Loading
		updateLoading(true, 'PUBLICAR');
		
		//Realizar consulta
		fetchData(formData);
	};

	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} sm={5} md={3}>
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
									updateValue={updateValue}
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
	updateValue,
	contentMaxLength,
	progress,
	
}) {
	//Destructing
	const { title, content, img, archives } = values;
	
	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} sm={7} md={5}>
				<RenderInputs
					data={{ val: title, name: 'title', label: 'Título' }}
					size="small"
					accion={handleChange}
					error={error.title}
				/>
			</Grid>
			<Grid item xs={12} sm={10} md={8} style={{ textAlign: 'center' }}>
				<RenderInputs
					data={{
						val: content,
						name: 'content',
						label: 'Contenido de la publicación'
					}}
					accion={handleChange}
					error={error.content}
					textarea={true}
					maxRows="20"
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
				<React.Fragment>
					<Grid item xs={12} sm={5} md={3}>
						<LoadArchives
							idName="uploadPublic"
							accepted="image/*"
							reset={option}
							files={img}
							action={updateValue}
							multiple={true}
							maxSizeFile={{ unique: '3MB', multiple: '3MB' }}
							label={{ unique: 'imagenes', multiple: 'imagenes' }}
							name="img"
							type="PUBLICAR"
						/>
					</Grid>
					<Grid item xs={12} sm={5} md={3}>
						<LoadArchives
							idName="uploadArchivesPublic"
							accepted=".doc,.docx,.pdf,.xlsx,.xls"
							reset={option}
							files={archives}
							action={updateValue}
							multiple={true}
							maxSizeFile={{ unique: '2MB', multiple: '2MB' }}
							label={{ unique: 'archivos', multiple: 'archivos' }}
							name="archives"
							type="PUBLICAR"
						/>
					</Grid>
				</React.Fragment>
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
	updateValue,
	errorInfo,
	updateLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderPublicar);