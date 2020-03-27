import React, { useEffect, useState } from 'react';

//Material-UI
import { Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

//redux
import { connect } from 'react-redux';
import { updateNewsAnuncios } from '../../actions/news/updateNews';

//SnackBar
import { useSnackbar } from 'notistack';

//ScrollInfinitoBOY
import InfiniteScroll from 'react-infinite-scroll-component';

function ListAnuncios({ list, updateNewsAnuncios }) {
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	//Variables
	const [hasFinish, setHasFinish] = useState(false);
	let cancel = false;

	//FetchData
	const fetchData = async (offset, limit) => {
		try {
			const res = await axios.get(`api/anuncios?offset=${offset}&limit=${limit}`);

			if (res.status !== 200) {
				throw new Error("server_error");
			}

			if (!cancel) {
				const { data, finish } = res.data;
				updateNewsAnuncios([...list, ...data]);
				setHasFinish(finish);
			}
		} catch (error) {
			enqueueSnackbar('No se han podido obtener los anuncios', {
				variant: 'error'
			});
			console.log(error);
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
				cancel = true;
			};
		},
		[list, cancel]
	);

	//Al desmontar
	useEffect(
		() => {
			return () => {
				cancel = true;
				updateNewsAnuncios([]);
			};
		},
		[updateNewsAnuncios, cancel]
	);

	return (
		<aside id="test" className="BoxAnuncios">
			<Paper variant="outlined" className="PaperMargin">
				<div className="AHead">
					<span>Anuncios</span>
				</div>
			</Paper>
			{list.length !== 0 ? (
				<InfiniteScroll
					dataLength={list.length}
					hasMore={!hasFinish}
					next={getMore}
					scrollThreshold={0.2}
					loader={<SkeletonAnuncio />}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>No hay más anuncios que cargar.</b>
						</p>
					}
				>
					<Anuncio option={list} />
				</InfiniteScroll>
			) : (
				<SkeletonAnuncio />
			)}
		</aside>
	);
}

export function SkeletonAnuncio() {
	return (
		<Paper variant="outlined">
			<section className="Anuncio">
				<Skeleton variant="text" className="ATitle" width={200} />
				<p className="AContent">
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
				</p>
				<hr />
				<footer>
					<Skeleton variant="text" width={150} />
				</footer>
				<div className="AId">
					
				</div>
			</section>
		</Paper>
	);
}

export function Anuncio(props) {
	const recorrerLista = props.option.map((anuncio) => {
		let name;
		if (anuncio.privilegio === 'A-') {
			name = anuncio.nameA;
		} else {
			name = anuncio.nameC;
		}
		return (
			<Paper variant="outlined" key={anuncio.id} className="AnuncioPaper">
				<section className="Anuncio">
					<span className="ATitle">{anuncio.title}</span>
					<p className="AContent">{anuncio.content}</p>
					<hr />
					<footer>
						Escrito por {name} {anuncio.fecha}
					</footer>
					<div className="AId">
						<small><i>#{anuncio.id}</i></small>
					</div>
				</section>
			</Paper>
		);
	});
	return recorrerLista;
}

//REDUX
const mapStateToProps = state => ({
	list: state.news.dataA
});

const mapDispatchToProps = {
	updateNewsAnuncios
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAnuncios);