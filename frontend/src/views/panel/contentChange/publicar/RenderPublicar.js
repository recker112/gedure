//React
import React from 'react';

//Material-UI
import { Grid, Paper } from '@material-ui/core';

//Component
import { RenderInputs, RenderSelect } from '../../../../components/RendersGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';
import LoadArchives from '../../../../components/LoadArchives';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';
import errorInfo from '../../../../actions/errorInfo';
import { useSnackbar } from 'notistack';
import updateLoading from '../../../../actions/updateLoading';

function RenderPublicar({data, updateInputValue, errorInfo, updateLoading}) {
  const {option, loading, error, title, content, img} = data;
  const contentMaxLength = option === "noticia" ? 1200 : 250;

  //Crear un SnackBar
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = e => {
    updateInputValue(e,'PUBLICAR');
  }

  const handleSubmit = e => {
    //Preparativos
    e.preventDefault();
    let errorStatus = false;

    //Verificar datos
    [{
      value: title,
      name: "title",
      minLength: 5,
    }, {
      value: content,
      name: "content",
      minLength: 20,
    },].map((input) => {
      if (input.value.length === 0) {
        //Empty
        errorInfo(input.name, "Campo obligatorio", "PUBLICAR");
        errorStatus = true;
      } else if (input.value.length < input.minLength) {
        //Empty
        errorInfo(input.name, "No válido", "PUBLICAR");
        errorStatus = true;
      }
      return null;
    });

    if (content.length > contentMaxLength) {
      errorInfo("content", "", "PUBLICAR");
        errorStatus = true;
    }

    if (option === 'noticia') {
      if (img.length === 0) {
        enqueueSnackbar('Debe cargar algún archivo primero', {
          variant: 'warning'
        });
      }
    }

    if (errorStatus){
      return null;
    }

    //REQ
    updateLoading(true,'PUBLICAR');
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={5} md={4}>
        <Paper variant="outlined">
          <SelectorPublicar action={handleChange} value={option} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper  variant="outlined">
          <div className="Box">
            <div className="content">
               <form autoComplete="off" onSubmit={handleSubmit} method="POST" style={{ marginTop: "0" }}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={5} sm={4} md={3}>
                    <RenderInputs 
                      data={{ val: title, name: 'title', label: 'Título' }}
                      size="small"
                      accion={handleChange}
                      error={error.title}
                    />
                  </Grid>
                  <Grid item xs={12} style={{textAlign: 'center'}}>
                    <RenderInputs 
                      data={{ val: content, name: 'content', label: 'Contenido de la publicación' }} 
                      accion={handleChange}
                      error={error.content}
                      textarea={true}
                      maxWidth="500px"
                    />
                  </Grid>
                  <Grid item xs={12} style={{textAlign: 'center'}}>
                    {error.content.status && error.content.message === '' ? 
                    <span style={{color: '#f44336'}}>{`${content.length}/${contentMaxLength} caracteres`}</span>
                    :
                    <span>{`${content.length}/${contentMaxLength} caracteres`}</span>}
                  </Grid>
                  {option === "noticia" &&
                    <LoadArchives 
                      accepted="image/*"
                      reset={option} 
                      files={img} 
                      action={updateInputValue}
                      multiple={true}
                      maxSizeFile={{unique: "5MB", multiple: "5MB"}}
                      label={{unique: 'imagenes', multiple: 'imagenes'}}
                      name="img"
                      type="PUBLICAR"
                    />
                  }
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <ButtonLoading estilo="outlined" colorsito="inherit" text="Publicar" loading={loading} />
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
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
        <RenderSelect action={action} val={value} data={publicarSelect} classNameSet="select" customWidth="auto" empty={false} />
      </div>
    </div>
  )
}

//Redux
const mapStateToProps = (state) => ({
  data: state.panelSettings.publicarSection
})

const mapDispatchToProps = {
  updateInputValue,
  errorInfo,
  updateLoading
}

export default connect(mapStateToProps,mapDispatchToProps)(RenderPublicar);