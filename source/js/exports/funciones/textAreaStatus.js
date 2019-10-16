export function textAreaStatus(textarea, statusArea, max) {
  textarea.addEventListener('keyup', e=>{
    const actual = contar_caracteres(textarea.value);
    statusArea.innerText = `${actual}/${max} caracteres.`;
  });
}

export function contar_caracteres(texto){
  //Reemplazamos los saltos de linea por espacios
  texto = texto.replace (/\r?\n/g," ");
  //Reemplazamos los espacios seguidos por uno solo
  texto = texto.replace (/[ ]+/g," ");
  //Quitarmos los espacios del principio y del final
  texto = texto.replace (/^ /,"");
  texto = texto.replace (/ $/,"");
  texto = texto.replace (" ","");
  
  return texto.length;
}

function contar_palabras(texto){
  //Reemplazamos los saltos de linea por espacios
  texto = texto.replace (/\r?\n/g," ");
  //Reemplazamos los espacios seguidos por uno solo
  texto = texto.replace (/[ ]+/g," ");
  //Quitarmos los espacios del principio y del final
  texto = texto.replace (/^ /,"");
  texto = texto.replace (/ $/,"");
  //Troceamos el texto por los espacios
  let textoTroceado = texto.split (" ");
  //Contamos todos los trozos de cadenas que existen
  let numeroPalabras = textoTroceado.length;
  //Mostramos el número de palabras
  return numeroPalabras;
}