//React
import React, { useCallback, useEffect } from 'react';

//Material UI
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';

//Componentes
import { downloadFilesNotResponse } from './reutilizar/donwloadFiles';

//Loading
import ReactLoading from 'react-loading';

//LazyImg
import { LazyImage } from 'react-lazy-images';

function VisorImgReactComponent({
	src,
	onClose,
	currentImg,
	setCurrentImg
}) {
	let leftNull = currentImg === 0 && true;
	let rightNull = currentImg === (src.length - 1) && true;
	
	const nextImg = useCallback(() => {
		let next = currentImg+1;
		if (src[next]) {
			setCurrentImg(next);
		}
	}, [currentImg, setCurrentImg, src]);
	
	const prevImg = useCallback(() => {
		let prev = currentImg-1;
		if (src[prev]) {
			setCurrentImg(prev);
		}
	}, [currentImg, setCurrentImg, src]);
	
	const handleKeyDown = useCallback((e) => {
		if (e.key === 'Escape') {
			onClose();
		}
		
		if (['ArrowLeft', 'd'].includes(e.key)) {
			document.getElementById('VisorImgReactComponent__left').click();
		}

		if (['ArrowRight', 'a'].includes(e.key)) {
			document.getElementById('VisorImgReactComponent__right').click();
		}
		
	}, [onClose]);
	
	const onDownload = useCallback(()=>{
		downloadFilesNotResponse(src[currentImg]);
	}, [currentImg, src]);
	
	useEffect(()=>{
		document.addEventListener('keydown', handleKeyDown);
		
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}
	}, [currentImg, handleKeyDown])
	
	//Hide bar
	document.body.style.overflow = "hidden";
	
	return (
		<div className="VisorImgReactComponent">
			<div className="VisorImgReactComponent__controlls">
				<span 
					onClick={prevImg} 
					class="VisorImgReactComponent__left"
					id="VisorImgReactComponent__left"
				>
					{leftNull ? 
					<IconButton aria-label="prev img" onClick={prevImg}>
						<ChevronLeftIcon style={{
							fontSize: "40px", 
							opacity: 0.5, 
							color: 'white'
						}} />
					</IconButton>
					: 
					<IconButton aria-label="prev img" onClick={prevImg}>
						<ChevronLeftIcon style={{fontSize: "40px", color: 'white'}} />
					</IconButton>
					}
				</span>
				<span 
					onClick={nextImg}
					className="VisorImgReactComponent__right"
					id="VisorImgReactComponent__right"
				>
					{rightNull ? 
					<IconButton aria-label="next img" onClick={nextImg}>
						<ChevronRightIcon style={{
							fontSize: "40px", 
							opacity: 0.5,
							color: 'white'
						}} />
					</IconButton>
					: 
					<IconButton aria-label="next img" onClick={nextImg}>
						<ChevronRightIcon style={{fontSize: "40px", color: 'white'}} />
					</IconButton>
					}
				</span>
			</div>
			
			<div className="VisorImgReactComponent__visor">
				<div className="VisorImgReactComponent__options">
					<span onClick={onDownload}
						className="VisorImgReactComponent__download"
					>
						<IconButton aria-label="download img">
							<GetAppIcon style={{color: 'white'}} />
						</IconButton>
					</span>
					<span onClick={onClose} className="VisorImgReactComponent__close">
						<IconButton aria-label="close viwer">
							<CloseIcon style={{color: 'white'}} />
						</IconButton>
					</span>
				</div>
				{src.map((img, i)=>{
					if (currentImg === i) {
						return (
							<LazyImage
								alt={`imagen selected`}
								src={img}
								placeholder={({ imageProps, ref }) => (
									<div ref={ref}>
										<ReactLoading 
											type="bubbles" 
											width={150} 
											height={100} 
										/>
									</div>
								)}
								actual={({ imageProps }) => 
									<img 
										{...imageProps}
										alt='imagen selected'
										className="imgShow"
									/>}
								error={() => (
									<div style={{ 
											width: '110px', 
											height: '100px', 
											background: 'rgb(252, 72, 80)'
										}}>
										<p>Error al obtener imagen</p>
									</div>
								)}
							/>
						)
					}else {
						return (
							<LazyImage
								style={{display: 'none'}}
								alt={`imagen selected`}
								src={img}
								placeholder={({ imageProps, ref }) => (
									<div style={{display: 'none'}} ref={ref}>
										<ReactLoading 
											type="bubbles" 
											width={150} 
											height={100} 
										/>
									</div>
								)}
								actual={({ imageProps }) => 
									<img 
										alt='imagen selected'
										{...imageProps}
										className="imgShow"
									/>}
								error={() => (
									<div style={{ 
											width: '110px', 
											height: '100px', 
											background: 'rgb(252, 72, 80)',
											display: 'none'
										}}>
										<p>Error al obtener imagen</p>
									</div>
								)}
							/>
						)
					}
				})}
			</div>
		</div>
	)
}

export default VisorImgReactComponent;