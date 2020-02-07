//Se crea una acción la cual recibe como parámetro
//un valor llamado "tema", siendo este el tema actual
//a usar en la web.
const setTema = tema => {
  return {
    type: "UPDATE_THEME",
    payload: tema
  }
}

export default setTema;