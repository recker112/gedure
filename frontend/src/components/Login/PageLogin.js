import React, { Component } from 'react';
import NavRouter from '../reutilizar/NavRouter';
import FormLogin from './components/FormLogin';
import Footer from './Footer';

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
        <Footer />
      </div>
    )
  }
}