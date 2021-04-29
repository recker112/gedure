import React, { useState } from 'react';

import {
	Typography
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { useController } from "react-hook-form";

export function RatingHook(props) {
	const {
		name,
		control,
		defaultValue,
		label,
		labels,
		...rest
	} = props;
	const [labelRanking, setLabelRanking] = useState(defaultValue);
	
	const {
    field: { value, ...inputProps }
  } = useController({
    name,
    control,
    defaultValue,
  });
	
	return (
		<React.Fragment>
			<Typography>{label}</Typography>
			<Rating
				{...inputProps}
				{...rest}
				value={value}
				onChangeActive={(event, newHover) => {
					setLabelRanking(newHover);
				}}
			/>
			<Typography>
				{
					labels[labelRanking !== -1 ? labelRanking : value]
				}
			</Typography>
		</React.Fragment>
	);
}