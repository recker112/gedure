import React, { useState } from 'react'
import HeaderPanel from './components/HeaderPanel'
import DrawerMenu from './components/DrawerMenu';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { RenderContent } from './RenderContent';

export const ContentController = React.createContext();

export default function RenderPanel(props) {
  const [content, setContent] = useState('home');
  const [toggleDrawe, setToggleDrawer] = useState(false);
  const data = props.data;

  //Controlar la resolución para evitar los tooltips.
  const theme = useTheme();
  const resolution = useMediaQuery(theme.breakpoints.up('sm'));

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
      resolution
    }}
    >
    <div className="BoxPageIndex">
      <HeaderPanel data={data} />
      <DrawerMenu />
      <RenderContent />
    </div>
    </ContentController.Provider>
  )
}