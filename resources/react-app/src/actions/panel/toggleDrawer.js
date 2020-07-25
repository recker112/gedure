//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const toggleDrawer = (open) => {
  return {
    type: "TOGGLE_DRAWER",
    payload: open
  }
}

export default toggleDrawer;