//Se crea una acción la cual será capturada
//por el reducer correspondiente.
export const updateNewsAnuncios = (query) => {
  return {
    type: "UPDATE_NEWS_ANUNCIOS",
    payload: query
  }
}

export const updateNewsNoticias = (query) => {
  return {
    type: 'UPDATE_NEWS_NOTICIAS',
    payload: query,
  }
}