import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAsyncDebounce } from "react-table";

export function GlobalFilter(props) {
  const { state, setGlobalFilter, gotoPage } = props;
  const [value, setValue] = useState(state.globalFilter);

  const onDebounce = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
    gotoPage(0);
  }, 500);

  return (
    <TextField
      size="small"
      value={value || ""}
      placeholder="Buscar..."
      variant='standard'
      onChange={(event) => {
        onDebounce(event.target.value);
        setValue(event.target.value);
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
      }} />
  );
}
