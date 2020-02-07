const updateBeforeAuthStorage = (dataJSON) => {
  return {
    type: "UPDATE_BEFORE_AUTH_STORAGE",
    payload: dataJSON
  }
}

export default updateBeforeAuthStorage;