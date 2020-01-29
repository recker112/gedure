import React, { Component } from 'react';
import NavRouter from './components/NavRouter';
import FormLogin from './components/FormLogin';

export default class PageLogin extends Component {
  render() {
    return (
      <div className="PageLoginBox">
        <header>
          <NavRouter />
        </header>
        <main>
          <FormLogin />
        </main>
        <footer>Footer</footer>
      </div>
    )
  }
}
