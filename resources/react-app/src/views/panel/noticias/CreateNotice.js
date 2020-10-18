import React, { useState, useEffect, useCallback } from 'react';

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
import AddIcon from '@material-ui/icons/Add';

import { DropzoneAreaBase } from 'material-ui-dropzone';

import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';

import useFetch from './../../../hooks/useFetch';

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
	showCaracteres: {
		marginTop: theme.spacing(1),
	},
}));

function CreateNotice({ tableRef }) {
	const [files, setFiles] = useState([]);
	const [progress, setProgress] = useState(0);

	const contentMaxLength = 50000;

	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.createNotice.open,
		loading: state.dialogs.createNotice.loading,
		data: state.dialogs.createNotice.data,
	}));
	const dispatch = useDispatch();

	const classes = useStyles();

	const { fetchData } = useFetch();

	const { register, handleSubmit, errors, watch } = useForm();

	const { enqueueSnackbar } = useSnackbar();

	const handleClose = () => {
		dispatch(updateDialogs('createNotice', false, false, 'clear'));
		setFiles([]);
	};

	const handleAdd = (newFiles) => {
		newFiles = newFiles.filter((file) => !files.find((f) => f.data === file.data));
		setFiles([...files, ...newFiles]);
	};

	const handleDelete = (deleted) => {
		setFiles(files.filter((f) => f !== deleted));
	};

	const onSubmit = (submitData) => {
		submitData.imgs = files;
		dispatch(updateDialogs('createNotice', true, true, submitData));
	};

	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const consult = async () => {
			const formData = new FormData();
			formData.append('title', data.title);
			formData.append('content', data.content.replace(/\r?\n/g,"</br>"));
			formData.append('onlyUsers', data.onlyUsers);
			data.imgs.forEach(img => {
				formData.append('imgs[]', img.file);
			});
			
			const prepare = {
				url: `v1/noticias`,
				type: 'post',
				data: formData,
				otherData: {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					onUploadProgress: onUploadProgress,
				},
			};

			const response = await fetchData(prepare);

			if (response) {
				tableRef.current && tableRef.current.onQueryChange();
				dispatch(updateDialogs('createNotice', true, false, 'clear'));
				setFiles([]);
			} else {
				dispatch(updateDialogs('createNotice', true, false));
			}
		};

		if (loading) {
			consult();
		}

		// eslint-disable-next-line
	}, [loading]);

	return (
		<Dialog open={open} TransitionComponent={AnimationDialog} fullScreen>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Button disabled={loading} onClick={handleClose} className={classes.button}>
						Cerrar
					</Button>
					<LoadingComponent loading={loading} progressLoading progress={progress} color="inherit">
						<label htmlFor="submit-createNotice">
							<Button variant="contained" component="span" endIcon={<AddIcon />}>
								Crear
							</Button>
						</label>
					</LoadingComponent>
				</Toolbar>
			</AppBar>
			<DialogContent className={classes.paddingTopDialog}>
				<Grid container>
					<Grid item xs={12}>
						<Typography className="box__title box__title--opacity box__title--marginBottom">
							Crear una nueva noticia
						</Typography>
					</Grid>
					<Container maxWidth="md">
						<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
							<Grid container>
								<Grid container spacing={2} item xs={12}>
									<Grid container justify="center" item xs={12}>
										<RenderInput
											name="title"
											label="Título"
											defaultValue={data.title || ''}
											errors={errors?.title}
											registerInput={register({
												required: { value: true, message: 'Campo requerido.' },
												minLength: { value: 6, message: 'Campo no válido.' },
												maxLength: { value: 100, message: 'Campo demaciado grande.' },
											})}
											disabledOnLoading={loading}
											size="small"
											maxWidth="400px"
											focus
										/>
									</Grid>

									<Grid container justify="center" item xs={12}>
										<Grid item xs={12}>
											<RenderInput
												name="content"
												label="Contenido"
												defaultValue={data.content || ''}
												errors={errors?.content}
												registerInput={register({
													required: { value: true, message: 'Campo requerido.' },
													minLength: { value: 20, message: 'Campo no válido.' },
													maxLength: {
														value: contentMaxLength,
														message: 'Campo demaciado grande.',
													},
												})}
												disabledOnLoading={loading}
												textarea
												maxRows={16}
											/>
										</Grid>
										{errors?.contenido ? (
											<Typography style={{ color: '#f44336' }} className={classes.showCaracteres}>
												{`${(watch('content') || '').length}/${contentMaxLength} caracteres`}
											</Typography>
										) : (
											<Typography className={classes.showCaracteres}>
												{`${(watch('content') || '').length}/${contentMaxLength} caracteres`}
											</Typography>
										)}
									</Grid>

									<Grid item xs={12}>
										<Typography className="box__subtitle box__title--opacity box_title--margin">
											Opciones adicionales
										</Typography>
									</Grid>

									<Grid item xs={12}>
										<FormControlLabel
											control={<Switch name="onlyUsers" inputRef={register} color="secondary" />}
											label="Disponible solo para usuarios"
										/>
									</Grid>

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
								</Grid>
							</Grid>
							<input type="submit" style={{ display: 'none' }} id="submit-createNotice" />
						</form>
					</Container>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}

export default CreateNotice;