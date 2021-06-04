import React, { useEffect, useRef } from 'react';

import { useParams, Link as RouteLink } from 'react-router-dom';

import { useReactToPrint } from 'react-to-print';

import html2canvas from 'html2canvas';

import { jsPDF } from "jspdf";

import { 
	Container,
	Box,
	Grid,
	Tooltip,
	IconButton,
	CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GetAppIcon from '@material-ui/icons/GetApp';
import PrintIcon from '@material-ui/icons/Print';

import useFetch from '../../../hooks/useFetch';

// Components
import TransactionPDF from './TransactionPDF';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import updateForms from '../../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(5),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
}));

export default function PageVerTransacciones() {
	const pdfRef = useRef(null);
	const { id } = useParams();
	document.title = 'La Candelaria - Ver transacciones';
	
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.showTransaction.loading,
		data: state.forms.showTransaction.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const { fetchData } = useFetch();
	
	const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });
	
	const handleDownload = async () => {
		const canvas = await html2canvas(document.getElementById('PDF'));
		const imgData = canvas.toDataURL('image/jpeg');
		console.log(imgData);
		
		/*const doc = new jsPDF();
		doc.addImage(imgData, 'PNG', 0, 0);
		doc.save(`transaccion-${id}.pdf`);*/
	};
	
	useEffect(()=>{
		const requestPost = async () => {
			const prepare = {
				url: `v1/transaction/${id}`,
				type: 'get',
				messageToFinish: false,
				messageTo404: false,
			};
			
			const response = await fetchData(prepare);

			if (response) {
				response.payload = JSON.parse(response.payload);
				dispatch(updateForms('showTransaction', false, response));
			}
		}
		
		requestPost();
		
		return () => {
			dispatch(updateForms('showTransaction', true, {}));
		}
		// eslint-disable-next-line
	},[]);
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box mb={3}>
					<Grid container justify='space-between'>
						<Tooltip title='Volver' arrow>
							<IconButton disabled={loading} component={RouteLink} to='/gedure/transacciones' aria-label="return">
								<ArrowBackIcon />
							</IconButton>
						</Tooltip>
						<div>
							<Tooltip title='Descargar' arrow>
								<IconButton 
									disabled={loading || !data.id} 
									aria-label="download"
									onClick={handleDownload}
									component='span'
								>
									<GetAppIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title='Imprimir' arrow>
								<IconButton 
									disabled={loading || !data.id} 
									aria-label="print"
									onClick={handlePrint}
									component='span'
								>
									<PrintIcon />
								</IconButton>
							</Tooltip>
						</div>
					</Grid>
				</Box>
				{loading && (
					<Box align='center'>
						<CircularProgress />
					</Box>
				)}
				{(!loading && data.id) && (
					<TransactionPDF data={data} pdfRef={pdfRef} />
				)}
				{(!loading && !data.id) && (
					<Box align='center' fontSize='body1.fontSize'>
						No se pudo encontrar la transacciรณn solicitada.
					</Box>
				)}
			</Container>
		</main>
	);
}