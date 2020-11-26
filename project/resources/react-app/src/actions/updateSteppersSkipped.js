//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const updateSteppersSkipped = (skipped) => {
  return {
    type: "UPDATE_STEPPER_SKIPPED",
		payload: skipped,
  }
}

export default updateSteppersSkipped;