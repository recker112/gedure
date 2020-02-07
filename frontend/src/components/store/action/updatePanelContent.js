//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const updatePanelContent = (valor) => {
  return {
    type: "UPDATE_PANEL_CONTENT",
    payload: valor
  }
}

export default updatePanelContent;