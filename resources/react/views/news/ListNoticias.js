//React
import React, { useEffect, useState } from 'react';

//Componentes
import { ImagenVisor } from '../../components/ImagenVisor';

//Redux
import { connect } from 'react-redux';
import { updateNewsNoticias } from '../../actions/news/updateNews';

//Material-UI
import { Paper, Avatar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

//SnackBar
import { useSnackbar } from 'notistack';

//ScrollInfinitoBOY
import InfiniteScroll from 'react-infinite-scroll-component';

export function ListNoticias({ list, updateNewsNoticias }) {
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	//Variables
	const [hasFinish, setHasFinish] = useState(false);
	let cancel = false;

	//fetchData
	const fetchData = async (offset, limit) => {
		try {
			const res = await axios.get(`api/news?offset=${offset}&limit=${limit}`);

			if (res.status !== 200) {
				throw new Error("server_error");
			}

			if (!cancel) {
				const { data, finish } = res.data;
				updateNewsNoticias([...list, ...data]);
				setHasFinish(finish);
			}
		} catch (error) {
			enqueueSnackbar('No se han podido obtener las noticias', {
				variant: 'error'
			});
			console.log(error);
		}
	};

	//GetMoreData
	const getMore = () => {
		const offset = list.length;
		fetchData(offset, 5);
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
				updateNewsNoticias([]);
			};
		},
		[updateNewsNoticias, cancel]
	);

	return (
		<article className="BoxNoticias">
			{list.length !== 0 ? (
				<InfiniteScroll
					dataLength={list.length}
					hasMore={!hasFinish}
					next={getMore}
					scrollThreshold={0.3}
					loader={<SkeletonNoticia />}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>No hay mรกs noticias que cargar.</b>
						</p>
					}
				>
					<Noticia options={list} />
				</InfiniteScroll>
			) : (
				<SkeletonNoticia />
			)}
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
					<Skeleton variant="text" className="NHeadName" width={35} />
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
				<ImagenVisor options="loading" />
			</section>
		</Paper>
	);
}

export function Noticia(props) {
	const recorrerList = props.options.map(news => {
		let name;
		let avatar;
		if (news.privilegio === 'A-') {
			name = news.nameA;
			avatar = news.avatarA;
		} else {
			name = news.nameC;
			avatar = news.avatarC;
		}
		return (
			<div key={news.id}>
				<Paper variant="outlined">
					<section className="Noticia">
						<div className="NHead">
							<Avatar src={avatar} alt="Usuario" className="NHeadImg" style={{backgroundColor: '#B46BD6'}}>
								{/*Mostrar el nombre del usuario en caso de que no tenga 
								una foto*/}
								{name.substring(0, 1).toUpperCase()}
							</Avatar>
							<span className="NHeadName">{name}</span>
							<small>
								<i>#{news.id}</i>
							</small>
						</div>
						<hr />
						<div className="NContent">
							<span className="NContentTitle">{news.title}</span>
							<p className="NContentP">{news.content}</p>
						</div>
						<ImagenVisor options={JSON.parse(news.imgList)} />
						<i className='NFecha'>Publicado {news.fecha}</i>
					</section>
				</Paper>
			</div>
		);
	});

	return recorrerList;
}

const mapStateToProps = state => ({
	list: state.news.dataN
});

const mapDispatchToProps = {
	updateNewsNoticias
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNoticias);