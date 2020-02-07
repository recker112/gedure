import React, { useState } from 'react'
import HeaderPanel from './components/HeaderPanel'
import DrawerMenu from './components/DrawerMenu';
import { RenderContent } from './RenderContent';
import AlertsState from '../reutilizar/AlertsState';

export const ContentController = React.createContext();

export default function RenderPanel(props) {
  const [content, setContent] = useState('home');
  const [toggleDrawe, setToggleDrawer] = useState(false);
  const [AlertController, setAlertController] = useState({
    alertOpen: false,
    alertText: '',
    alertSeverity: 'success',
    alertTimeOut: false,
  })
  const data = props.data;

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
      content, 
      changeContent, 
      toggleDrawe, 
      changeToggleDrawer,
      AlertController,
      setAlertController
    }}
    >
    <div className="BoxPagePanel">
      <HeaderPanel data={data} />
      <DrawerMenu />
      <RenderContent />
      <AlertsState control={AlertController} set={setAlertController} />
    </div>
    </ContentController.Provider>
  )
}