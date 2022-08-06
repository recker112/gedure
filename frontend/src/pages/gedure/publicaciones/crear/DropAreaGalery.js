import React, { useEffect } from 'react';

// MUI
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Components
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

export default function DropAreaGalery() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))
  });

  const { register, setValue } = useFormContext();

  const thumbs = acceptedFiles.map((file, i) => (
    <div style={{
      display: 'inline-flex',
      borderRadius: 2,
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: 'border-box'
    }} key={file.name}>
      <div style={{
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
      }}>
        <img
          src={file.preview}
          style={{
            display: 'block',
            width: '100%',
            height: '100%'
          }}
          alt={`preview-${i}`}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  // NOTA(RECKER): Change Value
  useEffect(() => {
    setValue('galery', acceptedFiles);
    // eslint-disable-next-line
  }, [acceptedFiles])

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview));

    // eslint-disable-next-line
  }, []);

  return (
    <section>
      <div style={{border: 'dashed', borderRadius: '4px', borderColor: 'rgba(255, 255, 255, 0.12)', minHeight: 150}} {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} {...register('galery')} id='test' />
        <Box mt={2} textAlign='center'>
          <Typography variant='h5'>
            Galería de imágenes, arrastre o de click para cargar imágenes
          </Typography>
          <CloudUploadIcon fontSize='large' />
        </Box>
      </div>
      <Box component='aside' sx={{textAlign: 'center'}} mt={2}>
        {thumbs}
      </Box>
    </section>
  );
}
