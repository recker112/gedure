import React, { useEffect, useState } from 'react';

//Material-UI
import { Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

//redux
import { connect } from 'react-redux';
import { updateNewsAnuncios } from '../../actions/news/updateNews';

//SnackBar
import { useSnackbar } from 'notistack';

//Carousel
import Carousel from 'react-material-ui-carousel';

function ListAnuncios({ list, updateNewsAnuncios }) {
	// Global Const
	const axios = window.axios;
	
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	//Variables
	const [noData, setNoData] = useState(false);
	const [first, setFirst] = useState(true);

	//Get data
	useEffect(
		() => {
			let cancel;
			let CancelAxios = axios.CancelToken;
			
			//FetchData
			const fetchData = async (offset, limit) => {
				try {
					const res = await axios.get(
						`api/anuncios?offset=${offset}&limit=${limit}`, {
						cancelToken: new CancelAxios(c=>{
							cancel = c;
						})
					});

					const { data } = res.data;
					
					// Terminar primera query
					setFirst(false);

					// Verificar si regresa datos
					if (data.length > 0) {
						updateNewsAnuncios([...list, ...data]);
					}else {
						setNoData(true);
					}
				} catch (error) {
					if (!axios.isCancel(error)) {
						enqueueSnackbar('No se han podido obtener los anuncios', {
							variant: 'error'
						});
					}
				}
			};
			
			if (first) {
				const offset = list.length;
				fetchData(offset, 7);
			}

			//Al desmontar
			return () => {
				if (cancel) {
					cancel();
				}
			};
		}, [list, updateNewsAnuncios, axios, enqueueSnackbar, first]
	);
	
	//Al desmontar
	useEffect(()=>{
		return () => {
			updateNewsAnuncios([]);
		}
	}, [updateNewsAnuncios])

	return (
		<aside style={{marginBottom: '15px'}}>
			{list.length !== 0 ? (
				<Carousel autoPlay={false} startAt={0}>
					{list.map((data, i)=> <Anuncio anuncio={data} key={i} />)}
				</Carousel>
			) : (
				<React.Fragment>
					{noData ? (
						<div style={{width: '100%', height: '250px'}}>
							No hay anuncios publicados...
						</div>
					) : (
						<SkeletonAnuncio />
					)}
				</React.Fragment>
			)}
		</aside>
	);
}

export function SkeletonAnuncio() {
	return (
		<Paper>
			<section className="Anuncio">
				<Skeleton variant="text" className="Anuncio__Title" width={200} />
				<p className="Anuncio__Content">
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
				</p>
				<hr style={{width: '100%'}} />
				<footer className="Anuncio__Footer">
					<Skeleton variant="text" width={150} />
				</footer>
			</section>
		</Paper>
	);
}

export function Anuncio({ anuncio }) {
	let name;
	if (anuncio.privilegio === 'A-') {
		name = anuncio.nameA;
	} else {
		name = anuncio.nameC;
	}

	function createMarkup() {
		return {__html: anuncio.content};
	}

	return (
		<Paper key={anuncio.id}>
			<section className="Anuncio">
				<span className="Anuncio__Title">{anuncio.title}</span>
				<p 
					className='Anuncio__Content'
					dangerouslySetInnerHTML={createMarkup()}
				/>
				<hr style={{width: '100%'}} />
				<footer className="Anuncio__Footer">
					Escrito por {name} {anuncio.fecha}
				</footer>
				<div className="Anuncio__Id">
					<small><i>#{anuncio.id}</i></small>
				</div>
			</section>
		</Paper>
	);
}

//REDUX
const mapStateToProps = state => ({
	list: state.news.dataA
});

const mapDispatchToProps = {
	updateNewsAnuncios
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAnuncios);