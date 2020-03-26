import React from 'react';
import { Paper, Zoom } from '@material-ui/core';

export function AnnounceBox(props) {
	//Destructing
	const { text, background, data } = props.options;

	//regresar
	return (
		<Paper variant="outlined" className="Status">
			<Zoom in={true} timeout={800}>
				<div className="circulo" style={{ background: background }}>
					<span className="text">{data}</span>
				</div>
			</Zoom>
			<div>{text}</div>
		</Paper>
	);
}