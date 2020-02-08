import React, { useState } from 'react'
import HeaderPanel from './components/HeaderPanel'
import DrawerMenu from './components/DrawerMenu';
import { RenderContent } from './RenderContent';
import AlertsState from '../reutilizar/AlertsState';

export const ContentController = React.createContext();

export default function RenderPanel() {
  const [content, setContent] = useState('home');
  const [toggleDrawe, setToggleDrawer] = useState(false);

  //Cambiar el contenido a mostrar
  const changeContent = (content) => {
    setContent(content);
  }

  //Cambiar el estado del drawer
  const changeToggleDrawer = () => {
    setToggleDrawer(!toggleDrawe);
  }

  return (
    <ContentController.Provider value={{
      toggleDrawe, 
      changeToggleDrawer
    }}
    >
    <div className="BoxPagePanel">
      <HeaderPanel />
      <DrawerMenu />
      <RenderContent />
      <AlertsState />
    </div>
    </ContentController.Provider>
  )
}