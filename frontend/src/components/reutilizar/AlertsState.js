import React from 'react';
import { Grow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export function AlertsState(props) {
  const { control, set } = props;

  return <Grow in={control.alertOpen}>
    <Alert style={{
    position: "fixed",
      bottom: "10px",
      right: "10px",
      zIndex: 10
    }} severity={control.alertSeverity} onClose={() => {
      set({ ...control, alertOpen: false });
    } }>{control.alertText}</Alert>
  </Grow>;
}