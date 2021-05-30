import React, { useState } from 'react';

import { 
	Box, 
	Container, 
	Grid, 
	Divider, 
	Paper, 
	Typography, 
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Footer from '../../components/Footer';
import institutoLogo from '../../imgs/instituto.jpg';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		marginBottom: theme.spacing(10),
	},
	headerImg: {
		background: `url(${institutoLogo})`,
		backgroundAttachment: 'fixed',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: 500,
	},
	header: {
		background: theme.palette.primary.main + 'c7',
		height: 500,
	},
	containerContent: {
		position: 'relative',
		top: -70,
	},
	paper1: {
		backgroundColor: '#DC7F9B',
		color: '#fff',
		height: 150,
		display: 'flex',
	},
	paper2: {
		backgroundColor: '#2F2F2F',
		color: '#fff',
		height: 150,
		display: 'flex',
	},
	paper3: {
		backgroundColor: '#6B8DD6',
		color: '#fff',
		height: 150,
		display: 'flex',
	},
	paper4: {
		backgroundColor: '#55A2A2',
		color: '#fff',
		height: 150,
		display: 'flex',
	},
	paper5: {
		backgroundColor: '#FC8948',
		color: '#fff',
		height: 150,
		display: 'flex',
	},
	paper6: {
		backgroundColor: '#9055A2',
		color: '#fff',
		height: 150,
		display: 'flex',
	},
}));

