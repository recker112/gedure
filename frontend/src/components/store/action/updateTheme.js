//Se crea una acción la cual recibe como parámetro
//un valor llamado "tema", siendo este el tema actual
//a usar en la web.
const updateTheme = () => {
  return {
    type: "UPDATE_THEME"
  }
}

export default updateTheme;