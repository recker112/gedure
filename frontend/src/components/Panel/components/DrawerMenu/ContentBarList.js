import React from 'react';
import { List, Divider } from '@material-ui/core';

//Componentes
import CloseDrawerMenu from './CloseDrawerMenu';
import { BarListButton } from "./BarListButton";

//Iconos
import History from '@material-ui/icons/History';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import BuildIcon from '@material-ui/icons/Build';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import HomeIcon from '@material-ui/icons/Home';

export const ContentBarList = () => {
  return (<div role="presentation">
    <div className="drawerMenu">
      <span className="TextHead">Menú</span>
      <CloseDrawerMenu />
    </div>
    <List style={{ width: "250px" }} dense={true}>
    <BarListButton options={{
        title: 'Dashboard', 
        content: 'Inicio del panel', 
        redirect: 'home',
        text: 'Dashboard'
      }}>
       <HomeIcon/>
      </BarListButton>
      <Divider/>
      <BarListButton options={{
        title: 'Registros', 
        content: 'Muestra todos los movimientos realizados en toda la app, desde inicios de sesión hasta movimientos en la matrícula', 
        text: 'Registros', 
        redirect: 'registros'
      }}>
       <History/>
      </BarListButton>
      <BarListButton options={{
        title: 'Consultar/Modificar', 
        content: 'Permite realizar consultas para poder ver todos los estudiantes de una sección, ver los baneados, ver los baneados permanentes, añadir usuarios al sistema, entre otras funcionalidades.', 
        text: 'Consultar/Modificar', 
        redirect: 'consultar/modificar'
      }}>
       <ReceiptIcon/>
      </BarListButton>
      <BarListButton options={{
        title: 'Cargar', 
        content: 'Permite cargar boletas o matricula en el servidor, modificando las ya existentes.', 
        text: 'Cargar', 
        redirect: 'cargar'
      }}>
        <CloudUploadIcon/>
      </BarListButton>
      <BarListButton options={{
        title: 'Opciones', 
        content: 'Configura algunas opciones de un estudiante o una sección completa.', 
        text: 'Opciones', 
        redirect: 'opciones'
      }}>
       <BuildIcon/>
      </BarListButton>
      <BarListButton options={{
        title: 'Archivos', 
        content: 'Carga o elimina los archivos los descargables por el estudiante.', 
        text: 'Archivos', 
        redirect: 'archivos'
      }}>
        <ArchiveIcon/>
      </BarListButton>
      <BarListButton options={{
        title: 'Borrar', 
        content: 'Elimina boletas, estudiantes, o secciones del sistema.', 
        text: 'Borrar', 
        redirect: 'borrar'
      }}>
        <DeleteIcon/>
      </BarListButton>
      <Divider/>
      <BarListButton options={{
        title: 'Publicar', 
        content: 'Publica un auncio o una noticia nueva.', 
        text: 'Publicar', 
        redirect: 'publicar'
      }}>
        <NewReleasesIcon/>
      </BarListButton>
      <BarListButton options={{
        title: 'Borrar publicación', 
        content: 'Borra publicaciones, así de fácil.', 
        text: 'Borrar publicación.', 
        redirect: 'deletePublicacion.'
      }}>
        <DeleteSweepIcon/>
      </BarListButton>
    </List>
  </div>);
};
