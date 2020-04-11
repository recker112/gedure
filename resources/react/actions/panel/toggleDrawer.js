//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const toggleDrawer = (value) => {
  return {
    type: "TOGGLE_DRAWER",
    payload: value,
  }
}

export default toggleDrawer;