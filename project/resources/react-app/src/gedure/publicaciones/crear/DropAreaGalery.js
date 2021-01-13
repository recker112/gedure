import React, { useEffect } from 'react';

import { DropzoneAreaBase } from 'material-ui-dropzone';

import { useSnackbar } from 'notistack';

import { useFormContext, useWatch } from "react-hook-form";

export default function DropAreaGalery({ defaultValue, label }) {
	const { register, control, setValue } = useFormContext();
	const value = useWatch({
    control,
    name: 'galery',
    defaultValue: defaultValue
  });
	
	const { enqueueSnackbar } = useSnackbar();
	
	useEffect(() => {
		register('galery');
		setValue('galery', []);
		// eslint-disable-next-line
	},[])
	
	const handleAdd = (newFiles) => {
		newFiles = newFiles.filter((file) => !value.find((f) => f.data === file.data));
		setValue('galery', [...value, ...newFiles]);
	};

	const handleDelete = (deleted) => {
		setValue('galery',value.filter((f) => f !== deleted));
	};
	
	return (
		<DropzoneAreaBase
			fileObjects={value}
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
			dropzoneText={label}
		/>
	);
}