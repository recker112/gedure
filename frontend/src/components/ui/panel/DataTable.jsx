/**
 * React
 */
import { useId, useState } from "react";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

/**
 * Components
 */
import { EmptyState } from "./cards";

/**
 * Tabla de listado con buscador, filtros y paginación, todo en cliente sobre
 * `rows` (MAQUETA: en la app real la paginación y los filtros irán al backend,
 * como los `?page=&search=` del ReactTableBase de la Gedure anterior).
 *
 * - `columns`: `{ key, label, render?, align?, hideOnMobile?, width? }`.
 * - `filters`: `{ key, label, options: string[] }`; filtra por igualdad sobre `row[key]`.
 * - `searchKeys`: claves en las que busca el texto libre.
 * - `toolbar`: nodos extra a la derecha de los filtros (botones).
 */
export default function DataTable({ label, columns, rows, searchKeys = [], searchPlaceholder = "Buscar…", filters = [], toolbar, pageSize = 8, emptyText = "No hay resultados con esos filtros." }) {
  const searchId = useId();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const text = search.trim().toLowerCase();
  const filtered = rows.filter(
    (row) =>
      (!text || searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(text))) &&
      filters.every(({ key }) => !selected[key] || row[key] === selected[key]),
  );
  const visible = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const hideSx = (col) => (col.hideOnMobile ? { display: { xs: "none", md: "table-cell" } } : null);

  return (
    <Card>
      {(searchKeys.length > 0 || filters.length > 0 || toolbar) && (
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} sx={{ p: 2, alignItems: { md: "center" } }}>
          {searchKeys.length > 0 && (
            <TextField
              id={searchId}
              size="small"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              slotProps={{
                htmlInput: { "aria-label": searchPlaceholder },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ flexGrow: 1, maxWidth: { md: 360 } }}
            />
          )}
          {filters.map((filter) => (
            <TextField
              key={filter.key}
              select
              size="small"
              label={filter.label}
              value={selected[filter.key] ?? ""}
              onChange={(e) => {
                setSelected({ ...selected, [filter.key]: e.target.value });
                setPage(0);
              }}
              sx={{ minWidth: 170 }}
            >
              <MenuItem value="">Todos</MenuItem>
              {filter.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ))}
          {toolbar && <Box sx={{ ml: { md: "auto" }, display: "flex", gap: 1, flexWrap: "wrap" }}>{toolbar}</Box>}
        </Stack>
      )}
      <TableContainer>
        <Table size="small" aria-label={label}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align} sx={{ fontWeight: 700, whiteSpace: "nowrap", width: col.width, ...hideSx(col) }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align} sx={{ py: 1.25, ...hideSx(col) }}>
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {filtered.length === 0 && <EmptyState icon={SearchOffOutlinedIcon} title="Sin resultados" description={emptyText} />}
      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(_, next) => setPage(next)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 8, 15, 25]}
        labelRowsPerPage="Filas"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
      />
    </Card>
  );
}
