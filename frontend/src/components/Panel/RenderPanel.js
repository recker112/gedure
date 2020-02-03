import React, { useState } from 'react'
import HeaderPanel from './components/HeaderPanel'
import DrawerMenu from './components/DrawerMenu';
import { RenderContent } from './RenderContent';

export const ContentController = React.createContext();

export default function RenderPanel(props) {
  const [content, setContent] = useState('home');
  const [toggleDrawe, setToggleDrawer] = useState(false);
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
      changeToggleDrawer
    }}
    >
    <div className="BoxPagePanel">
      <HeaderPanel data={data} />
      <DrawerMenu />
      <RenderContent />
    </div>
    </ContentController.Provider>
  )
}