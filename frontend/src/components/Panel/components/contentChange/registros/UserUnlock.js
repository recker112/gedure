import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

//Redux
import { connect } from 'react-redux';
import updateInfoModify from '../../../../store/action/panel/registros/updateInfoModify';

function UserUnlock() {
  return (
    <Tooltip 
      title="Desbloquear" 
      placement="right"
      enterDelay={500} 
      leaveDelay={200} 
      arrow
    >
      <IconButton 
        variant="outlined" 
        color="secondary"
      >
        <LockIcon />
      </IconButton>
    </Tooltip>
  );
}

export default UserUnlock;