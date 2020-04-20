import React from 'react';

//Material-UI
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

//LazyImg
import { LazyImage } from 'react-lazy-images';

function ArchiveVisor({ options }) {
	if (Array.isArray(options) && options.length !== 0) {
		const files = options.map((archive, i) => {
			return (
				<a href={archive.url} key={i}>
					<LazyImage
						alt="extensiรณn de archivo"
						src={archive.extension}
						placeholder={({ imageProps, ref }) => (
							<Skeleton ref={ref} key={i} variant="rect" height={50} width={50} />
						)}
						actual={({ imageProps }) => 
							<img key={i} width="50" {...imageProps} />
						}
						error={() => (
							<div style={{ width: '110px', height: '100px', background: 'rgb(252, 72, 80)' }}>
								<p>Error al obtener imagen</p>
							</div>
						)}
					/>
				</a>
			);
		});
		
		return (
			<footer>
				<Grid container spacing={2} justify="space-around" wrap="wrap" className="fixGrid">
					{files}
				</Grid>
			</footer>
		);
	}

	return <React.Fragment />;
}

export default ArchiveVisor;