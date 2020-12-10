//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const updateTour = (open, tour) => {
  return {
    type: "UPDATE_TOUR",
		payload: {open, tour}
  }
}

export default updateTour;