function SectionExpand() {
	const [expand, setExpand] = useState(false);

	const handleClick = () => {
		setExpand(!expand);
	};

	function createMarkup() {
		return {
			__html:
				'La U.E.P. A.P.E.P. “La Candelaria” de Turmero, es una Institución semi privada, ya que por una parte, es una Dependencia del Ministerio del Poder Popular para la Educación quien funge como empleador de todo el personal docente, administrativo y obrero por pago directo. Adicional a ello, sigue los lineamientos para llevar a cabo el hecho pedagógico de acuerdo a todo el basamento legal de la República Bolivariana de Venezuela como cualquier otro plantel público u oficial. Por otra parte, es una Dependencia de la Diócesis de Maracay, a través de la Parroquia “Nuestra Señora de Candelaria” de Turmero, quien en Convenio establecido entre la Iglesia y el Estado Venezolano, la Parroquia oferta la infraestructura y su mobiliario para el escenario educativo tanto para el Centro Taller Artesanal “La Candelaria” como para el área donde funciona el Liceo.<br/><br/>La Institución está afiliada a la Asociación de Promoción de la Educación Popular (A.P.E.P.) quien supervisa y vela a través del Párroco de la Comunidad, siendo en este caso, el Presbítero José Gregorio Bracamonte por nombramiento del Obispo de la Diócesis, quien a través de la A.P.E.P., funge como Director General para los efectos de ofrecer lineamientos en la orientación pastoral y promoción de la Unidad Educativa Privada A.P.E.P. “La Candelaria” según los valores de la fe cristiana católica. Por esta razón el plantel está adscrito a la Oficina de “Planteles Privados” de la Zona Educativa del Estado Aragua. Es público y privado el plantel.<br/><br/>Ha sido una iniciativa de la Iglesia Católica con el objeto de promover a los más necesitados de la comunidad nariñense una educación de Calidad en valores cristianos. Así pues, comenzando por el año 1959, siendo Su Excelencia Monseñor Rafael Arias Blanco el Arzobispo de Caracas, ya recién caída la dictadura gubernamental, en su afán de pastor, solicita a la comunidad cristiana en general y a su Presbiterio, que se enseñe a trabajar a los jóvenes de los barrios populares de Caracas para que pueda Adquirir un oficio que les permita satisfacer sus necesidades básicas y que a la vez les promueva para salir de la pobreza en que muchos viven. Muy probablemente, esta inspiración le viene dada por la fuerza de la Acción Católica (A.C.) en Europa y por el empuje de la Juventud Obrera Católica (J.O.C.) en la que participó Monseñor Rafael Arias Blanco y en donde conoció a muchos sacerdotes dedicados a la gestión y promoción social, entre ellos, al Presbítero Emilio Blaslow.<br/><br/>Posteriormente, para el año 1964, Su Excelencia El Cardenal José Humberto Quintero nombra al sacerdote italiano de origen belga: el Presbítero Emilio Blaslow, para que lleve adelante este trabajo, y luego da inicio a la Asociación para la Promoción de la Educación Popular (A.P.E.P.), fundada luego por el episcopado venezolano con características especiales y con un mensaje de liberación para que a través de la orientación y el diálogo se detecten vocaciones útiles a la nación. De este modo, la Iglesia Católica Venezolana decide ofrecer una educación como un servicio que atienda de manera integral y propicie la formación de jóvenes capacitados para el trabajo. Se establece así el Convenio Iglesia – Ministerio de Educación, según el cual la Iglesia facilita el local y dotación total del mismo y el Ministerio de Educación remunera el salario de los docentes.<br/><br/>Los planteles A.P.E.P. surgen inicialmente como escuelas de tipo pre-vocacional, dotadas de talleres de diversas áreas (madera, metales, cocina, comercio, corte y costura, comercio y secretariado). A ellas acuden los niños de las escuelas oficiales de la localidad a las cuales pertenecen. Están dirigidos por sacerdotes o religiosas y los maestros o profesores que laboran allí, deben ser personas que no solamente conozcan su oficio, sino que también sean cristianos comprometidos.<br/><br/>Este tipo de escuela permite la rotación de los niños, quienes reciben instrucción en por lo menos dos talleres al año. Una de estas escuelas es la Pre-Artesanal “La Candelaria”, o bien, como se la denomina actualmente: Centro Taller Nuclearizado A.P.E.P. “La Candelaria”. Hoy día, cuenta con 10 talleres en dos turnos para atender a niños de Sexto Grado de aproximadamente 24 escuelas de las zonas populares del Municipio Santiago Mariño.<br/><br/>Para 1980 toma la Dirección General del plantel el Padre José Pan Lago, Párroco de Turmero, quien a pesar de no conocer el funcionamiento de los Centros A.P.E.P., se dedicó de lleno y con entusiasmo a la obra, y con el transcurrir del tiempo surge la necesidad de crear un liceo en donde los niños de escasos recursos que acudían a esta Escuela Artesanal pudieran continuar su formación en la Educación para el Trabajo. Es entonces cuando por iniciativa del Padre Pan, realizaron las gestiones pertinentes contando con el apoyo de los docentes para fundar el “Liceo Experimental La Candelaria”, el cual inicia sus actividades en octubre de 1984, funcionando originalmente en dos habitaciones de la Casa Parroquial, acondicionadas para tal fin. Se contaba para aquel entonces con dos secciones de 7º Grado, una con 34 y otra con 39 estudiantes por las limitaciones de espacio.<br/><br/>Para el año escolar 1985 - 1986, el Ministerio de Educación garantizó la prosecución para 8º Grado e ingresan la Profa. Rosa Elena Lorca, Profa. Amelia Dorta, Prof. Diógenes Acosta y la Profa. Deyanira Sifontes. Este incrementó de la población estudiantil, hizo necesario el cambio de sede a una casa prestada con opción a compra.<br/><br/>Se continúa la prosecución al año escolar siguiente (1986-1987), completando, ahora con 9º Grado, la Tercera Etapa de la Educación Básica. En esta institución el plan de estudios varió con respecto a otros planteles, ya que los estudiantes cursaban 10 horas semanales de Educación para el Trabajo en todos los grados, además de las horas académicas. En 1999 el Ministerio de Educación autoriza la creación de una sección de 1º Año del Ciclo Diversificado en la especialidad de Administración mención Procesamiento de Datos, y de esta forma seguir cumpliendo con los principios de Educación para el Trabajo.<br/><br/>En el año escolar 2015-2016, con la profesora Deyanira como Directora se crean las Escuelas Técnicas a nivel nacional, dando inicio en nuestra institución a la Educación Media Técnica en Comercio y Servicios administrativos mención Informática, donde nace la primera población de estudiantes de 4to año “U” en esta mención.<br/><br/>En el año 2017 con el profesor Humberto Cisneros como Subdirector, toda la institución se convierte en Unidad Educativa Técnica desde primer año hasta sexto año, dándole continuidad a la Educación Media Técnica en Comercio y Servicios administrativos, aperturando dos menciones más : Contabilidad y  Administración financiera.<br/><br/>Cabe destacar que este año escolar 2017-2018 egresará la última promoción de Media General como Bachilleres y la Primera Promoción de Técnicos Medio en Comercio y Servicios Administrativos Mención Informática de esta institución dándole paso a la Escuela Técnica quienes egresarán con el título de Técnicos Medio en la mención que seleccionaron.<br/><br/>En el año 2018 siendo el Director del Plantel el Profesor Roberto Puerta realiza el proyecto dada la necesidad de la comunidad aledaña , presenta un proyecto ante Zona Educativa para el Nacimiento de la Educación Primaria el cual fue aprobado,  creando el Primer grado Sección “U” con una matrícula de 18 estudiantes en el turno de la tarde. Hasta este año 2020-2021 tiene la Primera Etapa de Educación Básica de 1ero a 3er grado.',
		};
	}

	let overFlowClass = !expand ? 'BoxIndex--OverFlow' : '';

	return (
		<Grid item xs={12}>
			<Typography variant="h5" className="text__bold--big" gutterBottom>
				Reseña histórica
			</Typography>
			<Typography
				align="justify"
				className={overFlowClass}
				dangerouslySetInnerHTML={createMarkup()}
			/>
			<Button color="primary" onClick={handleClick}>
				{!expand ? 'Ver más' : 'Ver menos'}
			</Button>
		</Grid>
	);
}

