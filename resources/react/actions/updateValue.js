const updateInputValue = (input,type) => {
  return {
    type: `UPDATE_VALUE_${type}`,
    payload: input
  }
}

export default updateInputValue;