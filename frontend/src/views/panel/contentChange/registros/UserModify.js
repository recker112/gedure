import React from 'react';

//Material-UI
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

//Redux
import { connect } from 'react-redux';
import updateInfoModify from '../../../../actions/panel/registros/updateInfoModify';
import updatePanelContent from '../../../../actions/panel/updatePanelContent';

function UserModify({ data, updateInfoModify, updatePanelContent }) {
  function Modify() {
    switch (data.privilegio) {
      case 'V-': {
        const MakeData = {
          cedula: data.cedula,
          name: data.name,
          privilegio: data.privilegio,
          curso: data.curso,
          seccion: data.seccion,
        };
        updateInfoModify(MakeData);
      }
      break;
      case 'A-': {
        const MakeData = {
          cedula: data.cedula,
          name: data.name,
          privilegio: data.privilegio,
          curso: '1',
          seccion: 'A',
        };
        updateInfoModify(MakeData);
      }
      break;
      case 'CR-': {
        const MakeData = {
          cedula: data.cedula,
          name: data.name,
          privilegio: data.privilegio,
          curso: '1',
          seccion: 'A',
        };
        updateInfoModify(MakeData);
      }
      break;
      default: {
        const MakeData = {
          cedula: '',
          name: '',
          privilegio: 'V-',
          curso: '',
          seccion: '',
        };
        updateInfoModify(MakeData);
      }
    }
    updatePanelContent('consultar/modificar');
  }
  return (
    <Tooltip
      title="Editar" 
      placement="right"
      enterDelay={500} 
      leaveDelay={200} 
      arrow
    >
      <IconButton
        onClick={Modify} 
        color="primary"
      >
      <EditIcon />
      </IconButton>
    </Tooltip>
  );
}

const mapDispatchToProps = {
  updateInfoModify,
  updatePanelContent,
}

export default connect(null,mapDispatchToProps)(UserModify);