import React from 'react';
import { Paper } from '@material-ui/core';

export function SwitchButton(props) {
  const handleClickSwitch = (e) => {
    if (e.target.id === "SONnoticias") {
      //Cambiar background
      document.getElementById('SONnoticias').classList.add('active');
      document.getElementById('SONanuncios').classList.remove('active');
      props.setestado('noticias');
    }
    else {
      //Cambiar background
      document.getElementById('SONnoticias').classList.remove('active');
      document.getElementById('SONanuncios').classList.add('active');
      props.setestado('anuncios');
    }
  };
  return (<div className="SwitchOptionNews">
    <Paper variant="outlined">
      <span id="SONnoticias" className={`ItemSwitchNews active`} onClick={handleClickSwitch}>Noticias</span>
      <span id="SONanuncios" className="ItemSwitchNews" onClick={handleClickSwitch}>Anuncios</span>
    </Paper>
  </div>);
}
