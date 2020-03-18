import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');

function Example() {
  return (
    <React.Fragment>
        <Login />
        <Test />
    </React.Fragment>
  );
}

function Login() {
  const [data, setData] = useState({
    user: '',
    pass: '',
    checkbox: false,
    token: csrf_token
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      //Ajax
      console.log("Petición enviada!!");
      const res = await axios.post('api/login', { ...data });

      console.log(`Peticion recibida: `,res.data);
    } catch (e) {
      //Error
      const { data } = e.response;
      console.log(data);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "checkbox") {
      const { checked } = e.target;
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
  }
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <input name="user" type="text" onChange={handleChange} value={data.user} placeholder="Usuario" />
      <input name="pass" type="password" onChange={handleChange} value={data.pass} placeholder="Contraseña" />
      <input name="checkbox" type="checkbox" onChange={handleChange} checked={data.checkbox} placeholder="Recordar" />
      <button>Enviar</button>
    </form>
  );
}

function Test() {
  const [data, setData] = useState({
    user: '',
    pass: '',
    checkbox: false,
    token: csrf_token
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      //Ajax
      console.log("Petición enviada!!");
      const res = await axios.post('api/testAuth', { ...data });

      console.log(`Peticion recibida: `,res.data);
    } catch (e) {
      //Error
      const { data } = e.response;
      console.log(data);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "checkbox") {
      const { checked } = e.target;
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
  }
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <input name="user" type="text" onChange={handleChange} value={data.user} placeholder="Usuario" />
      <input name="pass" type="password" onChange={handleChange} value={data.pass} placeholder="Contraseña" />
      <input name="checkbox" type="checkbox" onChange={handleChange} checked={data.checkbox} placeholder="Recordar" />
      <button>Enviar</button>
    </form>
  );
}

export default Example;

if (document.getElementById('example')) {
  ReactDOM.render(<Example />, document.getElementById('example'));
} else {
  ReactDOM.render("Error", document.getElementById('example'));
}
