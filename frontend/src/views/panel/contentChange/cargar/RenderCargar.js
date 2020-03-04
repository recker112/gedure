import React, { useState, useEffect } from 'react'

//Material-UI
import { Grid, Paper, Button, FormControl, FormHelperText } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

//Components
import { RenderSelect } from '../../../../components/RendersGlobal';
import { CursosList, SeccionList } from '../../../../components/ListDataGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';

//Redux
import { connect } from 'react-redux'
import updateUploadOption from '../../../../actions/panel/upload/updateUploadOption';

function RenderCargar({ upload, updateUploadOption, curso, seccion, loading, files }) {
  const [errorEmpty, setErrorEmpty] = useState({status: false, values: [false, false]});

  const handleSubmit = e => {
    e.preventDefault();
    
    if (errorEmpty.status === true) {
      setErrorEmpty({status: false, values: [false, false]});
    }

    if (curso.length === 0 || seccion.length === 0){
      setErrorEmpty({status: true, values: [true, true]});
      return null;
    }

    //ENVIAR AJAX
    updateUploadOption({ loading: true });

    //Config
    const formData = new FormData();
    const maxPerList = 20;
    const listArchivos = files.length;

    //Verificar máximo
    if (listArchivos > 20) {
      //Calcular cuantas colas hay que hacer.
      const colas = Math.ceil((listArchivos / maxPerList));
      //Boton DEL PÁNICO.
      let exit;
      //Repetir cada cola
      for (let nCola = 0; nCola < colas; nCola++) {
        //Repetir cada añadido de datos en cada cola
        for (let i = 0; i < maxPerList && !exit; i++) {
          const archivo = files[i + (maxPerList * nCola)];

          //Insertar en la DATA
          formData.append(`cola${i}`, archivo);
          console.log(i + (20 * nCola));

          //Salir al llegar al máximo de archivos encontrados
          if (nCola === (colas - 1) && i === ((listArchivos - 1) - (maxPerList * nCola))) {
            exit = true;
          }
        }
        //Enviando listas
        console.log(`Lista${nCola} enviada correctamente!!`);
      }
    } else {
      //Envio individual de archivos
      for (let i = 0; i < files.length; i++) {
        const archivo = files[i];
        formData.append("files", archivo);
      }
      console.log(`Lista enviada correctamente!!`);
    }
  }

  function handleChange(e) {
    //Actualizar
    updateUploadOption({ [e.target.name]: e.target.value });
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={5} md={3}>
        <Paper>
          <UploadSelectBox upload={upload} action={handleChange} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper>
          <div className="Box">
            <div className="content">
              <form autoComplete="off" encType="multipart/form-data" method="POST" onSubmit={handleSubmit} style={{ marginTop: "0" }}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <LoadArchives upload={upload} files={files} action={updateUploadOption} />
                  </Grid>
                  <ShowCursos error={errorEmpty} action={handleChange} curso={curso} seccion={seccion} />
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <ButtonLoading estilo="outlined" colorsito="inherit" text="Cargar" loading={loading} />
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

function UploadSelectBox({ upload, action }) {
  //Config de cargar
  const uploadSelect = {
    name: 'uploadOption',
    values: [
      {
        value: 'matricula',
        name: 'Matricula'
      },
      {
        value: 'boletas',
        name: 'Boletas'
      }
    ]
  };

  return (
    <div className="Box">
      <span className="title">Seleccionar carga</span>
      <div className="content">
        <RenderSelect action={action} val={upload} data={uploadSelect} classNameSet="select" customWidth="auto" empty={false} />
      </div>
    </div>
  )
}

function LoadArchives({ upload, action }) {
  const [archivos, setArchivos] = useState(0);
  const handleChange = e => {
    const data = e.target.files;
    action({ [e.target.name]: e.target.files });
    for (let i = 0; i < data.length; i++) {
      setArchivos(i + 1);
    }
  }

  useEffect(() => {
    setArchivos(0);
  }, [upload])

  return (
    <div className="uploadArchives" style={{ textAlign: "center" }}>
      <input
        id="upload_files"
        multiple={upload === "boletas" ? true : false}
        type="file"
        name="files"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <label htmlFor="upload_files">
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          disableElevation
          component="span"
        >
          Cargar {upload === "matricula" ? "matricula" : "boletas"}
        </Button>
      </label>
      <div className="info" style={{ display: "flex", flexDirection: "column", marginTop: "5px" }}>
        {upload === "matricula" ? (
          <span>(Tamaño máximo: 30KB)</span>
        )
          :
          (
            <React.Fragment>
              <span>Archivos seleccionados: {archivos}</span>
              <span>(Tamaño máximo: 2MB)</span>
            </React.Fragment>
          )}
      </div>
    </div>
  )
}

function ShowCursos({ action, curso, seccion, error }) {
  //Config de curso
  const cursoSelect = {
    name: 'curso',
    values: [
      {
        value: '',
        name: 'Grado/Año'
      },
      ...CursosList
    ]
  };

  //Config de seccion
  const seccionSelect = {
    name: 'seccion',
    values: [
      {
        value: '',
        name: 'Seccion'
      },
      ...SeccionList
    ]
  };

  return (
    <React.Fragment>
      <Grid item xs={5} sm={4} md={3}>
        <FormControl error={error.values[0]} style={{width: "100%"}}>
          <RenderSelect action={action} val={curso} data={cursoSelect} />
          {error.values[0] && <FormHelperText>Este campo es obligatorio</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={5} sm={4} md={3}>
        <RenderSelect action={action} val={seccion} data={seccionSelect} />
      </Grid>
    </React.Fragment>
  )
}


const mapStateToProps = (state) => ({
  upload: state.panelSettings.uploadSection.uploadOption,
  curso: state.panelSettings.uploadSection.curso,
  seccion: state.panelSettings.uploadSection.seccion,
  files: state.panelSettings.uploadSection.files,
  loading: state.panelSettings.uploadSection.loading,
})

const mapDispatchToProps = {
  updateUploadOption
}

export default connect(mapStateToProps, mapDispatchToProps)((RenderCargar));