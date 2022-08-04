import React, { useState } from "react";

// Router
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Container, Grid, IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Form
import { useForm, FormProvider } from "react-hook-form";

// Components
import MakePost from "./MakePost";
import ShowPreview from "./ShowPreview";
import useNotifier from "../../../../hooks/useNotifier";
import TourCrearPub from "./TourCrearPub";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../../store/slices/requestStatus/async_trunk/publicaciones/createPost";

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function PUBLCrear() {
  document.title = "Crear publicaciones - La Candelaria";
  const [preview, setPreview] = useState(false);
  useNotifier();

  const loading = useSelector(state => state.requestStatus.createPost.loading);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const methods = useForm();

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

  const onSubmit = (submitData) => {
    // FormData
		const formData = new FormData();
		formData.append('title', submitData.title);
		formData.append('content', submitData.markdown);
		formData.append('only_users', submitData.only_users);
		submitData.portada[0] && formData.append('portada', submitData.portada[0]);
		submitData.galery?.length && submitData.galery.forEach(img => {
			formData.append('galery[]', img);
		});

    dispatch(createPost({submitData: formData, reset: methods.reset}));
  };

  return (
    <Box component="main" sx={classes.container}>
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
                    aria-label="preview"
                    data-tour="gdPub__preview"
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
      <TourCrearPub />
    </Box>
  );
}
