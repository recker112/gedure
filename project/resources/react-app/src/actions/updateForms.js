const updateForms = (form, loading, data = null, status = null) => {
  return {
    type: `UPDATE_FORM_DATA`,
    payload: {form, loading, data, status}
  }
}

export default updateForms;