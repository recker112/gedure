export class insertTextHTML {
  constructor(res, text) {
    this.respuesta = res,
    this.texto = text
  }

  formatText(footer=false, lote=false) {
    for (let i = 0; i < this.respuesta.archivos_total; i++) {
      const boleta = this.respuesta[i];
      let message;
      if (boleta.message === 'error_upload') {
        message = "No se ha podido cargar el archivo al servidor.";
      }else if (boleta.message === 'no_size') {
        message = "El archivo tiene un tamaño mayor a 2MB.";
      }else if (boleta.message === 'no_format') {
        message = "El archivo no está en formato pdf.";
      }else if (boleta.message === 'no_move') {
        message = "No se ha podido mover el archivo al servidor.";
      }else if (boleta.message === 'ok') {
        message = "El archivo se cargó correctamente.";
      }else {
        message = "Ex000003.";
      }

      this.texto += `Nombre: ${boleta.name}.</br>
      <strong>Estado:</strong> ${message}</br></br>`;
    }

    if (lote) {
      this.respuesta.archivos_total += 20;
    }
    
    //añadir footer
    if (footer) {
      this.texto += `Archivos totales: ${this.respuesta.archivos_total}`;
    }
    return this.texto;
  }
}