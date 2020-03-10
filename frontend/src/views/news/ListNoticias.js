//React
import React, { useEffect } from 'react';

//Componentes
import { ImagenVisor } from '../../components/ImagenVisor';

//Redux
import { connect } from 'react-redux';
import { updateNewsNoticias } from '../../actions/news/updateNews';

//Material-UI
import { Paper, Grow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function ListNoticias({ list, updateNewsNoticias }) {
	useEffect(
		() => {
			const fetchData = async () => {
				const res = await fetch(
					'https://my-json-server.typicode.com/recker112/candelariaweb/noticias'
				)
					.then(response => response.json())
					.then(json => json);

				if (res !== 'no_connect') {
				}

				updateNewsNoticias(res);
			};

			let cancel = false;
			if (!cancel) {
				fetchData();
			}

			//Al desmontar
			return () => {
				cancel = true;
				updateNewsNoticias(null);
			};
		},
		[updateNewsNoticias]
	);

	return (
		<article className="BoxNoticias">
			{list !== null ? <Noticia options={list} /> : <SkeletonNoticia />}
		</article>
	);
}

export function SkeletonNoticia() {
	return (
		<Paper variant="outlined">
			<section className="Noticia">
				<div className="NHead">
					<Skeleton variant="circle" className="NHeadImg" />
					<Skeleton variant="text" className="NHeadName" width={150} />
				</div>
				<hr />
				<div className="NContent">
					<Skeleton variant="text" className="NContentTitle" width={200} />
					<p className="NContentP">
						<Skeleton variant="text" width="100%" />
						<Skeleton variant="text" width="100%" />
						<Skeleton variant="text" width="100%" />
						<Skeleton variant="text" width="100%" />
					</p>
				</div>
				<ImagenVisor options="skeleton" />
			</section>
		</Paper>
	);
}

export function Noticia(props) {
	const recorrerList = props.options.map(element => (
		<div key={element.id}>
			<Grow in={true}>
				<Paper variant="outlined">
					<section className="Noticia">
						<div className="NHead">
							<span className="NHeadImg">Logo</span>
							<span className="NHeadName">{element.name}</span>
						</div>
						<hr />
						<div className="NContent">
							<span className="NContentTitle">{element.title}</span>
							<p className="NContentP">{element.content}</p>
						</div>
						<ImagenVisor options={element.imgList} />
					</section>
				</Paper>
			</Grow>
		</div>
	));

	return recorrerList;
}

const mapStateToProps = state => ({
	list: state.news.dataN
});

const mapDispatchToProps = {
	updateNewsNoticias
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNoticias);