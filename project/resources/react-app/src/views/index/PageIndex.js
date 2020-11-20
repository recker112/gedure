import React, { useCallback, useMemo, useState } from 'react';

import { Box, Container, Grid, Divider, Paper, Typography, Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel';

//Components
import FooterText from '../../components/FooterText';
import logo from './../../imgs/favicon.png';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		
		marginBottom: theme.spacing(8),
		[theme.breakpoints.up('xs')]: {
			marginTop: '48px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8),
		},
	},
	title: {
		color: 'white',
		[theme.breakpoints.down('xs')]: {
			fontSize: 25,
		},

		[theme.breakpoints.up('sm')]: {
			fontSize: 30,
		},
	},
	etapa1: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '20px 20px 0px 0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '20px 0px 0px 0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '20px 0px 0px 0px',
		},
	},
	etapa2: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px 20px 0px 0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px',
		},
	},
	etapa3: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 20px 0px 0px',
		},
	},
	etapa4: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 0px 0px 20px',
		},
	},
	etapa5: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px 0px 0px 20px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px',
		},
	},
	etapa6: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px 0px 20px 20px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px 0px 20px 0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 0px 20px 0px',
		},
	},
}));

function CarrouselHeader() {
	const classes = useStyles();
	
	const Item1 = () => {
		return (
			<Box component="div" className="headIndex__boxImg">
				Item 1
			</Box>
		);
	}
	
	return (
		<Carousel interval={10000}>
			<Item1 />
			<Item1 />
		</Carousel>
	);
}

function BoxInfo(props) {
	const { title, content, component, reverse = false, img = true } = props;
	const [overFlow, setOverFlow] = useState(true);
	
	function createMarkup() {
		return {__html: content};
	}
	
	const handleClick = () => {
		setOverFlow((value) => (!value));
	}
	
	let overFlowClass = overFlow ? 'BoxIndex--OverFlow' : '';
	
	return (
		<Grid container spacing={2} direction={reverse ? 'row-reverse' : 'row'} item xs={12}>
			{img && (
				<Grid container alignItems='center' item xs={12} sm={6}>
					<Skeleton variant="rect" width='100%' height={250} />
				</Grid>
			)}
			<Grid container alignContent='flex-start' spacing={1} item xs={12} sm={img ? 6 : 12}>
				<Grid item xs={12}>
					<Typography 
						align='center'
						className='text__bold--big'
						variant="h5" 
						component={component}
					>
						{title}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography 
						className={!img ? overFlowClass : ''}
						dangerouslySetInnerHTML={createMarkup()} 
						style={{textAlign: 'justify'}} 
						variant="body1" 
						component="p"
					/>
					{!img && (
						<Button color='primary' onClick={handleClick}>{overFlow ? 'Ver más' : 'Ver menos'}</Button>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
}

function Etapas() {
	const classes = useStyles();
	
	const ItemEtapa = (props) => {
		const { title, subtitle, className } = props;
		
		return (
			<Grid
				container
				direction="column"
				className={className.toString()}
				justify="center"
				alignItems="center"
				item
				xs={12}
				sm={6}
				md={4}
			>
				<Box component="span" textAlign='center'>{title}</Box>
				<Box component="span" className="boxIndex__subText">
					{subtitle}
				</Box>
			</Grid>
		);
	}
	
	const etapas = [
		{
			className: `MuiPaper-elevation1 boxIndex boxIndex--rosa boxIndex--big ${classes.etapa1}`,
			title: 'Centro Taller Artesanal',
			subtitle: '6° Grado'
		},
		{
			className: `MuiPaper-elevation1 boxIndex boxIndex--negro boxIndex--big ${classes.etapa2}`,
			title: 'Educación Primaria',
			subtitle: 'Desde 1° hasta 6° Grado'
		},
		{
			className: `MuiPaper-elevation1 boxIndex boxIndex--azul boxIndex--big ${classes.etapa3}`,
			title: 'Educación Media General',
			subtitle: 'Desde 1° hasta 3° Año'
		},
		{
			className: `MuiPaper-elevation1 boxIndex boxIndex--verde boxIndex--big ${classes.etapa4}`,
			title: 'Educación Media Técnica en Informática',
			subtitle: 'Desde 4° hasta 6° Año'
		},
		{
			className: `MuiPaper-elevation1 boxIndex boxIndex--naranja boxIndex--big ${classes.etapa5}`,
			title: 'Educación Media Técnica en Contabilidad',
			subtitle: 'Desde 4° hasta 6° Año'
		},
		{
			className: `MuiPaper-elevation1 boxIndex boxIndex--morado boxIndex--big ${classes.etapa6}`,
			title: 'Educación Media Técnica Administración en Financiera',
			subtitle: 'Desde 4° hasta 6° Año'
		},
	]
	
	return (
		<Grid container item xs={12}>
			<Grid 
				container 
				alignItems="center" 
				direction="column"
				item 
				xs={12}
			>
				<Typography 
					variant='h5' 
					component="span" 
					className="MuiPaper-elevation1 boxIndex boxIndex--margin boxIndex--carmesi">
					Etapas Educativas
				</Typography>
			</Grid>
			<Grid container item xs={12} justify="space-between">
				{etapas.map((data,i) => (<ItemEtapa key={i} {...data} />))}
			</Grid>
		</Grid>
	);
}

function PageIndex() {
	const classes = useStyles();
	
	const dataBox = useMemo(()=>[
		{
			title: 'Enfocados en el Estudio y la fe',
			content: 'La U.E.P A.P.E.P “La Candelaria brinda sus instalaciones a estudiantes de Primaria, Centro Taller Pre-Vocacional a los estudiantes de 6to grado de Escuelas Amigas, Media General y Media Técnica, tiene como norte la formación integral, en valores y principios religiosos, basados en la Fe Católica. Siguiendo la Filosofía APEP educar para la vida, para el trabajo. Los futuros Técnicos medios en las diferentes menciones tienen la oportunidad de iniciarse en el campo laboral luego de realizar el proceso de pasantías en su último año.',
			component: 'h1',
		},
		{
			title: 'Misión',
			content: 'Buscamos desarrollar una acción Educativa Integral en los niveles de Educación Primaria, integrando a partir del año escolar 2017 – 2018 una Escuela Técnica, cuya misión es la formación de niños y adolescentes mediante el desarrollo de destrezas y capacidades a la luz de la exploración y orientación educativa y vocacional. Así como estimular el deseo de saber y desarrollar la capacidad de ser de cada individuo.',
			component: 'h2',
			reverse: true,
		},
		{
			title: 'Visión',
			content: 'Se tiene como visión la educación progresiva e integral de sus estudiantes, una enseñanza humana cristiana de calidad, con una investigación y actualización científica y pedagógica permanente que permita la inserción de los egresados en forma efectiva dentro de la sociedad, proponiendo a Jesús como referencia de sentido, valores, y forma de vivir.',
		},
		{
			title: 'Reseña histórica',
			content: 'La U.E.P. A.P.E.P. “La Candelaria” de Turmero, es una Institución semi privada, ya que por una parte, es una Dependencia del Ministerio del Poder Popular para la Educación quien funge como empleador de todo el personal docente, administrativo y obrero por pago directo. Adicional a ello, sigue los lineamientos para llevar a cabo el hecho pedagógico de acuerdo a todo el basamento legal de la República Bolivariana de Venezuela como cualquier otro plantel público u oficial. Por otra parte, es una Dependencia de la Diócesis de Maracay, a través de la Parroquia “Nuestra Señora de Candelaria” de Turmero, quien en Convenio establecido entre la Iglesia y el Estado Venezolano, la Parroquia oferta la infraestructura y su mobiliario para el escenario educativo tanto para el Centro Taller Artesanal “La Candelaria” como para el área donde funciona el Liceo.<br/><br/>La Institución está afiliada a la Asociación de Promoción de la Educación Popular (A.P.E.P.) quien supervisa y vela a través del Párroco de la Comunidad, siendo en este caso, el Presbítero José Gregorio Bracamonte por nombramiento del Obispo de la Diócesis, quien a través de la A.P.E.P., funge como Director General para los efectos de ofrecer lineamientos en la orientación pastoral y promoción de la Unidad Educativa Privada A.P.E.P. “La Candelaria” según los valores de la fe cristiana católica. Por esta razón el plantel está adscrito a la Oficina de “Planteles Privados” de la Zona Educativa del Estado Aragua. Es público y privado el plantel.<br/><br/>Ha sido una iniciativa de la Iglesia Católica con el objeto de promover a los más necesitados de la comunidad nariñense una educación de Calidad en valores cristianos. Así pues, comenzando por el año 1959, siendo Su Excelencia Monseñor Rafael Arias Blanco el Arzobispo de Caracas, ya recién caída la dictadura gubernamental, en su afán de pastor, solicita a la comunidad cristiana en general y a su Presbiterio, que se enseñe a trabajar a los jóvenes de los barrios populares de Caracas para que pueda Adquirir un oficio que les permita satisfacer sus necesidades básicas y que a la vez les promueva para salir de la pobreza en que muchos viven. Muy probablemente, esta inspiración le viene dada por la fuerza de la Acción Católica (A.C.) en Europa y por el empuje de la Juventud Obrera Católica (J.O.C.) en la que participó Monseñor Rafael Arias Blanco y en donde conoció a muchos sacerdotes dedicados a la gestión y promoción social, entre ellos, al Presbítero Emilio Blaslow.<br/><br/>Posteriormente, para el año 1964, Su Excelencia El Cardenal José Humberto Quintero nombra al sacerdote italiano de origen belga: el Presbítero Emilio Blaslow, para que lleve adelante este trabajo, y luego da inicio a la Asociación para la Promoción de la Educación Popular (A.P.E.P.), fundada luego por el episcopado venezolano con características especiales y con un mensaje de liberación para que a través de la orientación y el diálogo se detecten vocaciones útiles a la nación. De este modo, la Iglesia Católica Venezolana decide ofrecer una educación como un servicio que atienda de manera integral y propicie la formación de jóvenes capacitados para el trabajo. Se establece así el Convenio Iglesia – Ministerio de Educación, según el cual la Iglesia facilita el local y dotación total del mismo y el Ministerio de Educación remunera el salario de los docentes.<br/><br/>Los planteles A.P.E.P. surgen inicialmente como escuelas de tipo pre-vocacional, dotadas de talleres de diversas áreas (madera, metales, cocina, comercio, corte y costura, comercio y secretariado). A ellas acuden los niños de las escuelas oficiales de la localidad a las cuales pertenecen. Están dirigidos por sacerdotes o religiosas y los maestros o profesores que laboran allí, deben ser personas que no solamente conozcan su oficio, sino que también sean cristianos comprometidos.<br/><br/>Este tipo de escuela permite la rotación de los niños, quienes reciben instrucción en por lo menos dos talleres al año. Una de estas escuelas es la Pre-Artesanal “La Candelaria”, o bien, como se la denomina actualmente: Centro Taller Nuclearizado A.P.E.P. “La Candelaria”. Hoy día, cuenta con 10 talleres en dos turnos para atender a niños de Sexto Grado de aproximadamente 24 escuelas de las zonas populares del Municipio Santiago Mariño.<br/><br/>Para 1980 toma la Dirección General del plantel el Padre José Pan Lago, Párroco de Turmero, quien a pesar de no conocer el funcionamiento de los Centros A.P.E.P., se dedicó de lleno y con entusiasmo a la obra, y con el transcurrir del tiempo surge la necesidad de crear un liceo en donde los niños de escasos recursos que acudían a esta Escuela Artesanal pudieran continuar su formación en la Educación para el Trabajo. Es entonces cuando por iniciativa del Padre Pan, realizaron las gestiones pertinentes contando con el apoyo de los docentes para fundar el “Liceo Experimental La Candelaria”, el cual inicia sus actividades en octubre de 1984, funcionando originalmente en dos habitaciones de la Casa Parroquial, acondicionadas para tal fin. Se contaba para aquel entonces con dos secciones de 7º Grado, una con 34 y otra con 39 estudiantes por las limitaciones de espacio.<br/><br/>Para el año escolar 1985 - 1986, el Ministerio de Educación garantizó la prosecución para 8º Grado e ingresan la Profa. Rosa Elena Lorca, Profa. Amelia Dorta, Prof. Diógenes Acosta y la Profa. Deyanira Sifontes. Este incrementó de la población estudiantil, hizo necesario el cambio de sede a una casa prestada con opción a compra.<br/><br/>Se continúa la prosecución al año escolar siguiente (1986-1987), completando, ahora con 9º Grado, la Tercera Etapa de la Educación Básica. En esta institución el plan de estudios varió con respecto a otros planteles, ya que los estudiantes cursaban 10 horas semanales de Educación para el Trabajo en todos los grados, además de las horas académicas. En 1999 el Ministerio de Educación autoriza la creación de una sección de 1º Año del Ciclo Diversificado en la especialidad de Administración mención Procesamiento de Datos, y de esta forma seguir cumpliendo con los principios de Educación para el Trabajo.<br/><br/>En el año escolar 2015-2016, con la profesora Deyanira como Directora se crean las Escuelas Técnicas a nivel nacional, dando inicio en nuestra institución a la Educación Media Técnica en Comercio y Servicios administrativos mención Informática, donde nace la primera población de estudiantes de 4to año “U” en esta mención.<br/><br/>En el año 2017 con el profesor Humberto Cisneros como Subdirector, toda la institución se convierte en Unidad Educativa Técnica desde primer año hasta sexto año, dándole continuidad a la Educación Media Técnica en Comercio y Servicios administrativos, aperturando dos menciones más : Contabilidad y  Administración financiera.<br/><br/>Cabe destacar que este año escolar 2017-2018 egresará la última promoción de Media General como Bachilleres y la Primera Promoción de Técnicos Medio en Comercio y Servicios Administrativos Mención Informática de esta institución dándole paso a la Escuela Técnica quienes egresarán con el título de Técnicos Medio en la mención que seleccionaron.<br/><br/>En el año 2018 siendo el Director del Plantel el Profesor Roberto Puerta realiza el proyecto dada la necesidad de la comunidad aledaña , presenta un proyecto ante Zona Educativa para el Nacimiento de la Educación Primaria el cual fue aprobado,  creando el Primer grado Sección “U” con una matrícula de 18 estudiantes en el turno de la tarde. Hasta este año 2020-2021 tiene la Primera Etapa de Educación Básica de 1ero a 3er grado.',
			component: 'h3',
			img: false,
		},
	], []);
	
	return (
		<React.Fragment>
			<main className={classes.containerMain} ref={()=>{
					document.title = 'La Candelaria';
				}}>
				<CarrouselHeader />
				<Container className='container--margin' maxWidth='md'>
					<Grid justify='center' container spacing={2}>
						{dataBox.map(useCallback((data, i) => (<BoxInfo key={i} {...data} />)),[])}
						<Grid item xs={12}>
							<Divider style={{height: 3}} />
						</Grid>
						<Etapas />
					</Grid>
				</Container>
			</main>
			<footer className='footer'>
				<FooterText />
			</footer>
		</React.Fragment>
	);
}

export default PageIndex;