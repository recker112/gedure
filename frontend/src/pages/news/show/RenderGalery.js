import React, { useState } from 'react';

import { Grid } from '@mui/material';
import ImageLazy from '../../../components/ImageLazy';

// Components
import VisorImgReact from '../../../components/VisorImgReact';

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
				<Grid container justifyContent='center' item xs={6} sm={4} md={3} key={i}>
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
				<Grid container justifyContent='center' item xs={6} sm={4} md={3} key={i}>
					<ImageLazy
						src={img}
						alt={`imagen${i + 1}`} 
						width={110}
						height={100}
						className="imagePreview"
						onClick={()=>{
							setOpenView(true);
							setCurrentImg(i);
						}}
					/>
				</Grid>
			);
		}
		
		return null;
	});
	
	return (
		<Grid container justifyContent='center' spacing={2} item xs={12}>
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