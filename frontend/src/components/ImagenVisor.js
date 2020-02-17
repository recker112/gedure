import React from 'react';

//Material-UI
import { Skeleton } from '@material-ui/lab';

export function ImagenVisor({options}) {
	
	if (Array.isArray(options)) {
		const imagenes = options.map((element, i) => {
			if (i === 3) {
				return (<span key={i}>Hay mas</span>);
			}
			else if (i < 4) {
				return (<span key={i}>{element.title}</span>);
			}
			else {
				return (<span key={i} style={{ display: "none" }}>{element.title}</span>);
			}
		});
		return (<footer>{imagenes}</footer>);
	}
	
	let SkeletonImg = [1,2,3,4].map((e,i)=> <Skeleton key={i} variant="rect" width={70} height={60} />)
	return (<footer>{SkeletonImg}</footer>);
}
