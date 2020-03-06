//Se crea una acciรณn la cual serรก capturada
//por el reducer correspondiente.
const toggleDrawer = (value) => {
  return {
    type: "TOGGLE_DRAWER",
    payload: value,
  }
}

export default toggleDrawer;