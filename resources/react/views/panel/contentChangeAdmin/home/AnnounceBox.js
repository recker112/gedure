import React from 'react';
import { Paper, Zoom } from '@material-ui/core';

export function AnnounceBox(props) {
	//Destructing
	const { text, background, data } = props.options;

	//regresar
	return (
		<Paper variant="outlined" className="StatusBox">
			<Zoom in={true} timeout={800}>
				<div className="StatusBox__Circulo" style={{ background: background }}>
					<span className="StatusBox__Text">{data}</span>
				</div>
			</Zoom>
			<div>{text}</div>
		</Paper>
	);
}