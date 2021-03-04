import React, { useMemo } from 'react';

import { 
	Avatar, 
	Chip, 
	Table, 
	TableCell, 
	TableRow, 
	TableBody, 
	TableHead,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useTable, useGlobalFilter } from 'react-table';

// Components
import { Searching } from '../../../components/GlobalFiltering';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		color: 'white',
	},
}));

export default function TableRender({ dataReq }) {
	const data = useMemo(() => dataReq.data || [], [dataReq]);

	const columns = useMemo(
		() => [
			{
				Header: 'Avatar',
				accessor: 'avatar',
				Cell: ({ cell }) => {
					const classes = useStyles();
					return (
						<Avatar
							className={classes.avatar}
							src={cell.value}
							alt={`Avatar User de ${cell.row.original.name}`}
						>
							{cell.row.original.name.substring(0, 1).toUpperCase()}
						</Avatar>
					);
				},
			},
			{
				Header: 'Usuario',
				accessor: 'username',
				Cell: ({ cell }) => {
					if (cell.row.original.privilegio === 'V-' && cell.row.original.n_lista) {
						return (
							<React.Fragment>
								<div>{cell.row.original.privilegio + cell.value}</div>
								<div>N° lista {cell.row.original.n_lista}</div>
							</React.Fragment>
						);
					} else {
						return cell.row.original.privilegio + cell.value;
					}
				},
			},
			{
				Header: 'Nombre',
				accessor: 'name',
			},
			{
				Header: 'Correo',
				accessor: 'email',
			},
			{
				Header: 'Estado',
				accessor: 'actived_at',
				Cell: ({ cell }) => (
					<Chip
						color={cell.value ? 'primary' : 'default'}
						label={cell.value ? 'Activo' : 'Inactivo'}
						data-tour="status"
					/>
				),
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable({
		columns,
		data,
	}, useGlobalFilter);
	
	const { globalFilter } = state;

	return (
		<React.Fragment>
			<Searching filter={globalFilter} setFilter={setGlobalFilter} />
			<Table size="small" {...getTableProps()}>
				<TableHead>
					{headerGroups.map((headerGroup) => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<TableCell {...column.getHeaderProps()}>
									{column.render('Header')}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<TableRow {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <TableCell {...cell.getCellProps()}>
										{cell.render('Cell')}
									</TableCell>;
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}