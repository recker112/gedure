import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ButtonForm from './ButtonForm';
import Alerts from '../../reutilizar/Alerts';

class FormLogin extends Component {
  state = {
    user: '',
    pass: '',
    checkbox: false,
    auth: false,
    verificando: false,
    error: false
  }

  prepareConsult = (e) => {
    e.preventDefault();

    //Efecto loading
    this.setState({
      verificando: true,
      error: false
    });

    setTimeout(this.getConsult, 2000);
  }

  getConsult = () => {
    //Data
    const data = this.state;
    
    if (data.user === "Recker" && data.pass === "jenn"){
      this.setState({
        auth: true
      });
    }else {
      this.setState({
        error: 'Usuario y/o contraseña incorrectos'
      })
    }
    //Fin del effecto
    this.setState({
      verificando: false
    });
  }  

  handleChange = (e)=>{
    const object = {};
    e.target.name !== "checkbox" ? 
    object[e.target.name] = e.target.value
    :
    object[e.target.name] = e.target.checked
    this.setState(object);
  }

  render(){
    if (!this.state.auth){
      return(
        <form action="#" autoComplete="off" onSubmit={this.prepareConsult}>
          <div className="formTitle">
            <span>Ingresa tus datos</span>
          </div>
          <div className="formUser">
            <TextField 
              id="loginFormUser"
              label="Usuario"
              required
              fullWidth 
              value={this.state.user}
              onChange={this.handleChange} 
              name="user" 
              size="small"
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="Contraseña"
              required
              type="password"
              onChange={this.handleChange}
              value={this.state.pass}
              fullWidth
              name="pass"
              size="small"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkbox}
                  onChange={this.handleChange}
                  name="checkbox"
                  color="primary"
                />
              }
              label="Recordar en este equipo"
            />
          </div>
          <div>
            <ButtonForm verificando={this.state.verificando} />
          </div>
          <Alerts error={this.state.error} />
        </form>
      )
    }else {
      return(
        <Redirect to={{
          pathname: '/panel',
          state: { loginIs: true,
          data: {
              user: "Recker",
              seccion: "plaga"
            } 
          }
        }}/>
      )
    }
  }
}

export default FormLogin;