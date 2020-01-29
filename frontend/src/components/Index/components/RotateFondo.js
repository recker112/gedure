import React, { Component } from 'react'

//IMG
import fondo1 from '../../../assets/img/fondo1.jpg';
import fondo2 from '../../../assets/img/fondo2.jpg';
import fondo3 from '../../../assets/img/fondo3.jpg';
import fondo4 from '../../../assets/img/fondo4.jpg';
import fondo5 from '../../../assets/img/fondo5.jpg';
import fondo6 from '../../../assets/img/fondo6.jpg';
import fondo7 from '../../../assets/img/fondo7.jpg';
import fondo8 from '../../../assets/img/fondo8.jpg';

export default class RotateFondo extends Component {
  state = {
    fondo: fondo1,
    interval: ''
  }

  getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(this.number, 10000);
    this.setState({
      interval: this.interval
    });
  }

  number = () => {
    let num = this.getRandomInt(0,8);
    const list = [fondo1, fondo2, fondo3, fondo4, fondo5, fondo6, fondo7, fondo8];

    this.setState({
      fondo: list[num]
    })
  }

  render() {
    return (
      <div className="RotateImg">
        <img src={this.state.fondo} alt="Imagen de fondo de la web">
        </img>
      </div>
    )
  }
}
