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
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	//Variables
	const [hasFinish, setHasFinish] = useState(false);
	const [noData, setNoData] = useState(false);
	
	let cancel;
	let CancelAxios = axios.CancelToken;

	//FetchData
	const fetchData = async (offset, limit) => {
		try {
			const res = await axios.get(`api/anuncios?offset=${offset}&limit=${limit}`, {
				cancelToken: new CancelAxios(c=>{
					cancel = c;
				})
			});

			const { data, finish } = res.data;
			
			//Verificar si estรก desmontado
			if (data.length > 0) {
				updateNewsAnuncios([...list, ...data]);
				setHasFinish(finish);
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

	//GetMoreData
	const getMore = () => {
		const offset = list.length;
		fetchData(offset, 7);
	};

	//No DATA SET
	useEffect(
		() => {
			if (list.length === 0) {
				getMore();
			}

			//Al cancelar
			return () => {
				if (cancel) {
					cancel();
				}
			};
		},
		[list, cancel]
	);

	//Al desmontar
	useEffect(
		() => {
			return () => {
				if (cancel) {
					cancel();
				}
				updateNewsAnuncios([]);
			};
		},
		[updateNewsAnuncios, cancel]
	);

	return (
		<aside style={{marginBottom: '15px'}}>
			{list.length !== 0 ? (
					<Carousel autoPlay={false}>
						{list.map((data)=> <Anuncio anuncio={data} />)}
					</Carousel>
			) : (
				<Carousel>
					{noData ? (
						<div style={{width: '100%', height: '250px'}}>
							No hay anuncios publicados...
						</div>
					) : (
						<SkeletonAnuncio />
					)}
				</Carousel>
			)}
		</aside>
	);
}

export function SkeletonAnuncio() {
	return (
		<Paper variant="outlined">
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
		<Paper variant="outlined" key={anuncio.id}>
			<section className="Anuncio">
				<span className="Anuncio__Title">{anuncio.title}</span>
				<p className="Anuncio__Content" dangerouslySetInnerHTML={createMarkup()}
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