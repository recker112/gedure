import React, { useState, useEffect } from 'react'

//Material-UI
import { Grid, Paper, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

//Components
import { RenderSelect } from '../../../../components/RendersGlobal';
import { CursosList, SeccionList } from '../../../../components/ListDataGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';

//Redux
import { connect } from 'react-redux'
import updateInputValue from '../../../../actions/updateInputValue';

//Notistack
import { useSnackbar } from 'notistack';
import errorInfo from '../../../../actions/errorInfo';
import updateLoading from '../../../../actions/updateLoading';

function RenderCargar({ data, updateInputValue, errorInfo, updateLoading }) {
  //Crear un SnackBar
  const { enqueueSnackbar } = useSnackbar();
  //Destruct
  const {uploadOption, curso, seccion, loading, files, error} = data;

  const handleSubmit = e => {
    e.preventDefault();
    let errorStatus = false;

    //Verificar datos
    if (files.length === 0){
      enqueueSnackbar('Debe cargar algún archivo primero', {
        variant: 'warning'
      });
      errorStatus = true;
    }

    [
      {
        value: curso, 
        name: "curso"
      },
      {
        value: seccion, 
        name: "seccion"
      }
    ].map((input)=>{
      if (input.value.length === 0) {
        //Empty
        errorInfo(input.name, "Campo obligatorio", "UPDATE");
        errorStatus=true;
      }
      return null;
    });

    if (errorStatus){
      return null;
    }

    //ENVIAR AJAX
    updateLoading(true,"UPLOAD");

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
      //ENVIAR AJAX
      console.log(`Lista enviada correctamente!!`);
    }
    //Loading Toggle
    updateLoading(false,"UPLOAD");
  }

  function handleChange(e) {
    //Actualizar
    updateInputValue(e,'UPLOAD');
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={5} md={3}>
        <Paper variant="outlined">
          <UploadSelectBox upload={uploadOption} action={handleChange} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper variant="outlined">
          <div className="Box">
            <div className="content">
              <form autoComplete="off" encType="multipart/form-data" method="POST" onSubmit={handleSubmit} style={{ marginTop: "0" }}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <LoadArchives upload={uploadOption} files={files} action={updateInputValue} />
                  </Grid>
                  <ShowCursos error={error} action={handleChange} curso={curso} seccion={seccion} />
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

  //Acción al cambiar los archivos
  const handleChange = e => {
    const data = e.target.files;
    let change = false;

    //Actualizar datos
    action(e,'UPLOAD');

    //Visor de archivos actuales
    for (let i = 0; i < data.length; i++) {
      setArchivos(i + 1);
      change = true;
    }

    //Verificar cambios
    !change && setArchivos(0);
  }

  useEffect(() => {
    //Custom Input
    const e = {target: {
      name: "files", files: []
    }};

    //Set values
    setArchivos(0);
    action(e,'UPLOAD');
  }, [upload, action])

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
        <RenderSelect error={error.curso} action={action} val={curso} data={cursoSelect} />
      </Grid>
      <Grid item xs={5} sm={4} md={3}>
        <RenderSelect error={error.seccion} action={action} val={seccion} data={seccionSelect} />
      </Grid>
    </React.Fragment>
  )
}


const mapStateToProps = (state) => ({
  data: state.panelSettings.uploadSection,
})

const mapDispatchToProps = {
  updateInputValue,
  errorInfo,
  updateLoading
}

export default connect(mapStateToProps, mapDispatchToProps)((RenderCargar));