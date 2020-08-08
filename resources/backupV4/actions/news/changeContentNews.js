//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const changeContentNews = (content) => {
  return {
    type: "CHANGE_CONTENT_NEWS",
    payload: content
  }
}

export default changeContentNews;