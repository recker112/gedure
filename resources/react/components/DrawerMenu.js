import React from 'react';

//Material-UI
import { Drawer } from '@material-ui/core';

//Componentes
import ContentBarList from './DrawerMenu/ContentBarList';

//Redux
import { connect } from 'react-redux';
import toggleDrawer from '../actions/panel/toggleDrawer';

function DrawerMenu({open, toggleDrawer}) {
  return (
    //Usar el controlador del contenido para cambiar
    //el estado del drawerMenu.
     <Drawer 
      open={open}
      onClose={()=>{toggleDrawer(false)}}
    >
      <ContentBarList />
    </Drawer>
  )
}

const mapStateToProps = (state) => ({
  open: state.panelSettings.drawer.open
})
const mapDispatchToProps = {
  toggleDrawer
}

export default connect(mapStateToProps,mapDispatchToProps)(DrawerMenu);