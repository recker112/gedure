import { Checkbox, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";

const classes = {
  separer: {
    marginBottom: 2,
  }
};

function MarkdownTable(props) {
	return (
		<TableContainer component={Paper} sx={classes.separer}>
			<Table size="small" aria-label="a dense table">{props.children}</Table>
		</TableContainer>
	);
}

function MarkdownTableCell(props) {
    return <TableCell>{props.children}</TableCell>
}

function MarkdownTableRow(props) {
    return <TableRow>{props.children}</TableRow>
}

function MarkdownTableBody(props) {
    return <TableBody>{props.children}</TableBody>
}

function MarkdownTableHead(props) {
    return <TableHead>{props.children}</TableHead>
}

const MarkdownListItem = ({ ...props }) => {
	return (
		<li>
			<Typography component="span">{props.children}</Typography>
		</li>
	);
};

function MarkdownParagraph(props) {
	return <Typography sx={classes.separer}>{props.children}</Typography>
}

function MarkdownLink(props) {
	return <Link target='_blank' href={props.href}>{props.children}</Link>
}

const MarkdownHeading = ({ ...props }) => {
	let variant;
	switch (props.level) {
		case 1:
				variant = "h5";
				break;
		case 2:
				variant = "h6";
				break;
		case 3:
				variant = "subtitle1";
				break;
		case 4:
				variant = "subtitle2";
				break;
		default:
				variant = "h6";
				break;
	}
	return (
		<Typography
			gutterBottom
			variant={variant}
		>
			{props.children}
		</Typography>
	);
}

function MarkdownCheckbox (props) {
	return (
		<Checkbox
			color='primary'
			checked={props.checked}
		/>
	)
}

export const renderersMarkdown = {
	h1: MarkdownHeading,
	h2: MarkdownHeading,
	h3: MarkdownHeading,
	h4: MarkdownHeading,
	h5: MarkdownHeading,
	h6: MarkdownHeading,
	a: MarkdownLink,
	p: MarkdownParagraph,
	table: MarkdownTable,
	thead: MarkdownTableHead,
	tbody: MarkdownTableBody,
	tr: MarkdownTableRow,
	td: MarkdownTableCell,
	th: MarkdownTableCell,
	li: MarkdownListItem,
	input: MarkdownCheckbox,
};