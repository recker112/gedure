const updateDialogs = (dialog, open, loading, data = null) => {
  return {
    type: `UPDATE_DIALOG`,
    payload: {dialog, open, loading, data}
  }
}

export default updateDialogs;