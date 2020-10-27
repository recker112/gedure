const updateForms = (selected, loading, data) => {
  return {
    type: `UPDATE_APPDATA`,
    payload: {selected, loading, data}
  }
}

export default updateForms;