//React
import React from 'react';

//Material-UI
import {
	TextField,
	Select,
	MenuItem,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	FormControlLabel
} from '@material-ui/core';

export function RenderSelect({ val, action, data }) {
	return (
		<Select
			displayEmpty
			name={data.name}
			value={val}
			onChange={action}
			style={{ width: '100%' }}
			required
		>
			{data.values.map((element, i) => {
				if (i === 0) {
					return (
						<MenuItem value={element.value}>
							<em>{element.name}</em>
						</MenuItem>
					);
				} else {
					return <MenuItem value={element.value}>{element.name}</MenuItem>;
				}
			})}
		</Select>
	);
}

export function RenderRadios({ val, accion, data }) {
	return (
		<FormControl component="fieldset">
			<FormLabel color={data.color} component="legend">
				{data.title}
			</FormLabel>
			<RadioGroup aria-label={data.name} name={data.name} value={val} onChange={accion} row>
				{data.values.map((element, i) => {
					return (
						<FormControlLabel
							key={i}
							value={element.value}
							control={<Radio color={data.color} />}
							label={element.name}
							labelPlacement="end"
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
}

export function RenderInputs({ data, accion }) {
	const { val, name, label } = data;
	return (
		<TextField
			name={name}
			value={val}
			label={label}
			style={{ width: '100%' }}
			variant="outlined"
			onChange={accion}
			required
		/>
	);
}