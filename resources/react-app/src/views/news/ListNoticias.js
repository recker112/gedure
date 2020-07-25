//React
import React, { useEffect, useState } from 'react';

//Componentes
import ImagenVisor from '../../components/ImagenVisor';
import ArchiveVisor from '../../components/ArchiveVisor';

//Redux
import { connect } from 'react-redux';
import { updateNewsNoticias } from '../../actions/news/updateNews';

//Material-UI
import {
	Avatar,
	Button,
	Card, 
	CardHeader, 
	CardContent,
	CardActions,
	Collapse,
	Tooltip
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';

//SnackBar
import { useSnackbar } from 'notistack';

//ScrollInfinitoBOY
import InfiniteScroll from 'react-infinite-scroll-component';

export function ListNoticias({ list, updateNewsNoticias }) {
	// Global Const
	const axios = window.axios;
	
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	//Variables
	const [hasFinish, setHasFinish] = useState(false);
	const [noData, setNoData] = useState(false);
	const [query, setQuery] = useState(true);
	
	useEffect(()=>{
		// CANCEL
		let cancel;
		let CancelAxios = axios.CancelToken;
		
		const fetchData = async (offset, limit) => {
			try {
				const res = await axios.get(`api/news?offset=${offset}&limit=${limit}`, {
					cancelToken: new CancelAxios(c=>{
						cancel = c;
					})
				});

				const { data, finish } = res.data;

				// Terminar query
				setQuery(false);
				
				// Verificar si hay anuncios.
				if (data.length > 0) {
					updateNewsNoticias([...list, ...data]);
					setHasFinish(finish);
				} else {
					setNoData(true);
				}
			} catch (error) {
				if (!axios.isCancel(error)) {
					enqueueSnackbar('No se han podido obtener las noticias', {
						variant: 'error'
					});
				}
			}
		};
		
		if (query) {
			const offset = list.length;
			fetchData(offset, 5);
		}
		
		return () => {
			if (cancel) {
				cancel();
			}
		}
	}, [query, axios, enqueueSnackbar, list, updateNewsNoticias]);
	
	//Clear
	useEffect(()=>{
		return ()=>{
			updateNewsNoticias([]);
		}
	}, [updateNewsNoticias])

	return (
		<article className="NoticiaBox">
			{list.length !== 0 ? (
			<InfiniteScroll
				dataLength={list.length}
				hasMore={!hasFinish}
				next={() => {
						setQuery(true);
				}}
				scrollThreshold={0.8}
				loader={<SkeletonNoticia />}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>No hay más noticias que cargar.</b>
					</p>
				}
			>
				{list.map((newsData, i)=>{
					return <Noticia key={i} news={newsData} />
				})}
			</InfiniteScroll>
		) : (
			<React.Fragment>
				<SkeletonNoticia />
				{noData && (
					<p style={{ textAlign: 'center' }}>
						<b>No hay anuncios publicados.</b>
					</p>
				)}
			</React.Fragment>
		)}
		</article>
	);
}

export function SkeletonNoticia() {
	const theme = useTheme();
	
	let darkModeColor = theme.palette.type === 'dark' ? '#3b4e77' : '#7c9fe8';
	
	return (
		<Card style={{marginBottom: '15px'}}>
			<CardHeader
				style={{backgroundColor: darkModeColor}}
				avatar={
					<Tooltip title="Usuario" arrow>
						<Avatar aria-label="recipe" style={{ backgroundColor: '#B46BD6' }} />
					</Tooltip>
				}
				title={
					<Skeleton variant="text" width='100%' />
				}
				subheader={
					<Skeleton variant="text" width='70%' />
				}
			/>
			<CardContent>
				<Skeleton variant="text" width="100%" />
				<Skeleton variant="text" width="100%" />
				<Skeleton variant="text" width="100%" />
				<Skeleton variant="text" width="100%" />
			</CardContent>
			<ImagenVisor options="loading" />
		</Card>
	);
}

export function Noticia({ news }) {
	const [expand, setExpand] = useState(false);
	const [overFlowText, setOverFlow] = useState(false);

	//Datos
	let name;
	let avatar;
	if (news.privilegio === 'A-') {
		name = news.nameA;
		avatar = news.avatarA;
	} else {
		name = news.nameC;
		avatar = news.avatarC;
	}

	function createMarkup() {
		return { __html: news.content };
	}
	
	const verifyHeight = (element) => {
		if (element && !overFlowText && overFlowText!== null) {
			const height = element.clientHeight;
			if (height > 400) {
				setOverFlow(true);
			}
		}
	}
	
	let overFlowClass =  overFlowText ? 'Noticia__Content--OverFlow' : '';

	const theme = useTheme();
	
	let darkModeColor = theme.palette.type === 'dark' ? '#3b4e77' : '#7c9fe8';
	
	return (
		<Card style={{marginBottom: '15px'}}>
			<CardHeader
				style={{backgroundColor: darkModeColor}}
				avatar={
					<Tooltip title={name} arrow>
						<Avatar 
							src={avatar}
							alt="Usuario"
							aria-label="recipe"
							style={{ backgroundColor: '#B46BD6' }}
						>
							{name.substring(0, 1).toUpperCase()}
						</Avatar>
					</Tooltip>
				}
				title={news.title}
				subheader={'Publicado ' + news.fecha}
			/>
			<CardContent>
				<p 
					ref={(el)=>{
						verifyHeight(el);
					}}
					className={`Noticia__Content ${overFlowClass}`} 
					dangerouslySetInnerHTML={createMarkup()}
				>
				</p>
				{overFlowText &&
					<Button size='small' color="secondary" onClick={()=>{
							setOverFlow(null);
						}}>
						Ver publicación completa
					</Button>
				}
			</CardContent>

			<ImagenVisor options={JSON.parse(news.imgList)} />

			{news.archivesList && 
				<CardActions disableSpacing>
					<Button size='small' color="primary" onClick={()=>{
							setExpand(!expand);
						}}
					>
						Ver Archivos ({JSON.parse(news.archivesList).length})
					</Button>
				</CardActions>
			}
			<Collapse in={expand} timeout="auto" unmountOnExit>
				<ArchiveVisor options={JSON.parse(news.archivesList)} />
			</Collapse>
			<span className='NoticiaBox__Id'>#{news.id}</span>
		</Card>
	);
}

const mapStateToProps = state => ({
	list: state.news.dataN
});

const mapDispatchToProps = {
	updateNewsNoticias
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNoticias);