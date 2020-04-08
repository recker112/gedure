import React from 'react'

//Material-UI
import { Grid, Paper } from '@material-ui/core';

//Components
import { RenderSelect } from '../../../../components/RendersGlobal';
import { CursosList, SeccionList } from '../../../../components/ListDataGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';
import LoadArchives from '../../../../components/LoadArchives';

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
  const {option, curso, seccion, loading, files, error} = data;

  function handleChange(e) {
    //Actualizar
    updateInputValue(e,'UPLOAD');
  }
	
	const fetchData = async (dataForm, type) => {
		try {
			let res;
			
			if (type === 'matricula'){
				res = await axios.post('api/upload/matricula', dataForm);
			}else if (type == 'boletas'){
				res = await axios.post('api/upload/boletas', dataForm);
			}
			
			const { description } = res.data;
			
			enqueueSnackbar(description, {
				variant: 'success'
			});
		} catch (error) {
			const { status, data } = error.response;

			if (status === 400) {
				enqueueSnackbar(data.description, {
					variant: 'warning'
				});
			}else if (status === 403) {
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
				enqueueSnackbar('Error interno en el sistema', {
					variant: 'error'
				});
			}
		}
		//Loading Toggle
    updateLoading(false,"UPLOAD");
	}

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

		//Verificar que no existan errores en los datos
    if (errorStatus){
      return null;
    }

    //ENVIAR AJAX
    updateLoading(true,"UPLOAD");

    //Config
    let formData = new FormData();
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
			
			//Guardar todos los archivos en un array
      for (let i = 0; i < files.length; i++) {
        const archivo = files[i];
        formData.append("files[]", archivo);
      }
			//Data
			formData.append("curso", curso);
			formData.append("seccion", seccion);
			
      //ENVIAR AJAX
      fetchData(formData,option);
    }
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={5} md={3}>
        <Paper variant="outlined">
          <UploadSelectBox upload={option} action={handleChange} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper variant="outlined">
          <div className="Box">
            <div className="content">
              <form autoComplete="off" encType="multipart/form-data" method="POST" onSubmit={handleSubmit} style={{ marginTop: "0" }}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <LoadArchives 
                      accepted={option === "matricula" ? '.csv,.xls,.xlsx,.ods' : '.pdf'}
                      idName="uploadFiles"
                      reset={option} 
                      files={files} 
                      action={updateInputValue}
                      multiple={option === "matricula" ? false : true}
                      maxSizeFile={{unique: "5MB", multiple: "2MB"}}
                      label={{unique: 'matricula', multiple: 'boletas'}}
                      name="files"
                      type="UPLOAD"
                    />
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
    name: 'option',
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