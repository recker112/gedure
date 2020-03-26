//Se crea una acciรณn la cual serรก capturada
//por el reducer correspondiente.
const updateIndexDrawer = (index) => {
  return {
    type: "UPDATE_INDEX_DRAWER",
		payload: index
  }
}

export default updateIndexDrawer;