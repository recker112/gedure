import React, { useEffect } from 'react';

//Material-UI
import { Grow, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

//redux
import { connect } from 'react-redux';
import { updateNewsAnuncios } from '../../actions/news/updateNews';

function ListAnuncios({ list, updateNewsAnuncios }) {
	useEffect(
		() => {
			const fetchData = async () => {
				const res = await fetch(
					'https://my-json-server.typicode.com/recker112/candelariaweb/anuncios'
				)
					.then(response => response.json())
					.then(json => json);

				if (res !== {}) {
				}

				updateNewsAnuncios(res);
			};

			let cancel = false;
			if (!cancel) {
				fetchData();
			}

			//Al desmontar
			return () => {
				cancel = true;
				updateNewsAnuncios(null);
			};
		},
		[updateNewsAnuncios]
	);

	return (
		<aside id="test" className="BoxAnuncios">
			<Grow in={true}>
				<Paper variant="outlined">
					<div className="AHead">
						<span>Anuncios</span>
					</div>
				</Paper>
			</Grow>
			{list !== null ? <Anuncio option={list} /> : <SkeletonAnuncio />}
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
				</section>
			</Paper>
	);
}

export function Anuncio(props) {
	const recorrerLista = props.option.map((anuncio, i) => (
		<Grow in={true} key={i}>
			<Paper variant="outlined">
				<section className="Anuncio">
					<span className="ATitle">{anuncio.title}</span>
					<p className="AContent">{anuncio.content}</p>
					<hr />
					<footer>Escrito por: {anuncio.by}</footer>
				</section>
			</Paper>
		</Grow>
	));
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