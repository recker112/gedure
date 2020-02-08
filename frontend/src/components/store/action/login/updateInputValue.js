const updateInputValue = (input) => {
  return {
    type: "UPDATE_INPUT_VALUE",
    payload: {
      input
    }
  }
}

export default updateInputValue;