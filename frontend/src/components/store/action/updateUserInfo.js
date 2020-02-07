const updateUserInfo = (input) => {
  return {
    type: "UPDATE_USER_INFO_FORM",
    payload: {
      input
    }
  }
}

export default updateUserInfo;