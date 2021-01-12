const updateDialogs = (dialog, open, loading, data = null) => {
  return {
    type: `UPDATE_DIALOGS_DATA`,
    payload: {dialog, open, loading, data}
  }
}

export default updateDialogs;