import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Alerts extends Component {
  state = {
    show: true,
    error: false
  }

  componentWillReceiveProps(){
    this.setState({
      show: true,
      error: this.props.error
    })
  }

  componentWillUnmount(){
    this.setState({
      error: false
    })
  }

  render() {
    if(this.state.error){
      return (
          <Fade in={this.state.show} timeout={1000}>
            <Alert severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.setState({
                      show: false
                    });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >{this.state.error}</Alert>
          </Fade>
      )
    }else {
      return (
        <span></span>
      )
    }
  }
}

export default Alerts;