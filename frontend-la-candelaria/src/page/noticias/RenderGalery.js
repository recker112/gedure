import React, { useState } from 'react';

import { 
	Grid,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { LazyImage } from 'react-lazy-images';

// Components
import VisorImgReact from '../../components/VisorImgReact';

export default function RenderGalery({ imgs }) {
	const [openView, setOpenView] = useState(false);
	const [currentImg, setCurrentImg] = useState(0);
	
	const closeView = () =>{
		//Reset bar
		document.body.style.overflow = "auto";
		
		setCurrentImg(0);
		setOpenView(false);
	}
	
	const lastImg = 6;
	const restante = imgs.length - lastImg;
	const imagenes = imgs.map((img, i) => {
		if (i === lastImg) {
			return (
				<Grid container justify='center' item xs={6} sm={4} md={3} key={i}>
					<span 
						key={i} 
						className="imagePreview__More"
						onClick={()=>{
							setOpenView(true);
							setCurrentImg(lastImg);
						}}
					>
						+{restante}
					</span>
				</Grid>
			);
		} else if (i < lastImg) {
			return (
				<Grid container justify='center' item xs={6} sm={4} md={3} key={i}>
					<LazyImage
						alt={`imagen${i + 1}`}
						src={img}
						className="imagePreview"
						width={110}
						height={100}
						placeholder={({ imageProps, ref }) => (
							<Skeleton ref={ref} key={i} variant="rect" {...imageProps} />
						)}
						actual={({ imageProps }) => 
							<img 
								key={i}
								alt={`imagen${i + 1}`}
								{...imageProps} 
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
				</Grid>
			);
		}
		
		return null;
	});
	
	return (
		<Grid container justify='center' spacing={2} item xs={12}>
			{imagenes}
			{openView && (
				<VisorImgReact
					src={imgs}
					onClose={closeView}
					currentImg={currentImg}
					setCurrentImg={setCurrentImg}
				/>
			)}
		</Grid>
	);
}