import React from 'react'
import { useController } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

export default function DatePickerHook({
  label,
  name,
  control,
  rules = { 
    required: '* Campo requerido',
    validate: {
      date: v => !isNaN(v) || 'Error: Fecha inválida',
    }
  },
  size = 'small',
  variant = 'outlined',
  defaultValue = '',
  helperText,
  disabled,
  disableFuture,
  views = ['year', 'month', 'day'],
  openTo = 'year',
}) {
  let rulesMake = rules;
  
  if (disableFuture) {
    rulesMake.validate.future = (v) => v - new Date() <= 0 || 'Error: No puede usar fechas futuras';
  }

  const {
    field: { ref, onChange, value, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules: rulesMake,
    defaultValue: new Date(defaultValue),
  });

  return (
    <DatePicker
      disableFuture={disableFuture}
      inputRef={ref}
      label={label}
      views={views}
      openTo={openTo}
      onChange={(newValue) => {
        onChange(newValue)
      }}
      disabled={disabled}
      value={value}
      renderInput={(params) => (
        <TextField 
          size={size}
          variant={variant}
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
