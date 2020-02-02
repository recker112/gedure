import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import RenderPanel from './RenderPanel';


function PagePanel() {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState({})
  const location = useLocation();

  const VerifyDataLocal = () => {
    //Verificar datos locales.
    //Primero verifica si existe el ssesionStorage y después lo inserta
    //para ser transformado a JSON.
    const loginIsS = JSON.parse(
      sessionStorage.getItem("loginIs") !== "null" ? sessionStorage.getItem("loginIs") 
      : 
      false);
    const dataS = JSON.parse(sessionStorage.getItem("data"));
    const loginIsL = JSON.parse(
      localStorage.getItem("loginIs") !== "null" ? 
      localStorage.getItem("loginIs") 
      : 
      false);
    const dataL = JSON.parse(localStorage.getItem("data"));

    //Verificar datos obtenidos.
    if (loginIsS && dataS !== "null"){
      setAuth(true);
      setData(dataS);
      return true;
    } else if (loginIsL && dataL !== "null"){
      setAuth(true);
      setData(dataL);
      return true;
    }else {
      //Regresar false si es que no se cumplen con los
      //suficientes datos para inicar sesión.
      return false;
    }
  }

  const setDataLocal = (data) => {
    console.log(data);
    delete data.pass;
    if (data.checkbox){
      localStorage.setItem('loginIs', true);
      localStorage.setItem('data', JSON.stringify(data));
      sessionStorage.setItem('loginIs', true);
      sessionStorage.setItem('data', JSON.stringify(data));
    }else { 
      sessionStorage.setItem('loginIs', true);
      sessionStorage.setItem('data', JSON.stringify(data));
    }
  }

  useEffect(() => {
    //Seleccionar titulo
    document.title = "La Candelaria - Panel";
    const { state } = location;
    let CanselaSHION = false;

    if (!CanselaSHION){
      //Si no se verifica primero si "state" contiene algo,
      //todo el programa puede EXPLOTAR....
      if (state !== undefined && state.loginIs === true){
        //Setear datos locales y de sesion.
        if (!VerifyDataLocal() && state.data !== undefined){
          setData(state.data);
          setDataLocal(state.data);
          setAuth(true);
        }
      }else {
        //Verificar datos locales.
        VerifyDataLocal();
      }
    }

    return ()=>{
      CanselaSHION = true;
    }
  }, [location])

  if (auth === true){
    return(
        <RenderPanel data={data} />
    )
  }else {
    return(
      <div>
        <h1>Loading....</h1>
        <p>Si tarda mucho es posible que haya ocurrido algún fallo en el sistema de login. Puede solucionar este inconveniente dando click <Link onClick={clearAllData} to="/">aquí</Link> y reintentar su login.</p>
      </div>
    )
  }
}

function clearAllData() {
  //Limpiar toda la data para solventar errores.
  const theme = localStorage.getItem('theme');

  localStorage.clear();
  sessionStorage.clear();

  //Para mantener la configuración del usuario.
  localStorage.setItem("theme", theme);
}

export default PagePanel;