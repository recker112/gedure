const updateForms = (form, loading, inputs = null) => {
  return {
    type: `UPDATE_FORM`,
    payload: {form, loading, inputs}
  }
}

export default updateForms;