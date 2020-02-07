//React
import React, { useEffect } from 'react';

//Material-UI
import { Grow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

//Redux
import { connect } from 'react-redux';
import closeAlert from '../store/action/closeAlert';

function AlertsState({alertsStatus, closeAlert}) {
  //Controlador del tiempo
  let time;

  //Verificar time Out
  if (alertsStatus.timeOut){
    time = setTimeout(() => {
      closeAlert()
    }, 5000);
    console.log("X");
  }

  //Al desmontar el componente
  useEffect(() => {
    //FIX TIMEOUT
    if (!alertsStatus.open) {
      clearTimeout(time);
    }
    return () => {
      clearTimeout(time);
    }
  }, [alertsStatus, time])

  //Regresar alerta
  return <Grow in={alertsStatus.open}>
    <Alert style={{
    position: "fixed",
      bottom: "10px",
      right: "10px",
      zIndex: 10
    }} severity={alertsStatus.severity} onClose={() => {
      closeAlert();
    } }>{alertsStatus.text}</Alert>
  </Grow>;
}

//REDUX
const mapStateToProps = (state) => ({
  alertsStatus: state.alertsStatus
})

const mapDispatchToProps = {
  closeAlert
}


export default connect(mapStateToProps,mapDispatchToProps)(AlertsState);