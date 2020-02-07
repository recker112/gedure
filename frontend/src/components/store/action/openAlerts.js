//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const openAlert = (text, severity, timeOut=false) => {
  return {
    type: "OPEN_ALERT",
    payload: {
      open: true,
      text: text,
      severity: severity,
      timeOut: timeOut,
    }
  }
}

export default openAlert;