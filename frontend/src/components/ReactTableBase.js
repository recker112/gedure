import React, { useEffect, useState } from "react";

// MUI
import { Checkbox, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// Table
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect,
  usePagination,
} from "react-table";

function GlobalFilter(props) {
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
      onChange={(event) => {
        onDebounce(event.target.value);
        setValue(event.target.value);
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
      }}
    />
  );
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox 
          type="checkbox" 
          ref={resolvedRef} 
          indeterminate={indeterminate} 
          color={indeterminate ? 'default' : 'primary'} 
          {...rest}
          />
      </>
    );
  }
);

export default function ReactTableBase(props) {
  const { data, columns, pageSizeData, pageCountData, loading, handleGlobalFilter, handleChange } = props;

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["massiveSelection"],
        pageSize: pageSizeData,
        pageIndex: 0,
      },
      manualPagination: true,
      pageCount: pageCountData,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "massiveSelection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    selectedFlatRows,
    allColumns,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    pageOptions,
    gotoPage,
    pageCount,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  useEffect(() => {
    handleChange({ pageIndex, pageSize });
    // eslint-disable-next-line
  }, [pageIndex, pageSize]);

  return (
    <>
      <GlobalFilter
        state={state}
        setGlobalFilter={handleGlobalFilter}
        gotoPage={gotoPage}
      />
      <button onClick={() => allColumns[0].toggleHidden()}>Toggle</button>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        Primera página
      </button>
      <button onClick={previousPage} disabled={!canPreviousPage}>
        Anterior
      </button>
      <button onClick={nextPage} disabled={!canNextPage}>
        Siguiente
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        Última página
      </button>
      <div>
        {pageIndex + 1} de {pageOptions.length}
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <pre>
        <code>
          {JSON.stringify(
            {
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}
