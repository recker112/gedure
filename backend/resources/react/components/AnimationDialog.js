import React from 'react';

//Material-UI
import { Slide } from '@material-ui/core';

const AnimationDialog = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default AnimationDialog;