//Objeto creador de Data
export class FormDataTransform {
  constructor(...datos){
    this.user = datos[0],
    this.pass = datos[1],
    this.remember = datos[2],
    this.token = datos[3]
  }

  FormTransform() {
    let datos = new FormData();
    datos.append("cedula", this.user);
    datos.append("password", this.pass);
    datos.append("remember", this.remember);
    datos.append("token", this.token);
    return datos;
  }
}