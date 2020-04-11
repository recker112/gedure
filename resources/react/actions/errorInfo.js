//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const errorInfo = (input,message,type) => {
  return {
    type: `ERROR_INFO_${type}`,
    payload: {
      input,
      message
    }
  }
}

export default errorInfo;