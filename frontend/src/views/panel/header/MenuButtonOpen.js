import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

//Redux
import { connect } from 'react-redux';
import toggleDrawer from '../../../actions/panel/toggleDrawer';

function MenuButtonOpen({toggleDrawer}) {
  return (
    <Tooltip 
      enterDelay={1000} 
      leaveDelay={200} 
      title='Mostrar menú' 
      arrow
    >
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
    </Tooltip>
  );
}

const mapDispatchToProps = {
  toggleDrawer,
}

export default connect(null,mapDispatchToProps)(MenuButtonOpen);