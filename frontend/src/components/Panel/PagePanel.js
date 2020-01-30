import React, { Component } from 'react';

class PagePanel extends Component {
  state = {
    auth: false,
    data: ''
  }

  componentDidMount(){
    // Verificar props enviados desde el formulario.
    // "this.props.location.state" sirve para poder identificar el objecto
    // el cual contiene todos los props enviados desde la etiqueta Redirect,
    // pero se necesita comprobar primero que este pops contenga algo antes
    // de poder realizar una comprobación de valores, porque sino, todo
    // EXPLOTA
    if (this.props.location.state !== undefined && this.props.location.state.loginIs === true){
      this.setState({
        auth: true,
        data: this.props.location.state.data
      });
    }
  }

  render(){
    if (this.state.auth === true){
      return(
        <h1>Bienvenido {this.state.data.user}</h1>
      )
    }else {
      return(
        <h1>NEL</h1>
      )
    }
  }
}

export default PagePanel;