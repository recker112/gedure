//React
import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';

//Material-UI
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

//REDUX
const mapStateToProps = (state) => ({
  validating: state.dataLogin.validating
})

export default connect(mapStateToProps)(ButtonForm);