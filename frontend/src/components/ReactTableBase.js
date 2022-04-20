import React, { useState } from "react";

// MUI
import { TextField } from "@mui/material";

// Table
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect,
  usePagination,
} from "react-table";

function GlobalFilter(props) {
  const { state, setGlobalFilter } = props;
  const [value, setValue] = useState(state.globalFilter);

  const onDebounce = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 400);

  return (
    <TextField
      value={value || ""}
      onChange={(event) => {
        onDebounce(event.target.value);
        setValue(event.target.value);
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
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export default function ReactTableBase(props) {
  const { data, columns } = props;

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["massiveSelection"],
      },
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
    setGlobalFilter,
    state,
    selectedFlatRows,
    allColumns,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    pageSize,
    pageOptions,
    gotoPage,
    pageCount,
  } = tableInstance;

  const { pageIndex } = state;

  return (
    <>
      <GlobalFilter
        state={state}
        setGlobalFilter={setGlobalFilter}
      />
      <button onClick={() => allColumns[0].toggleHidden()}>Toggle</button>
      <select
        value={pageSize}
        onClick={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[1, 2, 3, 4, 5].map((pageSize) => (
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
