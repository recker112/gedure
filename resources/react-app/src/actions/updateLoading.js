//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const updateLoading = (value,type) => {
  return {
    type: `UPDATE_LOADING_${type}`,
    payload: value
  }
}

export default updateLoading;