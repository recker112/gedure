import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import { 
	Typography, 
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

export function MapGoogle(props) {
	const [marker, setMarker] = useState(null);
	const styles = {
		height: 300,
		position: 'static',
	}
	
	const containerStyles = {
		height: 300,
		position: 'relative',
	}
	
	const handleMarker = (props, marker, e) => {
		setMarker(marker);
	}
	
	return (
		<Map
			google={props.google}
			zoom={17}
			style={styles}
			containerStyle={containerStyles}
			initialCenter={{
				lat: 10.227801,
				lng: -67.471912,
			}}
		>
			<Marker	
				onClick={handleMarker}
				name={'UEP APEP "La Candelaria"'}
				position={{lat: 10.227801, lng: -67.471912,}}
			/>
			
			<InfoWindow
				marker={marker}
				visible={Boolean(marker)}
			>
				<Typography variant='h5' style={{color: 'black'}}>
					UEP APE "La Candelaria"
				</Typography>
			</InfoWindow>
		</Map>
	);
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBeVKRoDqAxnETxRz5aSvP6I9ln2rI_sX0',
	language: 'ES',
})(MapGoogle)