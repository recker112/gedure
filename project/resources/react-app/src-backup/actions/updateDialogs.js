const updateDialogs = (dialog, open, loading, data = null, status = null) => {
  return {
    type: `UPDATE_DIALOG_DATA`,
    payload: {dialog, open, loading, data, status}
  }
}

export default updateDialogs;