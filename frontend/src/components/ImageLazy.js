import { useReadyElement } from "@egjs/react-imready";
import { Skeleton } from "@mui/material";

export default function ImageLazy(props) {
  const { 
    srcRequest, 
    alt, 
    width = 'auto', 
    height = 'auto', 
    style, 
    loading = <Skeleton width={width} height={height} />,
    ...rest 
  } = props;

  const { register, isReady } = useReadyElement({
      selector: "img",
  });

  // NOTA(RECKER): Ocultar mientras se carga la imagen
  let ready = { display: isReady ? 'block' : 'none' };

  // NOTA(RECKER): Evitar ocultar mientras se cargar
  if (style) {
    ready = style;
  }
 
  return (
    <div ref={register()}>
      {!isReady && loading}
      <img 
        style={ready} 
        src={srcRequest} 
        alt={alt} 
        width={width}
        height={height}
        {...rest}
      />
    </div>
  )
}