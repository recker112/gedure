export const estadosVE = [
	'Amazonas',
	'Anzoátegui',
	'Apure',
	'Aragua',
	'Barinas',
	'Bolívar',
	'Carabobo',
	'Cojedes',
	'Delta Amacuro',
	'Falcón',
	'Distrito Capital',
	'Guárico',
	'Lara',
	'Mérida',
	'Miranda',
	'Monagas',
	'Nueva Esparta',
	'Portuguesa',
	'Sucre',
	'Tachira',
	'Trujillo',
	'Vargas',
	'Yaracuy',
	'Zulia',
];

export const buscarMunicipioVE = (estado) => {
	switch (estado) {
		case 'Amazonas':
			return ['Alto Orinoco', 'Atabapo', 'Atures', 'Autana', 'Manapiare', 'Maroa', 'Río Negro'];

		case 'Anzoátegui':
			return [
				'Anaco',
				'Aragua',
				'Bolívar',
				'Bruzual',
				'Cajigal',
				'Carvajal',
				'Diego Bautista Urbaneja',
				'Freites',
				'Guanipa',
				'Guanta',
				'Independencia',
				'Libertad',
				'McGregor',
				'Miranda',
				'Monagas',
				'Peñalver',
				'Píritu',
				'San Juan de Capistrano',
				'Santa Ana',
				'Simón Rodriguez',
				'Sotillo',
			];

		case 'Apure':
			return [
				'Achaguas',
				'Biruaca',
				'Muñoz',
				'Páez',
				'Pedro Camejo',
				'Rómulo Gallegos',
				'San Fernando',
			];

		case 'Aragua':
			return [
				'Bolívar',
				'Camatagua',
				'Francisco Linares Alcántara',
				'Girardot',
				'José Ángel Lamas',
				'José Félix Ribas',
				'José Rafael Revenga',
				'Libertador',
				'Mario Briceño Iragorry',
				'Ocumare de la Costa de Oro',
				'San Casimiro',
				'San Sebastián',
				'Santiago Mariño',
				'Santos Michelena',
				'Sucre',
				'Tovar',
				'Urdaneta',
				'Zamora',
			];

		case 'Barinas':
			return [
				'Alberto Arvelo Torrealba',
				'Andrés Eloy Blanco',
				'Antonio José de Sucre',
				'Arismendi',
				'Barinas',
				'Bolívar',
				'Cruz Paredes',
				'Ezequiel Zamora',
				'Obispos',
				'Pedraza',
				'Rojas',
				'Sosa',
			];

		case 'Bolívar':
			return [
				'Caroní',
				'Cedeño',
				'El Callao',
				'Gran Sabana',
				'Heres',
				'Piar',
				'Raúl Leoni',
				'Roscio',
				'Sifontes',
				'Sucre',
				'Padre Pedro Chen',
			];

		case 'Carabobo':
			return [
				'Bejuma',
				'Carlos Arvelo',
				'Diego Ibarra',
				'Guacara',
				'Juan José Mora',
				'Libertador',
				'Los Guayos',
				'Miranda',
				'Montalbán',
				'Naguanagua',
				'Puerto Cabello',
				'San Diego',
				'San Joaquín',
				'Valencia',
			];

		case 'Cojedes':
			return [
				'Anzoátegui',
				'Pao de San Juan Bautista',
				'Tinaquillo',
				'Girardot',
				'Lima Blanco',
				'Ricaurte',
				'Rómulo Gallegos',
				'Ezequiel Zamora',
				'Tinaco',
			];

		case 'Delta Amacuro':
			return ['Antonio Díaz', 'Casacoima', 'Pedernales', 'Tucupita'];

		case 'Falcón':
			return [
				'Acosta',
				'Bolívar',
				'Buchivacoa',
				'Cacique Manaure',
				'Carirubana',
				'Colina',
				'Dabajuro',
				'Democracia',
				'Falcón',
				'Federación',
				'Jacura',
				'Los Taques',
				'Mauroa',
				'Miranda',
				'Monseñor Iturriza',
				'Palmasola',
				'Petit',
				'Píritu',
				'San Francisco',
				'Silva',
				'Sucre',
				'Tocópero',
				'Unión',
				'Urumaco',
				'Zamora',
			];

		case 'Distrito Capital':
			return ['Libertador'];

		case 'Guárico':
			return [
				'Chaguaramas',
				'Camaguán',
				'El Socorro',
				'Francisco de Miranda',
				'José Félix Ribas',
				'José Tadeo Monagas',
				'Juan Germán Roscio',
				'Julián Mellado',
				'Las Mercedes',
				'Leonardo Infante',
				'Pedro Zaraza',
				'Ortíz',
				'San Gerónimo de Guayabal',
				'San José de Guaribe',
				'Santa María de Ipire',
			];

		case 'Lara':
			return [
				'Andrés Eloy Blanco',
				'Crespo',
				'Iribarren',
				'Jiménez',
				'Morán',
				'Palavecino',
				'Simón Planas',
				'Torres',
				'Urdaneta',
			];

		case 'Mérida':
			return [
				'Alberto Adriani',
				'Andrés Bello',
				'Antonio Pinto Salinas',
				'Aricagua',
				'Arzobispo Chacón',
				'Campo Elías',
				'Caracciolo Parra Olmedo',
				'Cardenal Quintero',
				'Guaraque',
				'Julio César Salas',
				'Justo Briceño',
				'Libertador',
				'Miranda',
				'Obispo Ramos de Lora',
				'Padre Norega',
				'Pueblo Llano',
				'Rangel',
				'Rivas Dávila',
				'Santos Marquina',
				'Sucre',
				'Tovar',
				'Tulio Febres Cordero',
				'Zea',
			];

		case 'Miranda':
			return [
				'Acevedo',
				'Andrés Bello',
				'Baruta',
				'Brión',
				'Buroz',
				'Carrizal',
				'Chacao',
				'Cristóbal Rojas',
				'El Hatillo',
				'Guaicaipuro',
				'Independencia',
				'Lander',
				'Los Salias',
				'Páez',
				'Paz Castillo',
				'Pedro Gual',
				'Plaza',
				'Simón Bolívar',
				'Sucre',
				'Urdaneta',
				'Zamora',
			];

		case 'Monagas':
			return [
				'Acosta',
				'Aguasay',
				'Bolívar',
				'Caripe',
				'Cedeño',
				'Ezequiel Zamora',
				'Libertador',
				'Maturín',
				'Piar',
				'Punceres',
				'Santa Bárbara',
				'Sotillo',
				'Uracoa',
			];

		case 'Nueva Esparta':
			return [
				'Antolín del Campo',
				'Arismendi',
				'Díaz',
				'García',
				'Gómez',
				'Maneiro',
				' Marcano',
				'Mariño',
				'Península de Macanao',
				'Tubores',
				'Villalba',
			];

		case 'Portuguesa':
			return [
				'Araure',
				'Agua Blanca',
				'Esteller',
				'Guanare',
				'Guanarito',
				'Monseñor José Vicente de Unda',
				'Ospino',
				'Páez',
				'Papelón',
				'San Genaro de Boconoíto',
				'San Rafael de Onoto',
				'Santa Rosalía',
				'Sucre',
				'Turén',
			];

		case 'Sucre':
			return [
				'Andrés Eloy Blanco',
				'Andrés Mata',
				'Arismendi',
				'Benítez',
				'Bermúdez',
				'Bolívar',
				'Cajigal',
				'Cruz Salmerón Acosta',
				'Libertador',
				'Mariño',
				'Mejía',
				'Montes',
				'Ribero',
				'Sucre',
				'Valdez',
			];

		case 'Tachira':
			return [
				'Andrés Bello',
				'Antonio Rómulo Costa',
				'Ayacucho',
				'Bolívar',
				'Cárdenas',
				'Córdoba',
				'Fernández Feo',
				'Francisco de Miranda',
				'García de Hevia',
				'Guásimos',
				'Independencia',
				'Jáuregui',
				'José María Vargas',
				'Junín',
				'Libertad',
				'Libertador',
				'Lobatera',
				'Michelena',
				'Panamericano',
				'Pedro María Ureña',
				'Rafael Urdaneta',
				'Samuel Darío Maldonado',
				'San Cristóbal',
				'Seboruco',
				'Simón Rodríguez',
				'Sucre',
				'Torbes',
				'Uribante',
				'San Judas Tadeo',
			];

		case 'Trujillo':
			return [
				'Andrés Bello',
				'Boconó',
				'Bolívar',
				'Candelaria',
				'Carache',
				'Escuque',
				'José Felipe Márquez Cañizalez',
				'Juan Vicente Campos Elías',
				'La Ceiba',
				'Miranda',
				'Monte Carmelo',
				'Motatán',
				'Pampán',
				'Pampanito',
				'Rafael Rangel',
				'San Rafael de Carvajal',
				'Sucre',
				'Trujillo',
				'Urdaneta',
				'Valera',
			];

		case 'Vargas':
			return ['Vargas'];

		case 'Yaracuy':
			return [
				'Arístides Bastidas',
				'Bolívar',
				'Bruzual',
				'Cocorote',
				'Independencia',
				'José Antonio Páez',
				'La Trinidad',
				'Manuel Monge',
				'Nirgua',
				'Peña',
				'San Felipe',
				'Sucre',
				'Urachiche',
				'Veroes',
			];

		case 'Zulia':
			return [
				'Almirante Padilla',
				'Baralt',
				'Cabimas',
				'Catatumbo',
				'Colón',
				'Francisco Javier Pulgar',
				'Jesús Enrique Losada',
				'Jesús María Semprún',
				'La Cañada de Urdaneta',
				'Lagunillas',
				'Machiques de Perijá',
				'Mara',
				'Maracaibo',
				'Miranda',
				'Páez',
				'Rosario de Perijá',
				'San Francisco',
				'Santa Rita',
				'Simón Bolívar',
				'Sucre',
				'Valmore Rodríguez',
			];

		default:
			break;
	}
};

