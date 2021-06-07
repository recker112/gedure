//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const updateSteppersActive = (stepper, active, loading = false, data = null) => {
  return {
    type: "UPDATE_STEPPER_ACTIVE",
		payload: {
			stepper,
			active,
			loading,
			data
		},
  }
}

export default updateSteppersActive;