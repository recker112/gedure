import React, { useRef } from 'react'

// MUI
import { Button, ButtonGroup, Divider, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TableChartIcon from '@mui/icons-material/TableChart';
import LinkIcon from '@mui/icons-material/Link';

// Form
import { useController, useFormContext, useWatch } from 'react-hook-form';

function ToolBar({ textRef, value, disabled }) {
	const formats = {
		'bold': '**',
		'italic': '*',
		'header1': '#',
		'header2': '##',
		'header3': '###',
		'header4': '####',
		'list': '-',
		'listOrden': '1.',
	}
	
	const { setValue } = useFormContext();
	
	const handleFormat = (formating) => {
		const start = textRef.current.selectionStart;
		const finish = textRef.current.selectionEnd;
		const simbol = formats[formating];
		
		if ((finish - start) > 0) {
			const selected = value.substring(start, finish);
			
			const textParse = `${value.substring(0, start)}${simbol}${selected}${simbol}${value.substring(finish, value.length)}`;
			
			setValue('markdown', textParse);
		}else {
			setValue('markdown', value + `${simbol}Texto${simbol}`);
		}
	}
	
	const handleFormatLine = (formating) => {
		const start = textRef.current.selectionStart;
		const finish = textRef.current.selectionEnd;
		const simbol = formats[formating];
		
		if ((finish - start) > 0) {
			const selected = value.substring(start, finish);
			
			const textParse = `${value.substring(0, start)}${simbol} ${selected}${value.substring(finish, value.length)}`;
			
			setValue('markdown', textParse);
		}else {
			setValue('markdown', value + `${simbol} Título`);
		}
	}
	
	const handleFormatTable = () => {
		const start = textRef.current.selectionStart;
		
		setValue('markdown', value + `${(start || value.length) ? '\n' : ''}|Cabecera|Cabecera|\n|----|----|\n|Celda|Celda|`);
	}
	
	const handleFormatLink = () => {
		const start = textRef.current.selectionStart;
		
		setValue('markdown', value + `${(start || value.length) ? '\n' : ''}[Texto a mostrar](URL)`);
	}
	
	return (
		<Grid item xs={12} data-tour="gdPub__tooltip">
			<Tooltip title='Negrita' arrow>
				<IconButton onClick={()=>handleFormat('bold')} disabled={disabled} aria-label="format bold">
					<FormatBoldIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Tooltip title='Curva' arrow>
				<IconButton onClick={()=>handleFormat('italic')} disabled={disabled} aria-label="format italic">
					<FormatItalicIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<ButtonGroup variant="text" aria-label="button group headers" color='inherit'>
				<Tooltip title='Encabezado 1' arrow>
					<Button onClick={()=>{handleFormatLine('header1')}} disabled={disabled}>H1</Button>
				</Tooltip>
				<Tooltip title='Encabezado 2' arrow>
					<Button onClick={()=>{handleFormatLine('header2')}} disabled={disabled}>H2</Button>
				</Tooltip>
				<Tooltip title='Encabezado 3' arrow>
					<Button onClick={()=>{handleFormatLine('header3')}} disabled={disabled}>H3</Button>
				</Tooltip>
				<Tooltip title='Encabezado 4' arrow>
					<Button onClick={()=>{handleFormatLine('header4')}} disabled={disabled}>H4</Button>
				</Tooltip>
			</ButtonGroup>
			<Tooltip title='Lista desordenada' arrow>
				<IconButton onClick={()=>handleFormatLine('list')} disabled={disabled} aria-label="format list">
					<FormatListBulletedIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Tooltip title='Lista ordenada' arrow>
				<IconButton onClick={()=>handleFormatLine('listOrden')} disabled={disabled} aria-label="format listOrden">
					<FormatListNumberedIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Tooltip title='Tabla' arrow>
				<IconButton onClick={handleFormatTable} disabled={disabled} aria-label="format table">
					<TableChartIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Tooltip title='Tabla' arrow>
				<IconButton onClick={handleFormatLink} disabled={disabled} aria-label="format link">
					<LinkIcon fontSize="small" />
				</IconButton>
			</Tooltip>
		</Grid>
	)
}

export default function MarkDown({ disabled, defaultValue }) {
  const textAreaRef = useRef(null);

  const { control, formState: { errors } } = useFormContext();

  const {
    field: { ref, ...inputProps },
  } = useController({
    name: 'markdown',
    control,
		rules: {
			required: '* Campo requerido',
			minLength: { value: 10, message: 'Error: Demaciado corto' },
		},
    defaultValue: defaultValue,
  });

  const markdown = useWatch({
    control,
    name: 'markdown',
    defaultValue: defaultValue,
  });
	
  return (
    <>
      <ToolBar textRef={textAreaRef} value={markdown} disabled={disabled} />
      <Divider style={{margin: '5px 0', width: '100%'}} />
      <Grid sx={{mt: 1}} item xs={12}>
				<TextField
					{...inputProps}
					data-tour="gdPub__content"
					multiline
					minRows={12}
					maxRows={20}
          variant='outlined'
					label='Contenido'
					error={Boolean(errors.markdown)}
					helperText={errors?.markdown?.message ? errors.markdown.message : `${markdown?.length} Caracteres`}
					disabled={disabled}
					inputRef={textAreaRef}
					fullWidth 
				/>
			</Grid>
    </>
  )
}
