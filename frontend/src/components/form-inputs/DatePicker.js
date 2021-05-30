import React from 'react';

import { useController } from "react-hook-form";

import { DatePicker } from '@material-ui/pickers';

import format from 'date-fns/format';

export function DatePickerHook(props) {
	const { 
		name, 
		control, 
		rules, 
		defaultValue = '', 
		helperText = '', 
		...rest
	} = props;
	
	const {
    field: { ref, onChange, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue: defaultValue ? format(new Date(defaultValue), 'yyyy/MM/dd') : format(new Date(), 'yyyy/MM/dd'),
  });
	
	return (
		<DatePicker
			{...inputProps}
			{...rest}
			inputRef={ref}
			onChange={date => {
				onChange(format(date, 'yyyy/MM/dd'));
			}}
			helperText={error ? error.message : helperText}
			error={invalid}
		/>
	);
}