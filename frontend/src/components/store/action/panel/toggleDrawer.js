//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const toggleDrawer = () => {
  return {
    type: "TOGGLE_DRAWER"
  }
}

export default toggleDrawer;