import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import toggleDrawer from '../../../store/action/panel/toggleDrawer';

//Redux
import { connect } from 'react-redux';

function CloseDrawerMenu({toggleDrawer}) {
  return (
    <Tooltip title="Cerrar menú" arrow>
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Tooltip>
  );
}

const mapDispatchToProps = {
  toggleDrawer,
}

export default connect(null,mapDispatchToProps)(CloseDrawerMenu);