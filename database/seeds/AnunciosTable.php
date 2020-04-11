<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AnunciosTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
			$anuncios = array(
				array('id' => '1','title' => 'Candelaria UPDATE!!','content' => 'Se ha implementado la nueva versión de la página web, incluyendo un nuevo diseño y funciones extras para un mejor manejo del sistema.','fecha' => '2019-10-20 02:00:28','byUser' => 'A-recker'),
				array('id' => '2','title' => 'IMPORTANTE','content' => 'Buenas tardes también puedes ver el programa Cada Familia Una Escuela a través del canal  TV FANB a las 3:00 pm. Por otra parte puedes reforzar el área de Castellano con el Programa La Real Academia transmitido por el Canal Tele Aragua a las 7:30am. ','fecha' => '2020-03-18 14:55:07','byUser' => 'A-rhadys'),
				array('id' => '3','title' => 'ÁREA CASTELLANO','content' => ' Prof. Zuleima Benavides 1er año "B"  y  "C" 2do año "B" y "C".</br>Realizar un trabajo escrito con el tema que le fue asignado.</br>Debe contener: Portada,  Introducción, contenido y conclusión. </br>CORRE LA VOZ A TUS COMPAÑEROS. ','fecha' => '2020-03-21 17:53:59','byUser' => 'A-rhadys'),
				array('id' => '4','title' => 'INVITACIÓN','content' => 'Se invita a todas las Familias de la U.E.P.  A.P.E.P LA CANDELARIA A REZAR UN PADRE NUESTRO MAÑANA 25/03/2020 Hora 12:00 medio día. Para orar POR QUE ESTE VIRUS  COVID-19 SEA ELIMINADO A NIVEL MUNDIAL.','fecha' => '2020-03-24 15:35:04','byUser' => 'A-rhadys'),
				array('id' => '5','title' => 'REPRESENTANTES','content' => '                                     ¡CORRE LA VOZ¡</br>EL DÍA MIÉRCOLES 01/04/2020  SE ESTARÁN RECIBIENDO LOS TRABAJOS PENDIENTES DEL II MOMENTO. SOLO ENTREGA. DE 7.30 am  10:00 am.</br>TODAS LAS ASIGNATURAS.  TOMA LAS MEDIDAS PREVENTIVAS SOCIAL. ','fecha' => '2020-03-26 19:53:21','byUser' => 'A-rhadys'),
				array('id' => '6','title' => 'MATEMÁTICA','content' => 'MATEMATICA: 2 A  y 2 B  Entregar por correo el día miércoles 01/04/20</br>Anasaavedra2929@gmail.com. 2 “A” trabajo de Polinomios  2 “B” Ejercicios de Vectores. </br>3 “B” Trabajo iniciado en clase . </br>','fecha' => '2020-03-28 15:56:57','byUser' => 'A-rhadys'),
				array('id' => '7','title' => 'MATEMÁTICA','content' => 'MATEMATICA: 2 A  y 2 B  Entregar por correo el día miércoles 01/04/20</br>Anasaavedra2929@gmail.com. 2 “A” trabajo de Polinomios  2 “B” Ejercicios de Vectores. </br>3 “B” Trabajo iniciado en clase . </br>','fecha' => '2020-03-28 16:03:01','byUser' => 'A-rhadys'),
				array('id' => '8','title' => 'III MOMENTO','content' => 'Para  estudiantes de  Técnica  4to y 5to año. </br>Los docentes de la especialidad están diseñando el plan de trabajo y poder continuar con el proceso educativo. </br>Se agradece la organización para garantizar la comunicación, Docente-Estudiante- representante.','fecha' => '2020-03-30 10:46:14','byUser' => 'A-rhadys'),
				array('id' => '9','title' => 'ASIGNATURAS','content' => '1er año A,B,C: Castellano, Matemática, G,H y C con Arte y patrimonio,</br>Ciencias Naturales,  ISAM, Introducción a la Informática.</br></br>2do año A,B,C: Castellano, Matemática, Ciencias Naturales, Fundamentos de Contabilidad, Técnicas de Oficina, A y P.','fecha' => '2020-04-05 10:19:13','byUser' => 'A-rhadys'),
				array('id' => '10','title' => 'ASIGNATURAS','content' => '3er Año A,B,C: Lenguaje, Matemática, Física, Informática y Administración.</br></br>En G,H y C se tomara 1ero y 2do lapso incluyendo las actividades del portafolio. </br>La prof. Yanixia Acosta entregara nota de 2do momento. ','fecha' => '2020-04-05 10:46:48','byUser' => 'A-rhadys'),
				array('id' => '11','title' => 'ASIGNATURAS','content' => ' 4to Año A y B  Lenguaje, Matemática, Historia de Venezuela y FSN, Informática I, Mecanografía, NGD, Contabilidad, T y PAT</br></br>4to C Lenguaje, Matemática, Historia de Venezuela y FSN, Informática I, Mecanografía, Contabilidad, T y CM, Prácticas de Oficina I</br></br>','fecha' => '2020-04-05 11:22:35','byUser' => 'A-rhadys'),
				array('id' => '12','title' => 'ASIGNATURAS','content' => ' 5to Año A: Lenguaje, matemática, Práctica de Oficina I, Informática II, Alg. y Progración, Sistemas de Información, FSN, Introducción al Algebra.</br></br>5to B: Lenguaje, matemática, Práctica de Oficina I, Informática II, LLM,FSN, MI y P. </br>','fecha' => '2020-04-05 12:08:22','byUser' => 'A-rhadys'),
				array('id' => '13','title' => 'ASIGNATURAS','content' => ' 5to C: Lenguaje, Matemática, Prácticas de Oficina II, FSN, Informática II, LLM,Contabilidad General.</br>','fecha' => '2020-04-05 12:15:15','byUser' => 'A-rhadys'),
				array('id' => '14','title' => 'III MOMENTO','content' => 'INICIO DEL III MOMENTO PEDAGÓGICO LUNES 13/04/2020 CON EL FAVOR DE DIOS PRIMERAMENTE Y EL APOYO DE TUS DOCENTES. SE ESTARÁN PUBLICANDO LAS ACTIVIDADES A REALIZAR POR ESTE MEDIO, CORREO, FACEBOOK, WHATSAPP. ','fecha' => '2020-04-07 16:27:42','byUser' => 'A-rhadys')
			);

			foreach ($anuncios as $anuncio) {
				$cedula = explode('-', $anuncio['byUser']);
				$cedula = $cedula[1];
				DB::table('anuncios_data')->insert([
					'anuncio_title' => $anuncio['title'],
					'anuncio_content' => $anuncio['content'],
					'anuncio_owner' => $cedula,
					'anuncio_create_at' => $anuncio['fecha'],
				]);
			}
			// $max = 100;
			// for($i=0; $i < $max; $i++){
			// 	DB::table('anuncios_data')->insert([
			// 		'anuncio_title' => Str::random(10),
			// 		'anuncio_content' => "Hola, soy una prueba muy pequeña, pero prueba es prueba.",
			// 		'anuncio_owner' => 'reckersito',
			// 		'anuncio_create_at' => now()->sub($max - $i, 'hours'),
			// 	]);
			// }

    }
}
