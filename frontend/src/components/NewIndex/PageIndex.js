import React from 'react';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

function PageLogin() {
  const theme = useTheme();
  return(
    <div>
        <Button color="primary" variant="contained"><b>Primary</b></Button>
        <Button color="secondary" variant="contained">Secondary</Button>
        <p>Hola</p>
      </div>
  )
}

export default PageLogin;