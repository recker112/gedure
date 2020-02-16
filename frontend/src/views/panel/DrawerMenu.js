import React from 'react';
import { Drawer } from '@material-ui/core';

//Componentes
import { ContentBarList } from './DrawerMenu/ContentBarList';

//Redux
import { connect } from 'react-redux';
import toggleDrawer from '../../actions/panel/toggleDrawer';

function DrawerMenu({openDrawer, toggleDrawer}) {
  return (
    //Usar el controlador del contenido para cambiar
    //el estado del drawerMenu.
     <Drawer 
      open={openDrawer} 
      onClose={toggleDrawer}
    >
      <ContentBarList />
    </Drawer>
  )
}

const mapStateToProps = (state) => ({
  openDrawer: state.panelSettings.toggleDrawer
})
const mapDispatchToProps = {
  toggleDrawer
}

export default connect(mapStateToProps,mapDispatchToProps)(DrawerMenu);