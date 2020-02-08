import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import toggleDrawer from '../../store/action/panel/toggleDrawer';

//Redux
import { connect } from 'react-redux';

function MenuButtonOpen({toggleDrawer}) {
  return (
    <Tooltip title='Mostrar menú' arrow>
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