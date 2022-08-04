import React, { useState, useEffect } from 'react'

// Redux
import { useNavigate, useParams } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Form
import { FormProvider, useForm } from 'react-hook-form';

// Components
import useNotifier from '../../../../hooks/useNotifier';
import MakePost from './MakePost';
import TourEditPub from './TourEditPub';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import ShowPreview from '../crear/ShowPreview';
import { requestPost } from '../../../../store/slices/requestStatus/async_trunk/publicaciones/requestPost';
import { updateInputs } from '../../../../store/slices/requestStatus';
import { editPost } from '../../../../store/slices/requestStatus/async_trunk/publicaciones/editPost';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

function EditarPost({ data: { title, content, slug, only_users } }) {
  document.title = "Editar publicaciones - La Candelaria";
  const [preview, setPreview] = useState(false);
  useNotifier();

  const loading = useSelector(state => state.requestStatus.editPost.loading);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      title,
      markdown: content,
      only_users: Boolean(only_users),
    }
  });

  const handlePreview = () => {
    setPreview((value) => !value);
  };

  const handleReturn = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/gedure/publicaciones");
    }
  };

  const onSubmit = submitData => {
    
    // FormData
		const formData = new FormData();
		formData.append('title', submitData.title);
		formData.append('content', submitData.markdown);
		formData.append('only_users', submitData.only_users);
		formData.append('delete_portada', submitData.delete_portada);
		formData.append('delete_galery', submitData.delete_galery);
		formData.append('_method', 'PUT');
		submitData.portada?.[0] && formData.append('portada', submitData.portada[0]);
		submitData.galery?.length && submitData.galery.forEach(img => {
			formData.append('galery[]', img);
		});

    dispatch(editPost({ submitData: formData, slug }));
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
        <Container>
          <Box mb={3}>
            <Grid container justifyContent="space-between">
              <Tooltip title="Volver" arrow>
                <IconButton
                  disabled={loading}
                  onClick={handleReturn}
                  aria-label="return"
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={preview ? "Editar" : "Visualizar"} arrow>
                <IconButton
                  disabled={loading}
                  onClick={methods.handleSubmit(handlePreview)}
                  data-tour="gdPub__preview"
                  aria-label="preview"
                >
                  {preview ? <EditIcon /> : <VisibilityIcon />}
                </IconButton>
              </Tooltip>
            </Grid>
          </Box>
          {!preview && <MakePost />}
        </Container>
        {preview && <ShowPreview />}
      </form>
    </FormProvider>
  )
}

export default function Request() {
  const { slug } = useParams();

  const { loading, data } = useSelector(state => ({
    loading: state.requestStatus.editPost.loadingRequest,
    data: state.requestStatus.editPost.dataRequest,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestPost(slug));

    return () => {
      dispatch(updateInputs({ select: 'editPost', input: 'loadingRequest', value: true }));
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Box component="main" textAlign='center' sx={classes.container}>
        <CircularProgress />
      </Box>
    )
  }


  return (
    <Box component="main" sx={classes.container}>
      <EditarPost data={data} />
      <TourEditPub />
    </Box>
  );
}