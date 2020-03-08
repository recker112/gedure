//Reacy
import React, { useState, useEffect } from 'react';

//Material-UI
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function LoadArchives({ 
  name, 
  label, 
  reset, 
  action, 
  type, 
  accepted,
  multiple = false, 
  maxSizeFile, 
  updatePreview = false 
}) {
  const [archivos, setArchivos] = useState(0);
  //Acción al cambiar los archivos
  const handleChange = e => {
    const data = e.target.files;
    let change = false;

    //Actualizar datos
    action(e, type);

    //Custom Update
    if (updatePreview){
      const {update, currentAvatar} = updatePreview;
      if (data[0]) {
        update(URL.createObjectURL(data[0]));
      } else {
        update(currentAvatar);
      }
    }

    //Visor de archivos actuales
    for (let i = 0; i < data.length; i++) {
      setArchivos(i + 1);
      change = true;
    }
    //Verificar cambios
    !change && setArchivos(0);
  };

  //EFECT RESET
  useEffect(() => {
    //Custom Input
    const e = {
      target: {
        name: name, files: []
      }
    };
    //Set values
    setArchivos(0);
    //Actualizar datos
    action(e, type);
  }, [reset, action, name, type]);

  return (
    <div className="uploadArchives" style={{ textAlign: "center" }}>
      <input 
        accept={accepted}
        id="upload_files" 
        multiple={multiple} 
        type="file" 
        name={name} 
        style={{ display: "none" }} 
        onChange={handleChange} 
      />
      <label htmlFor="upload_files">
        <Button variant="contained" startIcon={<CloudUploadIcon />} disableElevation component="span">
          Cargar {!multiple ? label.unique : label.multiple}
        </Button>
      </label>
      <div className="info" style={{ display: "flex", flexDirection: "column", marginTop: "5px" }}>
        {!multiple ? (<span>(Tamaño máximo: {maxSizeFile.unique})</span>)
          :
          (<React.Fragment>
            <span>Archivos seleccionados: {archivos}</span>
            <span>(Tamaño máximo: {maxSizeFile.multiple})</span>
          </React.Fragment>)}
      </div>
    </div>);
}

export default LoadArchives;