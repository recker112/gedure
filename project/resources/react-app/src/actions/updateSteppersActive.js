//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const updateSteppersActive = (active) => {
  return {
    type: "UPDATE_STEPPER_ACTIVE",
		payload: active,
  }
}

export default updateSteppersActive;