import React, { useMemo, useState } from 'react'

// MUI
import { Box, Container, Grid, TextField } from '@mui/material';
import Filtrador from './Filtrador';

// Table
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

function GlobalFilter(props) {
  const { state, setGlobalFilter } = props;
  const [value, setValue] = useState(state.globalFilter)

  const onDebounce = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  },400)

  return (
    <Grid item xs={12}>
      <TextField
        value={value || ""}
        onChange={(event) => {
          onDebounce(event.target.value);
          setValue(event.target.value)
        }}
      />
    </Grid>
  )
}

export default function Registros() {
  document.title = 'Registros - La Candelaria';

  const columns = useMemo(() => [
    {
      Header: 'Usuario',
      accessor: 'username',
    },
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Acción',
      accessor: 'action',
    },
    {
      Header: 'Fecha',
      accessor: 'created_at',
    }
  ],[]);

  const data = useMemo(() => [{
    username: 'recker',
    name: 'José Ortiz',
    action: 'Entrar, afirmativo',
    created_at: 'hoy'
  }], []);

  const tableInstance = useTable(
    { columns, data }, 
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
  } = tableInstance;

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Registros</Box>
        <Grid container spacing={2}>
          <Filtrador />
          <GlobalFilter
            state={state}
            setGlobalFilter={setGlobalFilter}
          />
          <Grid item xs={12}>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
