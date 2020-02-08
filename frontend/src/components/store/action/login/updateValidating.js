const updateValidating = (status) => {
  return {
    type: "UPDATE_VALIDATING_FORM",
    payload: {
      validating: status
    }
  }
}

export default updateValidating;