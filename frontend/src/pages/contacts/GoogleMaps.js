import React from 'react';

import GoogleMapReact from 'google-map-react';

// MUI
import RoomIcon from '@mui/icons-material/Room';

const AnyReactComponent = ({ text }) => <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    <RoomIcon color='error' sx={{ fontSize: 48 }} />
  </div>;

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
          lng={-67.471812}
          text=""
        />
      </GoogleMapReact>
    </div>
  )
}
