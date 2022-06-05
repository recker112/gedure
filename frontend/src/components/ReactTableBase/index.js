import React, { useEffect } from "react";

// MUI
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import GroupIcon from "@mui/icons-material/Group";
import RefreshIcon from '@mui/icons-material/Refresh';

// Table
import {
  useTable,
  useGlobalFilter,
  useRowSelect,
  usePagination,
} from "react-table";

// Components
import { GlobalFilter } from "./GlobalFilter";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";

export default function ReactTableBase({
  data,
  columns,
  pageSizeData,
  pageCountData,
  loading,
  handleGlobalFilter,
  handleChange,
  filter,
  massiveOptions,
  title,
  refresh
}) {
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
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ position: "relative" }}>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer - 1,
              position: "absolute",
            }}
            open={loading}
          >
            <CircularProgress />
          </Backdrop>
          <Toolbar
            sx={{
              ...(selectedFlatRows.length > 0 && {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
              }),
            }}
          >
            {selectedFlatRows.length > 0 ? (
              <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
                noWrap
              >
                {selectedFlatRows.length} seleccionada(s)
              </Typography>
            ) : (
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="registros"
                component="div"
                noWrap
              >
                {title}
              </Typography>
            )}
            <GlobalFilter
              state={state}
              setGlobalFilter={handleGlobalFilter}
              gotoPage={gotoPage}
            />
            {selectedFlatRows.length > 0 ? (
              massiveOptions(selectedFlatRows.map(
                (d) => d.original
              ))
            ) : (
              <>
                {massiveOptions && (
                  <Tooltip title="Opciones massivas" arrow>
                    <IconButton
                      component="span"
                      onClick={() => {
                        allColumns.map((column) => {
                          if (column.id  === 'massiveSelection') {
                            column.toggleHidden();
                          } else if (column.id === 'options') {
                            column.toggleHidden();
                          }
                          return null;
                        });
                      }}
                      disabled={selectedFlatRows.length > 0}
                    >
                      <GroupIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title='Recargar' arrow>
                  <IconButton
                    component="span"
                    onClick={refresh}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                {filter}
              </>
            )}
          </Toolbar>
          <TableContainer>
            <Box overflow="auto">
              <Table
                sx={{ minWidth: 650 }}
                aria-label="React Table"
                {...getTableProps()}
              >
                <TableHead sx={{ th: { border: 0 } }}>
                  {headerGroups.map((headerGroup) => (
                    <TableRow
                      sx={{ td: { border: 0 } }}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => {
                        if (column.id === "massiveSelection") {
                          return (
                            <TableCell
                              padding="checkbox"
                              {...column.getHeaderProps()}
                            >
                              {column.render("Header")}
                            </TableCell>
                          );
                        } else if (column.Header === "Opciones") {
                          return (
                            <TableCell
                              align="right"
                              {...column.getHeaderProps()}
                            >
                              {column.render("Header")}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <TableRow sx={{ height: "73px" }} {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          if (cell.column.id === "massiveSelection") {
                            return (
                              <TableCell
                                padding="checkbox"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </TableCell>
                            );
                          } else if (cell.column.Header === "Opciones") {
                            return (
                              <TableCell align="right" {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </TableCell>
                            );
                          }

                          return (
                            <TableCell {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                  {page.length === 0 && (
                    <TableRow>
                      <TableCell colSpan="100%">
                        <Typography textAlign="center">
                          No se han encontrado resultados
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
            <Box overflow="auto" minWidth={352}>
              <Table>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan="100%" sx={{ border: 0 }}>
                      <Grid
                        container
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={1}
                        item
                        xs={12}
                      >
                        <Grid item>
                          <Select
                            labelId="page-size-table-label"
                            id="page-size-table"
                            value={pageSize}
                            label="Filas"
                            variant="standard"
                            onChange={(e) => {
                              setPageSize(Number(e.target.value));
                            }}
                          >
                            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                              <MenuItem key={pageSize} value={pageSize}>
                                {pageSize} Filas
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Primera página" arrow>
                            <IconButton
                              component="span"
                              onClick={() => gotoPage(0)}
                              disabled={!canPreviousPage}
                            >
                              <FirstPageIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Anterior" arrow>
                            <IconButton
                              component="span"
                              onClick={previousPage}
                              disabled={!canPreviousPage}
                            >
                              <NavigateBeforeIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Box
                            component="span"
                            fontSize="body2.fontSize"
                            color="text.secondary"
                          >
                            {pageIndex + 1} de {pageOptions.length}
                          </Box>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Siguiente" arrow>
                            <IconButton
                              component="span"
                              onClick={nextPage}
                              disabled={!canNextPage}
                            >
                              <NavigateNextIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Última página" arrow>
                            <IconButton
                              component="span"
                              onClick={() => gotoPage(pageCount - 1)}
                              disabled={!canNextPage}
                            >
                              <LastPageIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
