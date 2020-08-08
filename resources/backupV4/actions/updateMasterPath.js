//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const updateMasterPath = (path) => {
  return {
    type: "UPDATE_MASTER_PATH",
    payload: path
  }
}

export default updateMasterPath;