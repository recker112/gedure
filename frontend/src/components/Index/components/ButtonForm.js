import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class ButtonForm extends Component {
  render() {
    if (this.props.validating){
      return(
        <CircularProgress />
      )
    }else {
      return (
        <Button variant="contained" type="submit" color="primary">Acceder</Button>
      )
    }
  }
}

export default ButtonForm;