function SectionInfo() {
	return (
		<Grid container spacing={2} item xs={12}>
			<Grid item xs={12} sm={6}>
				<Typography variant="h5" className="text__bold--big" gutterBottom>
					Misión
				</Typography>
				<Typography align="justify">
					{
						'Buscamos desarrollar una acción Educativa Integral en los niveles de Educación Primaria, integrando a partir del año escolar 2017 – 2018 una Escuela Técnica, cuya misión es la formación de niños y adolescentes mediante el desarrollo de destrezas y capacidades a la luz de la exploración y orientación educativa y vocacional. Así como estimular el deseo de saber y desarrollar la capacidad de ser de cada individuo.'
					}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography variant="h5" className="text__bold--big" gutterBottom>
					Visión
				</Typography>
				<Typography align="justify">
					{
						'Se tiene como visión la educación progresiva e integral de sus estudiantes, una enseñanza humana cristiana de calidad, con una investigación y actualización científica y pedagógica permanente que permita la inserción de los egresados en forma efectiva dentro de la sociedad, proponiendo a Jesús como referencia de sentido, valores, y forma de vivir.'
					}
				</Typography>
			</Grid>
		</Grid>
	);
}

function SectionEtapas() {
	const classes = useStyles();	
	
	return (
		<Grid container spacing={2} item xs={12}>
			<Grid item xs={12}>
				<Typography variant="h5" className="text__bold--big" gutterBottom>
					Etapas educativas
				</Typography>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4}>
				<Paper className={classes.paper1}>
					<Grid container direction='column' justify='center' alignItems='center'>
						<Typography align='center'>
							Centro taller artesanal
						</Typography>
						<Typography 
							variant='body2' 
							className='text__opacity--semi'
							align='center'
						>
							6° grado
						</Typography>
					</Grid>
				</Paper>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4}>
				<Paper className={classes.paper2}>
					<Grid container direction='column' justify='center' alignItems='center'>
						<Typography align='center'>Educación primaria</Typography>
						<Typography 
							variant='body2' 
							className='text__opacity--semi'
							align='center' 
						>
							Desde 1° hasta 6° Grado
						</Typography>
					</Grid>
				</Paper>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4}>
				<Paper className={classes.paper3}>
					<Grid container direction='column' justify='center' alignItems='center'>
						<Typography align='center'>
							Educación Media General
						</Typography>
						<Typography 
							variant='body2' 
							className='text__opacity--semi'
							align='center' 
						>
							Desde 1° hasta 3° Año
						</Typography>
					</Grid>
				</Paper>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4}>
				<Paper className={classes.paper4}>
					<Grid container direction='column' justify='center' alignItems='center'>
						<Typography align='center'>
							Educación Media Técnica en Informática
						</Typography>
						<Typography 
							variant='body2' 
							className='text__opacity--semi'
							align='center'
						>
							Desde 4° hasta 6° Año
						</Typography>
					</Grid>
				</Paper>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4}>
				<Paper className={classes.paper5}>
					<Grid container direction='column' justify='center' alignItems='center'>
						<Typography align='center'>
							Educación Media Técnica en Contabilidad
						</Typography>
						<Typography 
							variant='body2' 
							className='text__opacity--semi'
							align='center'
						>
							Desde 4° hasta 6° Año
						</Typography>
					</Grid>
				</Paper>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4}>
				<Paper className={classes.paper6}>
					<Grid container direction='column' justify='center' alignItems='center'>
						<Typography align='center'>
							Educación Media Técnica Administración en Financias
						</Typography>
						<Typography 
							variant='body2' 
							className='text__opacity--semi' 
							align='center'
						>
							Desde 4° hasta 6° Año
						</Typography>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

function PageIndex() {
	document.title = 'La Candelaria';
	const classes = useStyles();

	return (
		<React.Fragment>
			<main className={classes.containerMain}>
				<Grid container justify="center" alignItems="center" className={classes.headerImg}>
					<Grid container justify="center" alignItems="center" item xs className={classes.header}>
						<Typography className="text__bold--big" align="center" variant="h3">
							<Box mx={3} color="primary.contrastText">Enfocados en el Estudio y la Fe</Box>
						</Typography>
					</Grid>
				</Grid>
				<Container className={classes.containerContent}>
					<Grid container justify="center" spacing={3}>
						<Grid item xs={12}>
							<Paper className="paper--padding">
								<Typography align="center">
									{
										'La U.E.P A.P.E.P “La Candelaria" brinda sus instalaciones a estudiantes de Primaria, Centro Taller Pre-Vocacional a los estudiantes de 6to grado de Escuelas Amigas, Media General y Media Técnica, tiene como norte la formación integral, en valores y principios religiosos, basados en la Fe Católica. Siguiendo la Filosofía APEP educar para la vida, para el trabajo. Los futuros Técnicos medios en las diferentes menciones tienen la oportunidad de iniciarse en el campo laboral luego de realizar el proceso de pasantías en su último año.'
									}
								</Typography>
							</Paper>
						</Grid>
						<Grid container spacing={2} item xs={12}>
							<SectionInfo />
							<SectionExpand />
						</Grid>
					</Grid>
				</Container>
				<Divider style={{position: 'relative', top: -35}} />
				<Container>
					<Grid container>
						<SectionEtapas />
					</Grid>
				</Container>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default PageIndex;