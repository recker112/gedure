import React from 'react';
import { Grow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export function AlertsState(props) {
  const { DataForm, setDataForm } = props.options;

  return <Grow in={DataForm.alertOpen}>
    <Alert style={{
    position: "fixed",
      bottom: "10px",
      right: "10px",
      zIndex: 10
    }} severity={DataForm.alertSeverity} onClose={() => {
      setDataForm({ ...DataForm, alertOpen: false });
    } }>{DataForm.alertText}</Alert>
  </Grow>;
}