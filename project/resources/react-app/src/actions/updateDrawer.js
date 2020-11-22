//Se crea una acciรณn la cual serรก capturada
//por el reducer correspondiente.
const updateDrawer = (payload) => {
  return {
    type: "UPDATE_DRAWER",
    payload: payload
  }
}

export default updateDrawer;