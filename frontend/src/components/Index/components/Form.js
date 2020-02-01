import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

//Compoentes
import { RenderForm } from './RenderForm';
import { consultAjax } from '../../reutilizar/ajaxConsult';

export function Form() {
  const [DataForm, setDataForm] = useState({
    user: '',
    pass: '',
    checkbox: false,
    validating: false,
    alertOpen: false,
    alertText: '',
    alertSeverity: 'success',
    alertTimeOut: false,
    loginIs: false
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = name === 'checkbox' ? e.target.checked : e.target.value;
    setDataForm({...DataForm, [name]: value});
  }

  const handleSubmit = (e) => {
    //Preparativos
    e.preventDefault();
    setDataForm({...DataForm, validating: true});

    //Evitar que el usuario cambie de ruta para así
    //evitar que el componente se desmonte y pueda causar
    //algún daño.
    document.querySelectorAll('.headerNoPanel button').forEach((element) => {
      element.disabled = true;
    });

    //Consulta
    setTimeout(getConsult, 2000);
  }

  const getConsult = async () => {
    let res = await consultAjax("http://echo.jsontest.com/pass/jenn/user/recker");
    if (res !== 'no_connect'){
      console.log(res);
      if (res.user === DataForm.user && res.pass === DataForm.pass) {
        if (DataForm.checkbox === true){
          localStorage.setItem("loginIs", true);
          localStorage.setItem("data", JSON.stringify(DataForm));
        }
        setDataForm({...DataForm, alertOpen: true,
        alertText: 'Login Realizado correctamente!!',
        alertSeverity: "success",
        alertTimeOut: true,
        validating: false,
        loginIs: true});
      }else {
        setDataForm({...DataForm, alertOpen: true,
        alertText: 'Usuario y/o contraseña incorrecta',
        alertSeverity: "warning",
        alertTimeOut: true,
        validating: false,
        loginIs: false});
      }
    }else {
      setDataForm({...DataForm, alertOpen: true,
      alertText: 'No se pudo conectar con el servidor.',
      alertSeverity: "error",
      alertTimeOut: true,
      validating: false,
      loginIs: false});
    }
    

    //Reactivando botones.
    document.querySelectorAll('.headerNoPanel button').forEach((element) => {
      element.disabled = false;
    });
  }

  useEffect(() => {
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, [])

  //Verificar si se redireccionará o no.
  if (DataForm.loginIs) {
    return (
      <Redirect to={{
        pathname: '/panel',
        state: {
          loginIs: true,
          data: {
            user: DataForm.user
          }
        }
      }} />
    )
  }else {
    return (
      <RenderForm options={{DataForm, handleChange, handleSubmit, setDataForm}} />
    )
  }
}


