const setTheme = tema => {
  console.log(tema);
  return {
    type: "UPDATE_THEME",
    payload: tema
  }
}

export default setTheme;