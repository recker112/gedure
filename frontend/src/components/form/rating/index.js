import { Rating, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useController } from 'react-hook-form';

export default function RatingHook({
  label,
  labels,
  name,
  control,
  defaultValue,
  disabled,
  ...rest
}) {
  const [labelRanking, setLabelRanking] = useState(defaultValue);
	
	const {
    field: { value, onChange, ...inputProps }
  } = useController({
    name,
    control,
    defaultValue
  });

  return (
    <>
      <Typography>{label}</Typography>
      <Rating
        {...inputProps}
				{...rest}
        disabled={disabled}
				value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
				onChangeActive={(event, newHover) => {
					setLabelRanking(newHover);
				}}
      />
      <Typography>
				{
					labels[labelRanking !== -1 ? labelRanking : value]
				}
			</Typography>
    </>
  )
}
