import React from 'react';

// MUI
import { Slide } from '@mui/material';

const AnimationDialog = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default AnimationDialog;