export const buscarParroquiaVE = (estado, municipio) => {
	let arreglo;

	// Amazonas
	if (estado === 'Amazonas') {
		switch (municipio) {
			case 'Alto Orinoco':
				arreglo =
					'Parroquia Alto Orinoco La Esmeralda, Parroquia Huachamacare Acanaña,​ Parroquia, Marawaka Toky Shamanaña,​ Parroquia Mavaka Mavaka, Parroquia Sierra Parima Parimabé';
				return arreglo.split(',');

			case 'Atabapo':
				arreglo =
					'Parroquia Atabapo San Fernando de Atabapo, Parroquia Ucata Laja Lisa,​ Parroquia Yapacana Macuruco,​ Parroquia Caname Guarinuma​';
				return arreglo.split(',');

			case 'Atures':
				arreglo =
					'Parroquia Fernando Girón Tovar Puerto Ayacucho,​ Parroquia Luis Alberto Gómez Puerto Ayacucho,​ Parroquia Pahueña Limón de Parhueña,​ Parroquia Platanillal Platanillal​';
				return arreglo.split(',');

			case 'Autana':
				arreglo =
					'Parroquia Samariapo Samariapo,​ Parroquia Sipapo Pendare,​ Parroquia Munduapo Munduapo,​ Parroquia Guayapo San Pedro del Orinoco,​ Parroquia Isla Ratón Isla Ratón';
				return arreglo.split(',');

			case 'Manapiare':
				arreglo =
					'Parroquia Alto Ventuari Cacurí,​ Parroquia Medio Ventuari Manami,​ Parroquia Bajo Ventuari Marueta,​ Parroquia Manapiare San Juan de Manapiare';
				return arreglo.split(',');

			case 'Maroa':
				arreglo = 'Parroquia Maroa, Parroquia Victorino,​ Parroquia Comunidad';
				return arreglo.split(',');

			case 'Río Negro':
				arreglo =
					'Parroquia Casiquiare Curimacare,​ Parroquia Cocuy,​ Parroquia San Carlos de Río Negro,​ Parroquia Solano Solano';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Anzoátegui
	if (estado === 'Anzoátegui') {
		switch (municipio) {
			case 'Anaco':
				arreglo = 'Parroquia Anaco, Parroquia San Joaquín​';
				return arreglo.split(',');

			case 'Aragua':
				arreglo = 'Parroquia Cachipo, Parroquia Aragua de Barcelona​';
				return arreglo.split(',');

			case 'Diego Bautista Urbaneja':
				arreglo = 'Parroquia Lechería, Parroquia El Morro';
				return arreglo.split(',');

			case 'Peñalver':
				arreglo = 'Parroquia Puerto Píritu, Parroquia San Miguel, Parroquia Sucre';
				return arreglo.split(',');

			case 'Carvajal':
				arreglo = 'Parroquia Valle de Guanape, Parroquia Santa Bárbara';
				return arreglo.split(',');

			case 'Miranda':
				arreglo =
					'Parroquia Atapirire, Parroquia Boca del Pao, Parroquia El Pao, Parroquia Pariaguán';
				return arreglo.split(',');

			case 'Guanta':
				arreglo = 'Parroquia Guanta, Parroquia Chorrerón​';
				return arreglo.split(',');

			case 'Independencia':
				arreglo = 'Parroquia Mamo, Parroquia Soledad';
				return arreglo.split(',');

			case 'Monagas':
				arreglo =
					'Parroquia Mapire, Parroquia Piar, Parroquia Santa Clara, Parroquia San Diego de Cabrutica, Parroquia Uverito, Parroquia Zuata';
				return arreglo.split(',');

			case 'Sotillo':
				arreglo = 'Parroquia Puerto La Cruz, Parroquia Pozuelos';
				return arreglo.split(',');

			case 'Cajigal':
				arreglo = 'Parroquia Onoto, Parroquia San Pablo';
				return arreglo.split(',');

			case 'Libertad':
				arreglo =
					'Parroquia San Mateo, Parroquia El Carito, Parroquia Santa Inés, Parroquia La Romereña';
				return arreglo.split(',');

			case 'Bruzual':
				arreglo = 'Parroquia Clarines, Parroquia Guanape, Parroquia Sabana de Uchire';
				return arreglo.split(',');

			case 'Freites':
				arreglo = 'Parroquia Cantaura, Parroquia Libertador, Parroquia Santa Rosa, Parroquia Urica';
				return arreglo.split(',');

			case 'Píritu':
				arreglo = 'Parroquia Píritu, Parroquia San Francisco';
				return arreglo.split(',');

			case 'Guanipa':
				arreglo = 'Parroquia San José de Guanipa';
				return arreglo.split(',');

			case 'San Juan de Capistrano':
				arreglo = 'Parroquia Boca de Uchire, Parroquia Boca de Chávez';
				return arreglo.split(',');

			case 'Santa Ana':
				arreglo = 'Parroquia Pueblo Nuevo, Parroquia Santa Ana';
				return arreglo.split(',');

			case 'Bolívar':
				arreglo =
					'Parroquia Bergantín, Parroquia Caigua, Parroquia El Carmen., Parroquia El Pilar, Parroquia Naricual., Parroquia San Cristóbal';
				return arreglo.split(',');

			case 'Simón Rodriguez':
				arreglo = 'Parroquia Edmundo Barrios, Parroquia Miguel Otero Silva';
				return arreglo.split(',');

			case 'McGregor':
				arreglo = 'Parroquia El Chaparro, Parroquia Tomás Alfaro, Parroquia Calatrava';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Apure
	if (estado === 'Apure') {
		switch (municipio) {
			case 'Achaguas':
				arreglo =
					'Parroquia Achaguas, Parroquia Apurito, Parroquia El Yagual, Parroquia Guachara, Parroquia Mucuritas, Parroquia Queseras del medio';
				return arreglo.split(',');

			case 'Biruaca':
				arreglo = 'Parroquia Biruaca';
				return arreglo.split(',');

			case 'Muñoz':
				arreglo =
					'Parroquia Bruzual, Parroquia Mantecal, Parroquia Quintero, Parroquia Rincón Hondo, Parroquia San Vicente';
				return arreglo.split(',');

			case 'Pedro Camejo':
				arreglo = 'Parroquia San Juan de Payara, Parroquia Codazzi, Parroquia Cunaviche';
				return arreglo.split(',');

			case 'San Fernando':
				arreglo =
					'Parroquia San Fernando, Parroquia El Recreo, Parroquia Peñalver, Parroquia San Rafael de Atamaica';
				return arreglo.split(',');

			case 'Páez':
				arreglo =
					'Parroquia Guasdualito, Parroquia Aramendi, Parroquia El Amparo, Parroquia San Camilo, Parroquia Urdaneta';
				return arreglo.split(',');

			case 'Rómulo Gallegos':
				arreglo = 'Parroquia Elorza, Parroquia La Trinidad';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Aragua
	if (estado === 'Aragua') {
		switch (municipio) {
			case 'Bolívar':
				arreglo = 'Parroquia Bolívar';
				return arreglo.split(',');

			case 'Camatagua':
				arreglo = 'Parroquia Camatagua, Parroquia Carmen de Cura, (es una tribu)';
				return arreglo.split(',');

			case 'Francisco Linares Alcántara':
				arreglo =
					'Santa Rita, Parroquia Francisco de Miranda, Parroquia Moseñor Feliciano González';
				return arreglo.split(',');

			case 'Girardot':
				arreglo =
					'Pedro José Ovalles, Joaquín Crespo, José Casanova Godoy, Madre María de San José, Andrés Eloy Blanco, Los Tacarigua, Las Delicias, Choroní';
				return arreglo.split(',');

			case 'José Ángel Lamas':
				arreglo = 'Parroquia Santa Cruz';
				return arreglo.split(',');

			case 'José Félix Ribas':
				arreglo =
					'José Félix Ribas, Castor Nieves Ríos, Las Guacamayas, Pao de Zárate, Parroquia Zuata';
				return arreglo.split(',');

			case 'José Rafael Revenga':
				arreglo = 'Parroquia José Rafael Revenga';
				return arreglo.split(',');

			case 'Libertador':
				arreglo = 'Parroquia Palo Negro, Parroquia San Martín de Porres';
				return arreglo.split(',');

			case 'Mario Briceño Iragorry':
				arreglo = 'Parroquia El Limón, Parroquia Caña de Azúcar';
				return arreglo.split(',');

			case 'Ocumare de la Costa de Oro':
				arreglo = 'Parroquia Ocumare de la Costa';
				return arreglo.split(',');

			case 'San Casimiro':
				arreglo =
					'Parroquia San Casimiro, Parroquia Güiripa, Parroquia Ollas de Caramacate, Parroquia Valle Morín';
				return arreglo.split(',');

			case 'San Sebastián':
				arreglo = 'Parroquia San Sebastían';
				return arreglo.split(',');

			case 'Santiago Mariño':
				arreglo =
					'Parroquia Turmero, Parroquia Arevalo Aponte, Parroquia Chuao, Parroquia Samán de Güere, Alfredo Pacheco Miranda';
				return arreglo.split(',');

			case 'Santos Michelena':
				arreglo = 'Parroquia Santos Michelena, Parroquia Tiara';
				return arreglo.split(',');

			case 'Sucre':
				arreglo = 'Parroquia Cagua, Parroquia Bella Vista';
				return arreglo.split(',');

			case 'Tovar':
				arreglo = 'Parroquia Tovar';
				return arreglo.split(',');

			case 'Urdaneta':
				arreglo =
					'Parroquia Urdaneta, Parroquia Las Peñitas, Parroquia San Francisco de Cara, Parroquia Taguay';
				return arreglo.split(',');

			case 'Zamora':
				arreglo =
					'Parroquia Villa de Cura, Parroquia Magdaleno, Parroquia San Francisco de Asís, Parroquia Valles de Tucutunemo, Parroquia Augusto Mijares';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Barinas
	if (estado === 'Barinas') {
		switch (municipio) {
			case 'Alberto Arvelo Torrealba':
				arreglo =
					'Parroquia Sabaneta (Sabaneta), Parroquia Juan Antonio Rodríguez Domínguez (Veguitas)';
				return arreglo.split(',');

			case 'Andrés Eloy Blanco':
				arreglo = 'Parroquia El Cantón, Parroquia Santa Cruz de Guacas, Parroquia Puerto Vivas';
				return arreglo.split(',');

			case 'Antonio José de Sucre':
				arreglo =
					'Parroquia Socopo, Parroquia Nicolás Pulido(Chameta), Parroquia Andrés Bello(Bum-Bum)';
				return arreglo.split(',');

			case 'Arismendi':
				arreglo =
					'Parroquia Arismendi, Parroquia Guadarrama, Parroquia La Unión, Parroquia San Antonio';
				return arreglo.split(',');

			case 'Barinas':
				arreglo =
					'Parroquia Barinas (Barinas), Parroquia Alfredo Arvelo Larriva (Capital Quebrada Seca), Parroquia San Silvestre (Capital San Silvestre), Parroquia Santa Inés (Capital Santa Inés), Parroquia Santa Lucía (Capital Santa Lucia), Parroquia Torunos (Capital Torunos), Parroquia El Carmen (Barinas), Parroquia Rómulo Betancourt (Barinas), Parroquia Corazón de Jesús (Barinas), Parroquia Ramón Ignacio Méndez (Barinas), Parroquia Alto Barinas (Barinas), Parroquia Manuel Palacio Fajardo (Capital La Caramuca), Parroquia Juan Antonio Rodríguez Domínguez (Capital El Corozo), Parroquia Dominga Ortiz de Páez (Capital La Mula)';
				return arreglo.split(',');

			case 'Bolívar':
				arreglo = 'Parroquia Barinitas, Parroquia Altamira de Cáceres, Parroquia Calderas';
				return arreglo.split(',');

			case 'Cruz Paredes':
				arreglo =
					'Parroquia Barrancas, Parroquia El Socorro(La Yuca), Parroquia Mazparrito(el melon)';
				return arreglo.split(',');

			case 'Ezequiel Zamora':
				arreglo =
					'Parroquia Santa Bárbara (Santa Barbara), Parroquia Pedro Briceño Méndez (Capitanejo), Parroquia Ramón Ignacio Méndez (Punta de Piedra), Parroquia José Ignacio del Pumar (Pedraza La Vieja)';
				return arreglo.split(',');

			case 'Obispos':
				arreglo =
					'Parroquia Obispos, Parroquia Los Guasimitos, Parroquia El Real, Parroquia La Luz';
				return arreglo.split(',');

			case 'Pedraza':
				arreglo =
					'Parroquia Ciudad Bolivia, Parroquia José Ignacio Briceño(Maporal), Parroquia José Félix Ribas(Curbatí), Parroquia Páez(San Rafael de Canaguá)';
				return arreglo.split(',');

			case 'Rojas':
				arreglo =
					'Parroquia Libertad (Capital Libertad), Parroquia Dolores (Capital Dolores), Parroquia Santa Rosa (Capital Santa Rosa), Parroquia Palacio Fajardo (Capital Mijagual), Parroquia Simón Rodríguez (Capital Arauquita)';
				return arreglo.split(',');

			case 'Sosa':
				arreglo =
					'Parroquia Ciudad de Nutrias, Parroquia El Regalo, Parroquia Puerto Nutrias, Parroquia Santa Catalina, Parroquia Simón Bolívar(El Vegón de Nutrias)';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Bolívar
	if (estado === 'Bolívar') {
		switch (municipio) {
			case 'Caroní':
				arreglo =
					'Parroquia Cachamay, Parroquia Chirica, Parroquia Dalla Costa, Parroquia Once de Abril, Parroquia Simón Bolívar, Parroquia Unare, Parroquia Universidad, Parroquia Vista al Sol, Parroquia Pozo Verde, Parroquia Yocoima, Parroquia 5 de Julio, Parroquia pto.Ordaz';
				return arreglo.split(',');

			case 'Cedeño':
				arreglo =
					'Parroquia Cedeño, Parroquia Altagracia, Parroquia Ascensión Farreras, Parroquia Guaniamo, Parroquia La Urbana, Parroquia Pijiguaos';
				return arreglo.split(',');

			case 'El Callao':
				arreglo = 'Parroquia El Callao';
				return arreglo.split(',');

			case 'Gran Sabana':
				arreglo = 'Parroquia Gran Sabana, Parroquia IkabaRú';
				return arreglo.split(',');

			case 'Heres':
				arreglo =
					'Parroquia Catedral, Parroquia Zea, Parroquia Orinoco, Parroquia José Antonio Páez, Parroquia Marhuanta, Parroquia Agua Salada, Parroquia Vista Hermosa, Parroquia La Sabanita, Parroquia Panapana';
				return arreglo.split(',');

			case 'Piar':
				arreglo = 'Parroquia Andrés Eloy Blanco, Parroquia Pedro Cova, Parroquia Upata';
				return arreglo.split(',');

			case 'Raúl Leoni':
				arreglo =
					'Parroquia Raúl Leoni, Parroquia Barceloneta, Parroquia Santa Bárbara, Parroquia San Francisco';
				return arreglo.split(',');

			case 'Roscio':
				arreglo = 'Parroquia Roscio, Parroquia Salóm';
				return arreglo.split(',');

			case 'Sifontes':
				arreglo = 'Parroquia Tumeremo, Parroquia Dalla Costa, Parroquia San Isidro';
				return arreglo.split(',');

			case 'Sucre':
				arreglo =
					'Parroquia Sucre, Parroquia Aripao, Parroquia Guarataro, Parroquia Las Majadas, Parroquia Moitaco';
				return arreglo.split(',');

			case 'Padre Pedro Chen':
				arreglo = 'Parroquia Padre Pedro Chien';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Carabobo
	if (estado === 'Carabobo') {
		switch (municipio) {
			case 'Bejuma':
				arreglo = 'Parroquia Bejuma, Parroquia Canoabo, Parroquia Simón Bolívar';
				return arreglo.split(',');

			case 'Carlos Arvelo':
				arreglo = 'Parroquia Güigüe, Parroquia Belén, Parroquia Tacarigua';
				return arreglo.split(',');

			case 'Diego Ibarra':
				arreglo = 'Parroquia Mariara, Parroquia Aguas Calientes';
				return arreglo.split(',');

			case 'Guacara':
				arreglo = 'Parroquia Ciudad Alianza, Parroquia Guacara, Parroquia Yagua';
				return arreglo.split(',');

			case 'Juan José Mora':
				arreglo = 'Parroquia Morón, Parroquia Urama';
				return arreglo.split(',');

			case 'Libertador':
				arreglo = 'Parroquia Tocuyito Valencia, Parroquia Independencia Campo Carabobo';
				return arreglo.split(',');

			case 'Los Guayos':
				arreglo = 'Parroquia Los Guayos Valencia';
				return arreglo.split(',');

			case 'Miranda':
				arreglo = 'Parroquia Miranda';
				return arreglo.split(',');

			case 'Montalbán':
				arreglo = 'Parroquia Montalbán';
				return arreglo.split(',');

			case 'Naguanagua':
				arreglo = 'Parroquia Urbana Naguanagua Valencia';
				return arreglo.split(',');

			case 'Puerto Cabello':
				arreglo =
					'Parroquia Bartolomé Salóm, Parroquia Democracia, Parroquia Fraternidad, Parroquia Goaigoaza, Parroquia Juan José Flores, Parroquia Unión, Parroquia Borburata, Parroquia Patanemo';
				return arreglo.split(',');

			case 'San Diego':
				arreglo = 'Parroquia San Diego Valencia';
				return arreglo.split(',');

			case 'San Joaquín':
				arreglo = 'Parroquia San Joaquín';
				return arreglo.split(',');

			case 'Valencia':
				arreglo =
					'Parroquia Urbana Candelaria, Parroquia Urbana Catedral, Parroquia Urbana El Socorro, Parroquia Urbana Miguel Peña, Parroquia Urbana Rafael Urdaneta, Parroquia Urbana San Blas, Parroquia Urbana San José, Parroquia Urbana Santa Rosa, Parroquia No Urbana Negro Primero';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Cojedes
	if (estado === 'Cojedes') {
		switch (municipio) {
			case 'Anzoátegui':
				arreglo = 'Parroquia Cojedes, Parroquia Juan de Mata Suárez';
				return arreglo.split(',');

			case 'Pao de San Juan Bautista':
				arreglo = 'Parroquia El Pao';
				return arreglo.split(',');

			case 'Tinaquillo':
				arreglo = 'Parroquia Tinaquillo';
				return arreglo.split(',');

			case 'Girardot':
				arreglo = 'Parroquia El Baúl, Parroquia Sucre';
				return arreglo.split(',');

			case 'Lima Blanco':
				arreglo = 'Parroquia La Aguadita, Parroquia Macapo';
				return arreglo.split(',');

			case 'Ricaurte':
				arreglo = 'Parroquia El Amparo, Parroquia Libertad de Cojedes';
				return arreglo.split(',');

			case 'Rómulo Gallegos':
				arreglo = 'Parroquia Rómulo Gallegos';
				return arreglo.split(',');

			case 'Ezequiel Zamora':
				arreglo =
					'Parroquia San Carlos de Austria, Parroquia Juan Ángel Bravo, Parroquia Manuel Manrique';
				return arreglo.split(',');

			case 'Tinaco':
				arreglo = 'Parroquia General en Jefe José Laurencio Silva';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Delta Amacuro
	if (estado === 'Delta Amacuro') {
		switch (municipio) {
			case 'Antonio Díaz':
				arreglo =
					'Parroquia Curiapo (Curiapo), Parroquia Almirante Luis Brión (Manoa), Parroquia Francisco Aniceto Lugo (Boca de Cuyubini), Parroquia Manuel Renaud (Araguabisi), Parroquia Padre Barral (San Francisco de Guayo), Parroquia Santos de Abelgas (Araguaimujo)';
				return arreglo.split(',');

			case 'Casacoima':
				arreglo =
					'Parroquia Imataca (Sierra Imataca), Parroquia Juan Bautista Arismendi (Piacoa), Parroquia Manuel Piar (El Triunfo), Parroquia Rómulo Gallegos (Santa Catalina)';
				return arreglo.split(',');

			case 'Pedernales':
				arreglo =
					'Parroquia Pedernales (Pedernales), Parroquia Luis Beltrán Prieto Figueroa (Capure)';
				return arreglo.split(',');

			case 'Tucupita':
				arreglo =
					'Parroquia San José, Parroquia José Vidal Marcano, Parroquia Leonardo Ruíz Pineda, Parroquia Mariscal Antonio José de Sucre, Parroquia Monseñor Argimiro García, Parroquia Virgen del Valle, Parroquia San Rafael, Parroquia Juan Millan';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Distrito Capital
	if (estado === 'Distrito Capital') {
		switch (municipio) {
			case 'Libertador':
				arreglo =
					'23 de enero, Altagracia, Antímano, Caricuao, Catedral, Coche, El Junquito, El Paraíso, El Recreo, El Valle, Candelaria, La Pastora, La Vega, Macarao, San Agustín, San Bernardino, San José, San Juan, San Pedro, San Rosalia, Santa Teresa, Sucre';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Falcón
	if (estado === 'Falcón') {
		switch (municipio) {
			case 'Acosta':
				arreglo =
					'Parroquia Capadare, Parroquia La Pastora, Parroquia Libertador, Parroquia San Juan de los Cayos';
				return arreglo.split(',');

			case 'Bolívar':
				arreglo = 'Parroquia Aracua, Parroquia La Peña, Parroquia San Luis';
				return arreglo.split(',');

			case 'Buchivacoa':
				arreglo =
					'Parroquia Bariro, Parroquia Borojó, Parroquia Capatárida, Parroquia Guajiro, Parroquia Seque, Parroquia Valle de Eroa, Parroquia Zazárida';
				return arreglo.split(',');

			case 'Cacique Manaure':
				arreglo = 'Parroquia Cacique Manaure (Yaracal)';
				return arreglo.split(',');

			case 'Carirubana':
				arreglo =
					'Parroquia Norte, Parroquia Carirubana, Parroquia Santa Ana, Parroquia Urbana Punta Cardón';
				return arreglo.split(',');

			case 'Colina':
				arreglo =
					'Parroquia La Vela de Coro, Parroquia Acurigua, Parroquia Guaibacoa, Parroquia Las Calderas, Parroquia Macoruca';
				return arreglo.split(',');

			case 'Dabajuro':
				arreglo = 'Parroquia Dabajuro';
				return arreglo.split(',');

			case 'Democracia':
				arreglo =
					'Parroquia Agua Clara, Parroquia Avaria, Parroquia Pedregal, Parroquia Piedra Grande, Parroquia Purureche';
				return arreglo.split(',');

			case 'Falcón':
				arreglo =
					'Parroquia Adaure, Parroquia Adícora, Parroquia Baraived, Parroquia Buena Vista, Parroquia Jadacaquiva, Parroquia El Vínculo, Parroquia El Hato, Parroquia Moruy, Parroquia Pueblo Nuevo';
				return arreglo.split(',');

			case 'Federación':
				arreglo =
					'Parroquia Agua Larga, Parroquia Churuguara, Parroquia El Paují, Parroquia Independencia, Parroquia Mapararí';
				return arreglo.split(',');

			case 'Jacura':
				arreglo = 'Parroquia Agua Linda, Parroquia Araurima, Parroquia Jacura';
				return arreglo.split(',');

			case 'Los Taques':
				arreglo = 'Parroquia Los Taques, Parroquia Judibana';
				return arreglo.split(',');

			case 'Mauroa':
				arreglo = 'Parroquia Mene de Mauroa, Parroquia San Félix, Parroquia Casigua';
				return arreglo.split(',');

			case 'Miranda':
				arreglo =
					'Parroquia Guzmán Guillermo, Parroquia Mitare, Parroquia Río Seco, Parroquia Sabaneta, Parroquia San Antonio, Parroquia San Gabriel, Parroquia Santa Ana';
				return arreglo.split(',');

			case 'Monseñor Iturriza':
				arreglo =
					'Parroquia Boca del Tocuyo, Parroquia Chichiriviche, Parroquia Tocuyo de la Costa';
				return arreglo.split(',');

			case 'Palmasola':
				arreglo = 'Parroquia Palmasola';
				return arreglo.split(',');

			case 'Petit':
				arreglo = 'Parroquia Cabure, Parroquia Colina, Parroquia Curimagua';
				return arreglo.split(',');

			case 'Píritu':
				arreglo = 'Parroquia San José de la Costa, Parroquia Píritu';
				return arreglo.split(',');

			case 'San Francisco':
				arreglo = 'Parroquia Capital San Francisco Mirimire';
				return arreglo.split(',');

			case 'Silva':
				arreglo = 'Parroquia Tucacas, Parroquia Boca de Aroa';
				return arreglo.split(',');

			case 'Sucre':
				arreglo = 'Parroquia Sucre, Parroquia Pecaya';
				return arreglo.split(',');

			case 'Tocópero':
				arreglo = 'Parroquia Tocópero';
				return arreglo.split(',');

			case 'Unión':
				arreglo =
					'Parroquia El Charal, Parroquia Las Vegas del Tuy, Parroquia Santa Cruz de Bucaral';
				return arreglo.split(',');

			case 'Urumaco':
				arreglo = 'Parroquia Bruzual, Parroquia Urumaco';
				return arreglo.split(',');

			case 'Zamora':
				arreglo =
					'Parroquia Puerto Cumarebo, Parroquia La Ciénaga, Parroquia La Soledad, Parroquia Pueblo Cumarebo, Parroquia Zazárida';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Guárico
	if (estado === 'Guárico') {
		switch (municipio) {
			case 'Camaguán':
				arreglo = 'Camaguán, Puerto Miranda, Uverito';
				return arreglo.split(',');

			case 'Chaguaramas':
				arreglo = 'Chaguaramas';
				return arreglo.split(',');

			case 'El Socorro':
				arreglo = 'El Socorro';
				return arreglo.split(',');

			case 'Francisco de Miranda':
				arreglo = 'El Calvario, El Rastro, Guardatinajas, Parroquia Capital Urbana Calabozo';
				return arreglo.split(',');

			case 'José Félix Ribas':
				arreglo = 'Tucupido, San Rafael de Laya';
				return arreglo.split(',');

			case 'José Tadeo Monagas':
				arreglo =
					'Altagracia de Orituco., San Rafael de Orituco., San Francisco Javier de Lezama., Paso Real de Macaira., Carlos Soublette., San Francisco de Macaira., Libertad de Orituco.';
				return arreglo.split(',');

			case 'Juan Germán Roscio':
				arreglo = 'Cantagallo, San Juan de Los Morros, Parapara';
				return arreglo.split(',');

			case 'Julián Mellado':
				arreglo = 'El Sombrero, Sosa';
				return arreglo.split(',');

			case 'Las Mercedes':
				arreglo = 'Parroquia Las Mercedes, Cabruta, Santa Rita de Manapire';
				return arreglo.split(',');

			case 'Leonardo Infante':
				arreglo = 'Valle de la Pascua, Espino';
				return arreglo.split(',');

			case 'Pedro Zaraza':
				arreglo = 'San José de Unare, Zaraza';
				return arreglo.split(',');

			case 'Ortíz':
				arreglo = 'San José de Tiznados, San Francisco de Tiznados, San Lorenzo de Tiznados, Ortiz';
				return arreglo.split(',');

			case 'San Gerónimo de Guayabal':
				arreglo = 'Guayabal, Cazorla';
				return arreglo.split(',');

			case 'San José de Guaribe':
				arreglo = 'San José de Guaribe';
				return arreglo.split(',');

			case 'Santa María de Ipire':
				arreglo = 'Santa María de Ipire, Parroquia Altamira';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Lara
	if (estado === 'Lara') {
		switch (municipio) {
			case 'Andrés Eloy Blanco':
				arreglo = 'Parroquia Quebrada Honda de Guache, Parroquia Pio Tamayo, Parroquia Yacambú';
				return arreglo.split(',');

			case 'Crespo':
				arreglo = 'Parroquia Freitez, Parroquia José María Blanco';
				return arreglo.split(',');

			case 'Iribarren':
				arreglo =
					'Parroquia Aguedo Felipe Alvarado, Parroquia Buena Vista, Parroquia Catedral, Parroquia Concepción, Parroquia El Cují, Parroquia Juárez, Parroquia Juan de Villegas, Parroquia Santa Rosa, Parroquia Tamaca, Parroquia Unión, Parroquia El salvador';
				return arreglo.split(',');

			case 'Jiménez':
				arreglo =
					'Parroquia Juan Bautista Rodríguez, Parroquia Cuara, Parroquia Diego de Lozada, Parroquia Paraíso de San José, Parroquia San Miguel, Parroquia Tintorero, Parroquia José Bernardo Dorante, Parroquia Coronel Mariano Peraza';
				return arreglo.split(',');

			case 'Morán':
				arreglo =
					'Parroquia Anzoátegui, Parroquia Bolívar, Parroquia Guárico, Parroquia Hilario Luna y Luna, Parroquia Humocaro Bajo, Parroquia Humocaro Alto, Parroquia La Candelaria, Parroquia Morán';
				return arreglo.split(',');

			case 'Palavecino':
				arreglo = 'Parroquia Cabudare, Parroquia José Gregorio Bastidas, Parroquia Agua Viva';
				return arreglo.split(',');

			case 'Simón Planas':
				arreglo = 'Parroquia Buría, Parroquia Gustavo Vega, Parroquia Sarare';
				return arreglo.split(',');

			case 'Torres':
				arreglo =
					'Parroquia Altagracia, Parroquia Antonio Díaz, Parroquia Camacaro, Parroquia Castañeda, Parroquia Cecilio Zubillaga, Parroquia Chiquinquira, Parroquia El Blanco, Parroquia Espinoza de los Monteros, Parroquia Heriberto Arrollo, Parroquia Lara, Parroquia Las Mercedes, Parroquia Manuel Morillo, Parroquia Montaña Verde, Parroquia Montes de Oca, Parroquia Reyes de Vargas, Parroquia Torres, Parroquia Trinidad Samuel';
				return arreglo.split(',');

			case 'Urdaneta':
				arreglo =
					'Parroquia Xaguas, Parroquia Siquisique, Parroquia San Miguel, Parroquia Moroturo';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Mérida
	if (estado === 'Mérida') {
		switch (municipio) {
			case 'Alberto Adriani':
				arreglo =
					'Parroquia Presidente Betancourt (El Vigía), Parroquia Presidente Páez (El Vigía), Parroquia Presidente Rómulo Gallegos (El Vigía), Parroquia Gabriel Picón González (La Palmita), Parroquia Héctor Amable Mora (Mucujepe), Parroquia José Nucete Sardi (Los Naranjos), Parroquia Pulido Méndez (La Blanca)';
				return arreglo.split(',');

			case 'Andrés Bello':
				arreglo = 'Parroquia La Azulita';
				return arreglo.split(',');

			case 'Antonio Pinto Salinas':
				arreglo =
					'Parroquia Santa Cruz de Mora, Parroquia Mesa Bolívar (Mesa Bolívar), Parroquia Mesa de Las Palmas (Mesa de Las Palmas)';
				return arreglo.split(',');

			case 'Aricagua':
				arreglo = 'Parroquia Aricagua (Aricagua), Parroquia San Antonio (Campo Elías)';
				return arreglo.split(',');

			case 'Arzobispo Chacón':
				arreglo =
					'Parroquia Canagua, Parroquia Capurí (Capurí), Parroquia Chacantá (Chacantá), Parroquia El Molino (El Molino), Parroquia Guaimaral (El Viento), Parroquia Mucutuy (Mucutuy), Parroquia Mucuchachí';
				return arreglo.split(',');

			case 'Campo Elías':
				arreglo =
					'Parroquia Fernández Peña (Ejido), Parroquia Matriz (Ejido), Parroquia Montalbán (Ejido), Parroquia Acequias, Parroquia Jají, Parroquia La Mesa (La Mesa), Parroquia San José del Sur (San José)';
				return arreglo.split(',');

			case 'Caracciolo Parra Olmedo':
				arreglo = 'Parroquia Tucaní (Tucaní), Parroquia Florencio Ramírez (El Pinar)';
				return arreglo.split(',');

			case 'Cardenal Quintero':
				arreglo = 'Parroquia Santo Domingo, Parroquia Las Piedras (Las Piedras)';
				return arreglo.split(',');

			case 'Guaraque':
				arreglo =
					'Parroquia Guaraque (Guaraque), Parroquia Mesa de Quintero (Mesa de Quintero), Parroquia Río Negro (Río Negro)';
				return arreglo.split(',');

			case 'Julio César Salas':
				arreglo = 'Parroquia Arapuey (Arapuey), Parroquia Palmira (San José de Palmira';
				return arreglo.split(',');

			case 'Justo Briceño':
				arreglo =
					'Parroquia San Cristóbal de Torondoy (San Cristóbal de Torondoy), Parroquia Torondoy';
				return arreglo.split(',');

			case 'Libertador':
				arreglo =
					'Parroquia Antonio Spinetti Dini (Mérida), Parroquia Arias (Mérida), Parroquia Caracciolo Parra Pérez (Mérida), Parroquia Domingo Peña (Mérida), Parroquia El Llano (Mérida), Parroquia Gonzalo Picón Febres (Mérida), Parroquia Jacinto Plaza (Mérida), Parroquia Juan Rodríguez Suárez (Mérida), Parroquia Lasso de la Vega (Mérida), Parroquia Mariano Picón Salas (Mérida), Parroquia Milla (Mérida), Parroquia Osuna Rodríguez (Mérida), Parroquia Sagrario (Mérida), Parroquia El Morro, Parroquia Los Nevados';
				return arreglo.split(',');

			case 'Miranda':
				arreglo =
					'Parroquia Andrés Eloy Blanco, Parroquia La Venta (La Venta), Parroquia Piñango, Parroquia Timotes';
				return arreglo.split(',');

			case 'Obispo Ramos de Lora':
				arreglo =
					'Parroquia Eloy Paredes (Guayabones), Parroquia San Rafael de Alcázar (San Rafael de Alcázar), Parroquia Santa Elena de Arenales';
				return arreglo.split(',');

			case 'Padre Norega':
				arreglo = 'Parroquia Santa María de Caparo (Santa María de Caparo)';
				return arreglo.split(',');

			case 'Pueblo Llano':
				arreglo = 'Parroquia Pueblo Llano';
				return arreglo.split(',');

			case 'Rangel':
				arreglo =
					'Parroquia Cacute (Cacute), Parroquia La Toma (La Toma), Parroquia Mucuchíes, Parroquia Mucurubá (Mucurubá), Parroquia San Rafael';
				return arreglo.split(',');

			case 'Rivas Dávila':
				arreglo = 'Parroquia Gerónimo Maldonado, Parroquia Bailadores';
				return arreglo.split(',');

			case 'Santos Marquina':
				arreglo = 'Parroquia Tabay';
				return arreglo.split(',');

			case 'Sucre':
				arreglo =
					'Parroquia Chiguará, Parroquia Estánques (Estánques), Parroquia Lagunillas, Parroquia La Trampa (La Trampa), Parroquia Pueblo Nuevo del Sur (Pueblo Nuevo del Sur), Parroquia San Juan';
				return arreglo.split(',');

			case 'Tovar':
				arreglo =
					'Parroquia El Amparo (Tovar), Parroquia El Llano (Tovar), San Francisco (Tovar), Parroquia Tovar (Tovar)';
				return arreglo.split(',');

			case 'Tulio Febres Cordero':
				arreglo =
					'Parroquia Independencia (Palmarito), Parroquia María de la Concepción Palacios Blanco (Las Virtudes), Parroquia Nueva Bolivia, Parroquia Santa Apolonia';
				return arreglo.split(',');

			case 'Zea':
				arreglo = 'Parroquia Caño El Tigre (Caño Tigre), Parroquia Zea';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Miranda
	if (estado === 'Miranda') {
		switch (municipio) {
			case 'Acevedo':
				arreglo =
					'Aragüita, Arévalo González,, Capaya, Caucagua, Panaquire, Ribas, El Café, Marizapa';
				return arreglo.split(',');

			case 'Andrés Bello':
				arreglo = 'Parroquia Cumbo, Parroquia San José de Barlovento';
				return arreglo.split(',');

			case 'Baruta':
				arreglo =
					'Parroquia El Cafetal Área metropolitana de Caracas, Parroquia Las Minas Área metropolitana de Caracas';
				return arreglo.split(',');

			case 'Brión':
				arreglo = 'Higuerote, Curiepe, Tacarigua de Brión';
				return arreglo.split(',');

			case 'Buroz':
				arreglo = 'Parroquia Mamporal';
				return arreglo.split(',');

			case 'Carrizal':
				arreglo = 'Parroquia Carrizal Área metropolitana de Caracas';
				return arreglo.split(',');

			case 'Chacao':
				arreglo = 'Parroquia Chacao Área Metropolitana de Caracas';
				return arreglo.split(',');

			case 'Cristóbal Rojas':
				arreglo = 'Parroquia Charallave, Parroquia Las Brisas';
				return arreglo.split(',');

			case 'El Hatillo':
				arreglo = 'Parroquia Santa Rosalía de Palermo de El Hatillo Área metropolitana de Caracas';
				return arreglo.split(',');

			case 'Guaicaipuro':
				arreglo =
					'Parroquia Altagracia de la Montaña, Parroquia Cecilio Acosta Área metropolitana de Caracas, Parroquia Los Teques, Parroquia El Jarillo., Parroquia San Pedro., Parroquia Tácata., Parroquia Paracotos.';
				return arreglo.split(',');

			case 'Independencia':
				arreglo = 'Parroquia Cartanal, Parroquia Santa Teresa del Tuy';
				return arreglo.split(',');

			case 'Lander':
				arreglo = 'Parroquia La Democracia, Parroquia Ocumare del Tuy, Parroquia Santa Bárbara';
				return arreglo.split(',');

			case 'Los Salias':
				arreglo = 'Parroquia San Antonio de los Altos Área metropolitana de Caracas';
				return arreglo.split(',');

			case 'Páez':
				arreglo =
					'Parroquia Río Chico, Parroquia El Guapo, Parroquia Tacarigua de la Laguna, Parroquia Paparo, Parroquia San Fernando del Guapo';
				return arreglo.split(',');

			case 'Paz Castillo':
				arreglo = 'Parroquia Santa Lucía del Tuy';
				return arreglo.split(',');

			case 'Pedro Gual':
				arreglo = 'Parroquia Cúpira, Parroquia Machurucuto';
				return arreglo.split(',');

			case 'Plaza':
				arreglo = 'Parroquia Guarenas';
				return arreglo.split(',');

			case 'Simón Bolívar':
				arreglo = 'Parroquia San Antonio de Yare, Parroquia San Francisco de Yare';
				return arreglo.split(',');

			case 'Sucre':
				arreglo =
					'Parroquia Leoncio Martínez Área metropolitana de Caracas, Parroquia Caucagüita Área metropolitana de Caracas, Parroquia Filas de Mariche Área metropolitana de Caracas, Parroquia La Dolorita Área metropolitana de Caracas, Parroquia Petare Área metropolitana de Caracas';
				return arreglo.split(',');

			case 'Urdaneta':
				arreglo = 'Parroquia Cúa, Parroquia Nueva Cúa';
				return arreglo.split(',');

			case 'Zamora':
				arreglo = 'Parroquia Guatire, Parroquia Bolívar';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Monagas
	if (estado === 'Monagas') {
		switch (municipio) {
			case 'Acosta':
				arreglo = 'Parroquia San Antonio de Maturín, Parroquia San Francisco de Maturín';
				return arreglo.split(',');

			case 'Aguasay':
				arreglo = 'Parroquia Aguasay';
				return arreglo.split(',');

			case 'Bolívar':
				arreglo = 'Parroquia Caripito';
				return arreglo.split(',');

			case 'Caripe':
				arreglo =
					'Parroquia El Guácharo, Parroquia La Guanota, Parroquia Sabana de Piedra, Parroquia San Agustín, Parroquia Teresen, Parroquia Caripe';
				return arreglo.split(',');

			case 'Cedeño':
				arreglo =
					'Parroquia Areo, Parroquia Capital Cedeño, Parroquia San Félix de Cantalicio, Parroquia Viento Fresco';
				return arreglo.split(',');

			case 'Ezequiel Zamora':
				arreglo = 'Parroquia El Tejero, Parroquia Punta de Mata';
				return arreglo.split(',');

			case 'Libertador':
				arreglo =
					'Parroquia Chaguaramas, Parroquia Las Alhuacas, Parroquia Tabasca, Parroquia Temblador';
				return arreglo.split(',');

			case 'Maturín':
				arreglo =
					'Parroquia Alto de los Godos, Parroquia Boquerón, Parroquia Las Cocuizas, Parroquia La Cruz, Parroquia San Simón, Parroquia El Corozo, Parroquia El Furrial, Parroquia Jusepín, Parroquia La Pica, Parroquia San Vicente';
				return arreglo.split(',');

			case 'Piar':
				arreglo =
					'Parroquia Aparicio, Parroquia Aragua de Maturín, Parroquia Chaguaramal, Parroquia El Pinto, Parroquia Guanaguana, Parroquia La Toscana, Parroquia Taguaya';
				return arreglo.split(',');

			case 'Punceres':
				arreglo = 'Parroquia Cachipo, Parroquia Quiriquire';
				return arreglo.split(',');

			case 'Santa Bárbara':
				arreglo = 'Parroquia Santa Bárbara, Parroquia Morón';
				return arreglo.split(',');

			case 'Sotillo':
				arreglo = 'Parroquia Barrancas, Parroquia Los Barrancos de Fajardo';
				return arreglo.split(',');

			case 'Uracoa':
				arreglo = 'Parroquia Uracoa';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Nueva Esparta
	if (estado === 'Nueva Esparta') {
		switch (municipio) {
			case 'Antolín del Campo':
				arreglo = 'Parroquia Antolín del Campo';
				return arreglo.split(',');

			case 'Arismendi':
				arreglo = 'Parroquia Arismendi';
				return arreglo.split(',');

			case 'Díaz':
				arreglo = 'Parroquia San Juan Bautista, Parroquia Zabala';
				return arreglo.split(',');

			case 'García':
				arreglo = 'Parroquia García​, Parroquia Francisco Fajardo';
				return arreglo.split(',');

			case 'Gómez':
				arreglo =
					'Parroquia Bolívar, Parroquia Guevara, Parroquia Cerro de Matasiete, Parroquia Santa Ana, Parroquia Sucre';
				return arreglo.split(',');

			case 'Maneiro':
				arreglo = 'Parroquia Aguirre, Parroquia Maneiro​';
				return arreglo.split(',');

			case 'Marcano':
				arreglo = 'Parroquia Adrián, Parroquia Juan Griego​';
				return arreglo.split(',');

			case 'Mariño':
				arreglo = 'Parroquia mariño';
				return arreglo.split(',');

			case 'Península de Macanao':
				arreglo = 'Parroquia San Francisco de Macanao, Parroquia Boca de Río​';
				return arreglo.split(',');

			case 'Tubores':
				arreglo = 'Parroquia Tubores, Parroquia Los Barales​';
				return arreglo.split(',');

			case 'Villalba':
				arreglo = 'Parroquia Vicente Fuentes, Parroquia Villalba';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Portuguesa
	if (estado === 'Portuguesa') {
		switch (municipio) {
			case 'Araure':
				arreglo = 'Parroquia Araure, Parroquia Río Acarigua';
				return arreglo.split(',');

			case 'Agua Blanca':
				arreglo = 'Parroquia Agua Blanca';
				return arreglo.split(',');

			case 'Esteller':
				arreglo = 'Parroquia Píritu, Parroquia Uveral';
				return arreglo.split(',');

			case 'Guanare':
				arreglo =
					'Parroquia Cordova, Parroquia Guanare, Parroquia San José de la Montaña, Parroquia San Juan de Guanaguanare, Parroquia Virgen de Coromoto';
				return arreglo.split(',');

			case 'Guanarito':
				arreglo = 'Parroquia Guanarito, Parroquia Trinidad de la Capilla, Parroquia Divina Pastora';
				return arreglo.split(',');

			case 'Monseñor José Vicente de Unda':
				arreglo = 'Parroquia Peña Blanca';
				return arreglo.split(',');

			case 'Ospino':
				arreglo = 'Parroquia Aparición, Parroquia La Estación, Parroquia Ospino';
				return arreglo.split(',');

			case 'Páez':
				arreglo =
					'Parroquia Acarigua, Parroquia Payara, Parroquia Pimpinela, Parroquia Ramón Peraza';
				return arreglo.split(',');

			case 'Papelón':
				arreglo = 'Parroquia Caño Delgadito, Parroquia Papelón';
				return arreglo.split(',');

			case 'San Genaro de Boconoíto':
				arreglo = 'Parroquia Antolín Tovar Anquino, Parroquia Boconoíto';
				return arreglo.split(',');

			case 'San Rafael de Onoto':
				arreglo = 'Parroquia Santa Fé, Parroquia San Rafael de Onoto, Parroquia Thermo Morales';
				return arreglo.split(',');

			case 'Santa Rosalía':
				arreglo = 'Parroquia Florida, Parroquia El Playón';
				return arreglo.split(',');

			case 'Sucre':
				arreglo =
					'Parroquia Biscucuy, Parroquia Concepción, Parroquia San José de Saguaz, Parroquia San Rafael de Palo Alzado, Parroquia Uvencio Antonio Velásquez, Parroquia Villa Rosa';
				return arreglo.split(',');

			case 'Turén':
				arreglo =
					'Parroquia Villa Bruzual, Parroquia Canelones, Parroquia Santa Cruz, Parroquia San Isidro Labrador';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Sucre
	if (estado === 'Sucre') {
		switch (municipio) {
			case 'Andrés Eloy Blanco':
				arreglo = 'Parroquia Mariño, Parroquia Rómulo Gallegos';
				return arreglo.split(',');

			case 'Andrés Mata':
				arreglo = 'Parroquia San José de Areocuar, Parroquia Tavera Acosta';
				return arreglo.split(',');

			case 'Arismendi':
				arreglo =
					'Parroquia Río Caribe, Parroquia Antonio José de Sucre, Parroquia El Morro de Puerto Santo, Parroquia Puerto Santo, Parroquia San Juan de las Galdonas';
				return arreglo.split(',');

			case 'Benítez':
				arreglo =
					'Parroquia El Pilar, Parroquia El Rincón, Parroquia General Francisco Antonio Vázquez, Parroquia Guaraúnos, Parroquia Tunapuicito, Parroquia Unión';
				return arreglo.split(',');

			case 'Bermúdez':
				arreglo =
					'Parroquia Santa Catalina, Parroquia Santa Rosa, Parroquia Santa Teresa, Parroquia Bolívar, Parroquia Maracapana';
				return arreglo.split(',');

			case 'Bolívar':
				arreglo = 'Parroquia Marigüitar';
				return arreglo.split(',');

			case 'Cajigal':
				arreglo = 'Parroquia Libertad, Parroquia El Paujil, Parroquia Yaguaraparo';
				return arreglo.split(',');

			case 'Cruz Salmerón Acosta':
				arreglo = 'Parroquia Araya, Parroquia Chacopata, Parroquia Manicuare';
				return arreglo.split(',');

			case 'Libertador':
				arreglo = 'Parroquia Tunapuy, Parroquia Campo Elías';
				return arreglo.split(',');

			case 'Mariño':
				arreglo =
					'Parroquia Irapa, Parroquia Campo Claro, Parroquia Marabal, Parroquia San Antonio de Irapa, Parroquia Soro';
				return arreglo.split(',');

			case 'Mejía':
				arreglo = 'Parroquia San Antonio del Golfo';
				return arreglo.split(',');

			case 'Montes':
				arreglo =
					'Parroquia Cumanacoa, Parroquia Arenas, Parroquia Aricagua, Parroquia Cocollar, Parroquia San Fernando, Parroquia San Lorenzo';
				return arreglo.split(',');

			case 'Ribero':
				arreglo =
					'Parroquia Cariaco, Parroquia Catuaro, Parroquia Rendón, Parroquia Santa Cruz, Parroquia Santa María';
				return arreglo.split(',');

			case 'Sucre':
				arreglo =
					'Parroquia Altagracia Cumaná, Parroquia Santa Inés Cumaná, Parroquia Valentín Valiente Cumaná, Parroquia Ayacucho Cumaná, Parroquia San Juan, Parroquia Raúl Leoni, Parroquia Gran Mariscal';
				return arreglo.split(',');

			case 'Valdez':
				arreglo =
					'Parroquia Cristóbal Colón, Parroquia Bideau, Parroquia Punta de Piedras, Parroquia Güiria';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Tachira
	if (estado === 'Tachira') {
		switch (municipio) {
			case 'Andrés Bello':
				arreglo = 'Cordero';
				return arreglo.split(',');

			case 'Antonio Rómulo Costa':
				arreglo = 'Las Mesas';
				return arreglo.split(',');

			case 'Ayacucho':
				arreglo = 'Parroquia Ayacucho, Parroquia Rivas Berti, Parroquia San Pedro del Río';
				return arreglo.split(',');

			case 'Bolívar':
				arreglo =
					'Parroquia Bolívar, Parroquia Palotal, Parroquia General Juan Vicente Gómez, Parroquia Isaías Medina Angarita';
				return arreglo.split(',');

			case 'Cárdenas':
				arreglo = 'Parroquia Cárdenas, Parroquia Amenodoro Ángel Lamus, Parroquia La Florida';
				return arreglo.split(',');

			case 'Córdoba':
				arreglo = 'Parroquia Córdoba';
				return arreglo.split(',');

			case 'Fernández Feo':
				arreglo = 'Parroquia Fernández Feo, Parroquia Alberto Adriani, Parroquia Santo Domingo';
				return arreglo.split(',');

			case 'Francisco de Miranda':
				arreglo = 'Parroquia Francisco de Miranda';
				return arreglo.split(',');

			case 'García de Hevia':
				arreglo = 'Parroquia García de Hevia, Parroquia Boca de Grita, Parroquia José Antonio Páez';
				return arreglo.split(',');

			case 'Guásimos':
				arreglo = 'Parroquia Guásimos';
				return arreglo.split(',');

			case 'Independencia':
				arreglo = 'Parroquia Independencia, Parroquia Juan Germán Roscio, Parroquia Román Cárdenas';
				return arreglo.split(',');

			case 'Jáuregui':
				arreglo =
					'Parroquia Jáuregui, Parroquia Emilio Constantino Guerrero, Parroquia Monseñor Miguel Antonio Salas';
				return arreglo.split(',');

			case 'José María Vargas':
				arreglo = 'Parroquia José María Vargas';
				return arreglo.split(',');

			case 'Junín':
				arreglo = 'Parroquia Junín, Parroquia La Petrólea, Parroquia Quinimarí, Parroquia Bramón';
				return arreglo.split(',');

			case 'Libertad':
				arreglo = 'Parroquia Libertad, Parroquia Cipriano Castro, Parroquia Manuel Felipe Rugeles';
				return arreglo.split(',');

			case 'Libertador':
				arreglo =
					'Parroquia Capital Libertador, Parroquia Doradas, Parroquia Emeterio Ochoa, Parroquia San Joaquín de Navay';
				return arreglo.split(',');

			case 'Lobatera':
				arreglo = 'Parroquia Lobatera, Parroquia Constitución';
				return arreglo.split(',');

			case 'Michelena':
				arreglo = 'Parroquia Michelena';
				return arreglo.split(',');

			case 'Panamericano':
				arreglo = 'Parroquia Panamericano, Parroquia La Palmita';
				return arreglo.split(',');

			case 'Pedro María Ureña':
				arreglo = 'Parroquia Pedro María Ureña, Parroquia Nueva Arcadia';
				return arreglo.split(',');

			case 'Rafael Urdaneta':
				arreglo = 'Parroquia Delicias, Parroquia Pecaya';
				return arreglo.split(',');

			case 'Samuel Darío Maldonado':
				arreglo = 'Parroquia Samuel Darío Maldonado, Parroquia Boconó, Parroquia Hernández';
				return arreglo.split(',');

			case 'San Cristóbal':
				arreglo =
					'Parroquia La Concordia, Parroquia San Juan Bautista, Parroquia Pedro María Morantes, Parroquia San Sebastián, Parroquia Dr. Francisco Romero Lobo';
				return arreglo.split(',');

			case 'Seboruco':
				arreglo = 'Parroquia Seboruco';
				return arreglo.split(',');

			case 'Simón Rodríguez':
				arreglo = 'Parroquia Simón Rodríguez';
				return arreglo.split(',');

			case 'Sucre':
				arreglo = 'Parroquia Sucre, Parroquia Eleazar López Contreras, Parroquia San Pablo';
				return arreglo.split(',');

			case 'Torbes':
				arreglo = 'Parroquia Torbes';
				return arreglo.split(',');

			case 'Uribante':
				arreglo =
					'Parroquia Uribante, Parroquia Cárdenas, Parroquia Juan Pablo Peñalosa, Parroquia Potosí';
				return arreglo.split(',');

			case 'San Judas Tadeo':
				arreglo = 'Parroquia San Judas Tadeo';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Trujillo
	if (estado === 'Trujillo') {
		switch (municipio) {
			case 'Andrés Bello':
				arreglo =
					'Parroquia Araguaney, Parroquia El Jaguito, Parroquia La Esperanza, Parroquia Santa Isabel';
				return arreglo.split(',');

			case 'Boconó':
				arreglo =
					'Parroquia Boconó, Parroquia El Carmen, Parroquia Mosquey, Parroquia Ayacucho, Parroquia Burbusay, Parroquia General Ribas, Parroquia Guaramacal, Parroquia Vega De Guaramacal, Parroquia Monseñor Jáuregui, Parroquia Rafael Rangel, Parroquia San Miguel, Parroquia San José';
				return arreglo.split(',');

			case 'Bolívar':
				arreglo = 'Parroquia Sabana Grande, Parroquia Cheregüé, Parroquia Granados';
				return arreglo.split(',');

			case 'Candelaria':
				arreglo =
					'Parroquia Arnaldo Gabaldón, Parroquia Bolivia, Parroquia Carrillo, Parroquia Cegarra, Parroquia Chejendé, Parroquia Manuel Salvador Ulloa, Parroquia San José';
				return arreglo.split(',');

			case 'Carache':
				arreglo =
					'Parroquia Carache, Parroquia La Concepción, Cuicas, Parroquia Panamericana, Parroquia Santa cruz';
				return arreglo.split(',');

			case 'Escuque':
				arreglo =
					'Parroquia Escuque, Parroquia La Unión (El Alto Escuque), Parroquia Santa Rita, Parroquia Sabana Libre';
				return arreglo.split(',');

			case 'José Felipe Márquez Cañizalez':
				arreglo = 'Parroquia El Socorro, Parroquia Los Caprichos, Parroquia Antonio José de Sucre';
				return arreglo.split(',');

			case 'Juan Vicente Campos Elías':
				arreglo = 'Parroquia Campo Elías, Parroquia Arnoldo Gabaldón';
				return arreglo.split(',');

			case 'La Ceiba':
				arreglo =
					'Parroquia Santa Apolonia, Parroquia El Progreso, Parroquia La Ceiba, Parroquia Tres de Febrero';
				return arreglo.split(',');

			case 'Miranda':
				arreglo =
					'Parroquia El Dividive, Parroquia Agua Santa, Parroquia Agua Caliente, Parroquia El Cenizo, Parroquia Valerita, El Salto';
				return arreglo.split(',');

			case 'Monte Carmelo':
				arreglo =
					'Parroquia Monte Carmelo, Parroquia Buena Vista, Parroquia Santa María del Horcón';
				return arreglo.split(',');

			case 'Motatán':
				arreglo = 'Parroquia Motatán, Parroquia El Baño, Parroquia Jalisco';
				return arreglo.split(',');

			case 'Pampán':
				arreglo =
					'Parroquia Pampán, Parroquia Flor de Patria, Parroquia La Paz, Parroquia Santa Ana';
				return arreglo.split(',');

			case 'Pampanito':
				arreglo = 'Parroquia Pampanito, Parroquia La Concepción, Parroquia Pampanito II';
				return arreglo.split(',');

			case 'Rafael Rangel':
				arreglo =
					'Parroquia Betijoque, Parroquia José Gregorio Hernández, Parroquia La Pueblita, Parroquia Los Cedros';
				return arreglo.split(',');

			case 'San Rafael de Carvajal':
				arreglo =
					'Parroquia Carvajal, Parroquia Campo Alegre, Parroquia Antonio Nicolás Briceño, Parroquia José Leonardo Suárez';
				return arreglo.split(',');

			case 'Sucre':
				arreglo =
					'Parroquia Sabana de Mendoza, Parroquia Junín, Parroquia Valmore Rodríguez, Parroquia El Paraíso';
				return arreglo.split(',');

			case 'Trujillo':
				arreglo =
					'Parroquia Andrés Linares, Parroquia Chiquinquirá, Parroquia Cristóbal Mendoza, Parroquia Cruz Carrillo, Parroquia Matriz, Parroquia Monseñor Carrillo, Parroquia Tres Esquinas';
				return arreglo.split(',');

			case 'Urdaneta':
				arreglo =
					'Parroquia Cabimbú, Parroquia Jajó, Parroquia La Mesa de Esnujaque, Parroquia Santiago, Parroquia Tuñame, Parroquia La Quebrada';
				return arreglo.split(',');

			case 'Valera':
				arreglo =
					'Parroquia Juan Ignacio Montilla, Parroquia La Beatriz, Parroquia La Puerta, Parroquia Mendoza del Valle de Momboy, Parroquia Mercedes Díaz, Parroquia San Luis';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Vargas
	if (estado === 'Vargas') {
		switch (municipio) {
			case 'Vargas':
				arreglo =
					'Caraballeda, Carayaca, Carlos Soublette, Caruao, Catia La Mar, El Junko, La Guaira, Macuto, Maiquetía, Naiguatá, Urimare';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Yaracuy
	if (estado === 'Yaracuy') {
		switch (municipio) {
			case 'Arístides Bastidas':
				arreglo = 'Parroquia Arístides Bastidas';
				return arreglo.split(',');

			case 'Bolívar':
				arreglo = 'Parroquia Bolívar';
				return arreglo.split(',');

			case 'Bruzual':
				arreglo = 'Parroquia Chivacoa, Parroquia Campo Elías';
				return arreglo.split(',');

			case 'Cocorote':
				arreglo = 'Parroquia Cocorote';
				return arreglo.split(',');

			case 'Independencia':
				arreglo = 'Parroquia Independencia';
				return arreglo.split(',');

			case 'José Antonio Páez':
				arreglo = 'Parroquia José Antonio Páez';
				return arreglo.split(',');

			case 'La Trinidad':
				arreglo = 'Parroquia La Trinidad';
				return arreglo.split(',');

			case 'Manuel Monge':
				arreglo = 'Parroquia Manuel Monge';
				return arreglo.split(',');

			case 'Nirgua':
				arreglo = 'Parroquia Salóm, Parroquia Temerla, Parroquia Nirgua';
				return arreglo.split(',');

			case 'Peña':
				arreglo = 'Parroquia San Andrés, Parroquia Yaritagua';
				return arreglo.split(',');

			case 'San Felipe':
				arreglo = 'Parroquia San Javier, Parroquia Albarico, Parroquia San Felipe';
				return arreglo.split(',');

			case 'Sucre':
				arreglo = 'Parroquia Sucre';
				return arreglo.split(',');

			case 'Urachiche':
				arreglo = 'Parroquia Urachiche';
				return arreglo.split(',');

			case 'Veroes':
				arreglo = 'Parroquia El Guayabo, Parroquia Farriar';
				return arreglo.split(',');

			default:
				break;
		}
	}

	// Zulia
	if (estado === 'Zulia') {
		switch (municipio) {
			case 'Almirante Padilla':
				arreglo = 'Parroquia Isla de Toas, Parroquia Monagas, Parroquia San Fernando';
				return arreglo.split(',');

			case 'Baralt':
				arreglo =
					'Parroquia San Timoteo, Parroquia General Urdaneta, Parroquia Libertador, Parroquia Marcelino Briceño, Parroquia Nuevo, Parroquia Manuel Guanipa Matos';
				return arreglo.split(',');

			case 'Cabimas':
				arreglo =
					'Parroquia Ambrosio, Parroquia Carmen Herrera, Parroquia La Rosa, Parroquia Germán Ríos Linares, Parroquia San Benito, Parroquia Rómulo Betancourt, Parroquia Jorge Hernández, Parroquia Punta Gorda, Parroquia Arístides Calvani';
				return arreglo.split(',');

			case 'Catatumbo':
				arreglo = 'Parroquia Encontrados, Parroquia Udón Pérez';
				return arreglo.split(',');

			case 'Colón':
				arreglo =
					'Parroquia Moralito, Parroquia capital San Carlos del Zulia, Parroquia Santa Cruz del Zulia, Parroquia Santa Bárbara, Parroquia Urribarrí';
				return arreglo.split(',');

			case 'Francisco Javier Pulgar':
				arreglo =
					'Parroquia Carlos Quevedo, Parroquia Francisco Javier Pulgar, Parroquia Simón Rodríguez, Parroquia Guamo-Gavilanes';
				return arreglo.split(',');

			case 'Jesús Enrique Losada':
				arreglo = 'La Concepción (capital), San José, Mariano Parra León, José Ramón Yépez';
				return arreglo.split(',');

			case 'Jesús María Semprún':
				arreglo = 'Parroquia Jesús María Semprún, Parroquia Barí';
				return arreglo.split(',');

			case 'La Cañada de Urdaneta':
				arreglo = 'Concepción, Andrés Bello, Chiquinquirá, El Carmelo, Potreritos';
				return arreglo.split(',');

			case 'Lagunillas':
				arreglo =
					'Parroquia Libertad, Parroquia Alonso de Ojeda, Parroquia Venezuela, Parroquia Eleazar López Contreras, Parroquia Campo Lara';
				return arreglo.split(',');

			case 'Machiques de Perijá':
				arreglo =
					'Parroquia Bartolomé de las Casas, Parroquia Libertad, Parroquia Río Negro, Parroquia San José de Perijá';
				return arreglo.split(',');

			case 'Mara':
				arreglo =
					'Parroquia San Rafael, Parroquia La Sierrita, Parroquia Las Parcelas, Parroquia Luis De Vicente, Parroquia Monseñor Marcos Sergio Godoy, Parroquia Ricaurte, Parroquia Tamare';
				return arreglo.split(',');

			case 'Maracaibo':
				arreglo =
					'Parroquia Antonio Borjas Romero, Parroquia Bolívar, Parroquia Cacique Mara, Parroquia Carracciolo Parra Pérez, Parroquia Cecilio Acosta, Parroquia Cristo de Aranza, Parroquia Coquivacoa, Parroquia Chiquinquirá, Parroquia Francisco Eugenio Bustamante, Parroquia Idelfonzo Vásquez, Parroquia Juana de Ávila, Parroquia Luis Hurtado Higuera, Parroquia Manuel Dagnino, Parroquia Olegario Villalobos, Parroquia Raúl Leoni, Parroquia Santa Lucía, Parroquia San Isidro, Parroquia Venancio Pulgar';
				return arreglo.split(',');

			case 'Miranda':
				arreglo =
					'Parroquia Altagracia, Parroquia Faría, Parroquia Ana María Campos, Parroquia San Antonio, Parroquia San José';
				return arreglo.split(',');

			case 'Guajira':
				arreglo =
					'Parroquia Sinamaica, Parroquia Alta Guajira, Parroquia Elías Sánchez Rubio, Parroquia Guajira';
				return arreglo.split(',');

			case 'Rosario de Perijá':
				arreglo = 'Parroquia Donaldo García, Parroquia El Rosario, Parroquia Sixto Zambrano';
				return arreglo.split(',');

			case 'San Francisco':
				arreglo =
					'Parroquia San Francisco, Parroquia El Bajo, Parroquia Domitila Flores, Parroquia Francisco Ochoa, Parroquia Los Cortijos, Parroquia Marcial Hernández, Parroquia José Domingo Rus';
				return arreglo.split(',');

			case 'Santa Rita':
				arreglo =
					'Parroquia Santa Rita, Parroquia El Mene, Parroquia Pedro Lucas Urribarrí, Parroquia José Cenobio Urribarrí';
				return arreglo.split(',');

			case 'Simón Bolívar':
				arreglo =
					'Parroquia Rafael Maria Baralt, Parroquia Manuel Manrique, Parroquia Rafael Urdaneta';
				return arreglo.split(',');

			case 'Sucre':
				arreglo =
					'Parroquia Bobures, Parroquia Gibraltar, Parroquia Heras, Parroquia Monseñor Arturo Álvarez, Parroquia Rómulo Gallegos, Parroquia El Batey';
				return arreglo.split(',');

			case 'Valmore Rodríguez':
				arreglo = 'Parroquia Rafael Urdaneta, Parroquia La Victoria, Parroquia Raúl Cuenca';
				return arreglo.split(',');

			default:
				break;
		}
	}
};