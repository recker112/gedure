import React, { useState, useCallback } from 'react';

import { 
	Dialog,
	AppBar,
	Toolbar,
	Button,
	DialogContent,
	DialogContentText,
	Grid,
	Typography,
	Container,
	TextField,
	Box,
	FormControlLabel,
	Switch,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

import { DropzoneAreaBase } from 'material-ui-dropzone';

import { useForm } from 'react-hook-form';

import useFetch from '../../../hooks/useFetch';

import { useSnackbar } from 'notistack';

// Components
import AnimationDialog from '../../../components/AnimationDialog';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

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
	showCaracteres: {
		marginTop: theme.spacing(1),
	},
}));

function EditNoticia({ tableRef=null, callback=null }) {
	const [files, setFiles] = useState([]);
	const [progress, setProgress] = useState(0);
	const [updateImgs, setUpdateImgs] = useState(false);
	const contentMaxLength = 50000;
	
	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.editNoticia.open,
		loading: state.dialogs.editNoticia.loading,
		data: state.dialogs.editNoticia.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const { fetchData } = useFetch();
	
	const { register, handleSubmit, errors, watch } = useForm({
		mode: 'onTouched'
	});
	
	const { enqueueSnackbar } = useSnackbar();
	
	const handleClose = () => {
		setFiles([]);
		dispatch(updateDialogs('editNoticia', false, false, {}));
	}
	
	const handleAdd = (newFiles) => {
		newFiles = newFiles.filter((file) => !files.find((f) => f.data === file.data));
		setFiles([...files, ...newFiles]);
	};

	const handleDelete = (deleted) => {
		setFiles(files.filter((f) => f !== deleted));
	};
	
	const handleConfirm = () => {
		setUpdateImgs(true);
	}
	
	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);
	
	const onSubmit = async (submitData) => {
		dispatch(updateDialogs('editNoticia', true, true, {}));
		submitData.imgs = files;
		const formData = new FormData();
		formData.append('title', submitData.title);
		formData.append('content', submitData.content.replace(/\r?\n/g,"</br>"));
		formData.append('only_users', submitData.only_users);
		
		if (updateImgs) {
			formData.append('imgs_update', true);
			submitData.imgs.forEach(img => {
				formData.append('imgs[]', img.file);
			});
		}else {
			formData.append('imgs_update', false);
		}
		
		formData.append('_method', 'PUT');

		const prepare = {
			url: `v1/posts/${data.slug}`,
			type: 'post',
			data: formData,
			message404: 'La noticia fue eliminada por otro usuario',
			otherData: {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: onUploadProgress,
			},
		};

		const response = await fetchData(prepare);

		if (response) {
			callback && callback();
			tableRef?.current && tableRef.current.onQueryChange();
			setFiles([]);
			setProgress(0);
		}
		
		dispatch(updateDialogs('editNoticia', false, false));
	}
	
	return (
		<Dialog open={open} TransitionComponent={AnimationDialog} fullScreen>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Button disabled={loading} onClick={handleClose} className={classes.button}>
						Cancelar
					</Button>
					<LoadingComponent 
						loading={loading} 
						progressLoading 
						progress={progress} 
						color="inherit"
					>
						<label htmlFor="submit-editNoticia">
							<Button variant="contained" component="span" endIcon={<SaveIcon />}>
								Cambiar
							</Button>
						</label>
					</LoadingComponent>
				</Toolbar>
			</AppBar>
			<DialogContent className='container--padding'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h6' className="text__bold--big">
							Crear una nueva noticia
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Container maxWidth="md">
							<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
								<Grid container spacing={2}>
									<Grid container justify='center' item xs={12}>
										<TextField 
											name="title"
											label="Título"
											defaultValue={data.title || ''}
											variant='outlined'
											inputRef={register({
												required: { value: true, message: 'Campo requerido' },
												minLength: { value: 6, message: 'Título muy corto' },
												maxLength: { value: 100, message: 'Título muy grande' },
											})}
											error={Boolean(errors.title)}
											helperText={errors?.title?.message ? errors.title.message : 'Ingrese un título para su publicación'}
											disabled={loading}
											size="small"
											fullWidth
											style={{maxWidth: 400}}
											autoFocus
										/>
									</Grid>
									<Grid container justify='center' item xs={12}>
										<TextField 
											name="content"
											label="Contenido"
											defaultValue={data.content?.replaceAll("</br>", "\n") || ''}
											variant='outlined'
											inputRef={register({
												required: { value: true, message: 'Campo requerido' },
												minLength: { value: 20, message: 'Contenido muy corto' },
												maxLength: {
													value: contentMaxLength,
													message: 'Contenido demaciado grande',
												},
											})}
											error={Boolean(errors.content)}
											helperText={errors?.content?.message ? errors.content.message : 'Ingrese el contenido de la publicación'}
											disabled={loading}
											size="small"
											multiline
											rows={6}
											rowsMax={16}
											fullWidth
										/>
										<Box 
											color={Boolean(errors?.content) ? '#f44336' : 'text.primary'}
										>
											{watch('content', data.content?.replaceAll("</br>", "\n") || []).length}/{contentMaxLength} Caracteres
										</Box>
									</Grid>
									<Grid item xs={12}>
										<Typography variant='h6' className="text__bold--big text__opacity--semi">
											Opciones opcionales
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<FormControlLabel
											control={<Switch name="only_users" inputRef={register} color="secondary" />}
											label="Disponible solo para usuarios"
										/>
									</Grid>
									{updateImgs ? (
										<Grid item xs={12}>
											<DropzoneAreaBase
												fileObjects={files}
												acceptedFiles={['image/png', 'image/jpeg']}
												showPreviewsInDropzone={false}
												showPreviews={true}
												previewText="Imagenes selecionadas:"
												onAdd={handleAdd}
												onDelete={handleDelete}
												filesLimit={10}
												showAlerts={false}
												previewGridProps={{ container: { spacing: 2 }, item: { xs: true } }}
												maxFileSize={5000000}
												getFileLimitExceedMessage={(filesLimit) =>
													`Solo se permiten hasta ${filesLimit} imagenes`
												}
												getFileAddedMessage={(fileName) => `Archivo ${fileName} agregado`}
												getFileRemovedMessage={(fileName) => `Archivo ${fileName} removido`}
												onAlert={(messaje, variant) => {
													enqueueSnackbar(messaje, {
														variant: variant,
													});
												}}
												dropzoneText="Arrastrar o cargar imagenes"
											/>
										</Grid>
									)
									:
									(
										<Grid item container spacing={2}>
											<Grid item xs={12}>
												<DialogContentText>
													Las imagenes de esta noticia serán reemplazadas por las que coloque, si deja este campo vacio se entenderá que quiere quitar las fotos de esta publicación.
												</DialogContentText>
											</Grid>

											<Grid container justify="center" item xs={12}>
												<Button onClick={handleConfirm}>
													Deseo cambiar o quitar las fotos
												</Button>
											</Grid>
										</Grid>
									)}
								</Grid>
								<input type="submit" style={{display: 'none'}} id="submit-editNoticia" />
							</form>
						</Container> 
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}

export default EditNoticia;