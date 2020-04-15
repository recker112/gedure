import React from 'react';

//Material-UI
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

//LazyImg
import { LazyImage } from 'react-lazy-images';

function ImagenVisor({ options }) {
	if (Array.isArray(options) && options.length !== 0) {
		const restante = options.length - 3;
		const imagenes = options.map((img, i) => {
			if (i === 3) {
				return (
					<span key={i} className="more">
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
						actual={({ imageProps }) => <img key={i} {...imageProps} />}
						error={() => (
							<div style={{ width: '110px', height: '100px', background: 'rgb(252, 72, 80)' }}>
								<p>Error al obtener imagen</p>
							</div>
						)}
					/>
				);
			} else {
				return <img key={i} src={img} alt={`imagen${i + 1}`} style={{ display: 'none' }} />;
			}
		});
		return (
			<footer>
				<Grid container spacing={2} justify="space-evenly" wrap="wrap" className="fixGrid">
					{imagenes}
				</Grid>
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
				<Grid container spacing={2} justify="space-evenly" wrap="wrap" className="fixGrid">
					{SkeletonImg}
				</Grid>
			</footer>
		);
	}

	return <React.Fragment />;
}

export default ImagenVisor;