//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const updateTour = (open, tour, version) => {
  return {
    type: "UPDATE_TOUR",
		payload: {open, tour, version}
  }
}

export default updateTour;