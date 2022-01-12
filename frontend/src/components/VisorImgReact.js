//React
import React, { useCallback, useEffect } from 'react';

//Material UI
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';

import ReactLoading from 'react-loading';

//Componentes
import { downloadFilesNotResponse } from './Utils/DownloadFiles';
import ImageLazy from './ImageLazy';

function VisorImgReact({
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
	}, [currentImg, src, setCurrentImg]);
	
	const prevImg = useCallback(() => {
		let prev = currentImg-1;
		if (src[prev]) {
			setCurrentImg(prev);
		}
	}, [currentImg, src, setCurrentImg]);
	
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
					className="VisorImgReactComponent__left"
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
							<ImageLazy
								alt={`imagen selected`}
								className="imgShow"
								srcRequest={img}
								key={i}
								loading={<ReactLoading type="bubbles" width={150} height={100} />}
							/>
						)
					}else {
						return (
							<ImageLazy
								alt={`imagen selected`}
								className="imgShow"
								srcRequest={img}
								key={i}
								style={{display: 'none'}}
								loading={null}
							/>
						)
					}
				})}
			</div>
		</div>
	)
}

export default VisorImgReact;