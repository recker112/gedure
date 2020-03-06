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
  FormControlLabel,
  FormHelperText
} from '@material-ui/core';

export function RenderSelect({ val, action, data, error = false, empty = true, classNameSet = false, customWidth = false }) {
  return (
    <FormControl error={error && error.status} style={{ width: customWidth ? (customWidth) : '100%' }}>
      <Select
        displayEmpty
        name={data.name}
        value={val}
        onChange={action}
        className={classNameSet ? (classNameSet) : null}
      >
        {data.values.map((element, i) => {
          if (i === 0 && empty) {
            return (
              <MenuItem key={i} value={element.value}>
                <em>{element.name}</em>
              </MenuItem>
            );
          } else {
            return <MenuItem key={i} value={element.value}>{element.name}</MenuItem>;
          }
        })}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
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

export function RenderInputs({ data, accion, error }) {
  const { val, name, label } = data;
  const { status, message } = error;
  return (
    <TextField
      name={name}
      value={val}
      label={label}
      style={{ width: '100%' }}
      variant="outlined"
      onChange={accion}
      error={status}
      helperText={status && message}
    />
  );
}