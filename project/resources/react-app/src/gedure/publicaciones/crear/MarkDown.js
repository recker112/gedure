import React, { useRef } from 'react';

import {
	IconButton,
	Grid,
	TextField,
	Button,
	ButtonGroup,
	Divider,
	Tooltip,
} from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import TableChartIcon from '@material-ui/icons/TableChart';
import LinkIcon from '@material-ui/icons/Link';

import { useFormContext, Controller, useWatch } from "react-hook-form";

function ToolBar({ textRef, value }) {
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
		<Grid item xs={12}>
			<Tooltip title='Negrita' arrow>
				<IconButton onClick={()=>handleFormat('bold')} aria-label="format bold">
					<FormatBoldIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Tooltip title='Curva' arrow>
				<IconButton onClick={()=>handleFormat('italic')} aria-label="format italic">
					<FormatItalicIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<ButtonGroup variant="text" aria-label="button group headers">
				<Tooltip title='Encabezado 1' arrow>
					<Button onClick={()=>{handleFormatLine('header1')}}>H1</Button>
				</Tooltip>
				<Tooltip title='Encabezado 2' arrow>
					<Button onClick={()=>{handleFormatLine('header2')}}>H2</Button>
				</Tooltip>
				<Tooltip title='Encabezado 3' arrow>
					<Button onClick={()=>{handleFormatLine('header3')}}>H3</Button>
				</Tooltip>
				<Tooltip title='Encabezado 4' arrow>
					<Button onClick={()=>{handleFormatLine('header4')}}>H4</Button>
				</Tooltip>
			</ButtonGroup>
			<Tooltip title='Lista desordenada' arrow>
				<IconButton onClick={()=>handleFormatLine('list')} aria-label="format list">
					<FormatListBulletedIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Tooltip title='Lista ordenada' arrow>
				<IconButton onClick={()=>handleFormatLine('listOrden')} aria-label="format listOrden">
					<FormatListNumberedIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Tooltip title='Tabla' arrow>
				<IconButton onClick={handleFormatTable} aria-label="format table">
					<TableChartIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Tooltip title='Tabla' arrow>
				<IconButton onClick={handleFormatLink} aria-label="format link">
					<LinkIcon fontSize="small" />
				</IconButton>
			</Tooltip>
		</Grid>
	)
}

export default function MarkDown({ defaultValue }) {
	const textAreaRef = useRef(null);
	
	const { control, errors } = useFormContext();
	const watch = useWatch({
    control,
    name: 'markdown',
    defaultValue: '',
  });
	
	return(
		<React.Fragment>
			<ToolBar textRef={textAreaRef} value={watch} />
			<Divider style={{margin: '5px 0', width: '100%'}} />
			<Grid item xs={12}>
				<Controller
					defaultValue={defaultValue}
					control={control}
					name='markdown'
					rules={{
						required: { value: true, message: '* Campo requerido' },
						minLength: { value: 10, message: 'Error: Demaciado corto' },
					}}
					render={({value, onChange, onBlur}) => (
						<TextField 
							multiline
							rows={12} 
							rowsMax={20}
							label='Contenido'
							error={Boolean(errors.markdown)}
							helperText={errors?.markdown?.message ? errors.markdown.message : `${watch?.length} Caracteres`}
							value={value} 
							onChange={onChange} 
							inputRef={textAreaRef}
							fullWidth 
						/>
					)}
				/>
			</Grid>
		</React.Fragment>
	)
}