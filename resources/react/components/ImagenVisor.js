import React, { useState } from 'react';

//Material-UI
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

//LazyImg
import { LazyImage } from 'react-lazy-images';

import VisorImgReactComponent from './VisorImgReactComponent';

function ImagenVisor({ options }) {
	const [openView, setOpenView] = useState(false);
	const [currentImg, setCurrentImg] = useState(0);
	
	const closeView = () =>{
		//Reset bar
		document.body.style.overflow = "auto";
		
		setCurrentImg(0);
		setOpenView(false);
	}
	
	if (Array.isArray(options) && options.length !== 0) {
		const restante = options.length - 3;
		const imagenes = options.map((img, i) => {
			if (i === 3) {
				return (
					<span 
						key={i} 
						className="more"
						onClick={()=>{
							setOpenView(true);
							setCurrentImg(3);
						}}
					>
						+{restante}
					</span>
				);
			} else if (i < 4) {
				return (
					<LazyImage
						key={i}
						alt={`imagen${i + 1}`}
						src={img}
						placeholder={({ imageProps, ref }) => (
							<Skeleton ref={ref} key={i} variant="rect" height={100} width={110} />
						)}
						actual={({ imageProps }) => 
							<img 
								key={i} 
								{...imageProps} 
								class="imgPreview"
								onClick={()=>{
									setOpenView(true);
									setCurrentImg(i);
								}}
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
				);
			}
		});
		return (
			<footer>
				<Grid 
					container 
					spacing={2} 
					justify="space-around" 
					wrap="wrap" 
					className="fixGrid"
				>
					{imagenes}
				</Grid>
				{openView && (
					<VisorImgReactComponent
						src={options}
						onClose={closeView}
						currentImg={currentImg}
						setCurrentImg={setCurrentImg}
					/>
				)}
			</footer>
		);
	}

	//Loading
	if (options === 'loading') {
		let SkeletonImg = [1, 2, 3, 4].map((e, i) => (
			<Skeleton key={i} variant="rect" height={100} width={110} />
		));
		return (
			<footer>
				<Grid container spacing={2} justify="space-around" wrap="wrap" className="fixGrid">
					{SkeletonImg}
				</Grid>
			</footer>
		);
	}

	return <React.Fragment />;
}

export default ImagenVisor;