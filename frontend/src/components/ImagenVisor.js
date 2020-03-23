import React from 'react';

//Material-UI
import { Skeleton } from '@material-ui/lab';

//LazyImg
import { LazyLoadImage } from 'react-lazy-load-image-component';

export function ImagenVisor({options}) {

	if (Array.isArray(options) && options.length !== 0) {
        const restante = options.length - 3;
		const imagenes = options.map((img, i) => {
			if (i === 3) {
				return (<span key={i} className="more">+{restante}</span>);
			}
			else if (i < 4) {
                return (
                    <LazyLoadImage
                        key={i}
                        alt={`imagen${i+1}`}
                        src={img}
                        placeholder={<Skeleton key={i} variant="rect" height={100} width={110} />}
                    />);
			}
			else {
				return (<img key={i} src={img} alt={`imagen${i+1}`} style={{ display: "none" }} />);
			}
		});
		return (<footer>{imagenes}</footer>);
	}

	if (options === "loading") {
		let SkeletonImg = [1,2,3,4].map((e,i)=> <Skeleton key={i} variant="rect" height={100} width={110} />)
		return (<footer>{SkeletonImg}</footer>);
	}

	return (<React.Fragment></React.Fragment>);
}
