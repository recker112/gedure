import React from 'react';

import GoogleMapReact from 'google-map-react';

// MUI
import { Box } from '@mui/material';

const classes = {
  padding: 2, 
  borderRadius: 100, 
  background: '#ea4335',
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    padding: 1,
    background: '#ea4335',
    borderRadius: '0px 0 90px 90px',
    top: 25,
    left: 9
  }
};

const AnyReactComponent = ({ text }) => <Box sx={classes}>{text}</Box>;

export default function GoogleMaps() {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBeVKRoDqAxnETxRz5aSvP6I9ln2rI_sX0' }}
        defaultCenter={{
          lat: 10.227801,
          lng: -67.471912,
        }}
        defaultZoom={17}
      >
        <AnyReactComponent
          lat={10.227801}
          lng={-67.471912}
          text=""
        />
      </GoogleMapReact>
    </div>
  )
}
