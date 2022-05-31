import React from 'react'
import { useController } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

export default function DatePickerHook({
  label,
  name,
  control,
  rules = { required: '* Campo requerido' },
  defaultValue = '',
  helperText,
  disableFuture,
}) {
  const {
    field: { ref, onChange, value, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });

  return (
    <DatePicker
      disableFuture={disableFuture}
      inputRef={ref}
      label={label}
      views={['year', 'month', 'day']}
      openTo="year"
      onChange={(newValue) => {
        onChange(newValue)
      }}
      value={value}
      renderInput={(params) => (
        <TextField 
          size='small' 
          fullWidth 
          {...inputProps}
          {...params} 
          error={invalid} 
          helperText={error ? error.message : helperText}
        />
      )}
    />
  )
}
