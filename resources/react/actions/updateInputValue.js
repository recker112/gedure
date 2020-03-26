const updateInputValue = (input,type) => {
  return {
    type: `UPDATE_INPUT_VALUE_${type}`,
    payload: {
      input
    }
  }
}

export default updateInputValue;