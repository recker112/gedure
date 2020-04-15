export default function clearAllData() {
	console.log('DAtoS lIMPiADOS BRO');
	//Limpiar toda la data para solventar errores.
	const theme = localStorage.getItem('theme');
	//Verifivar que la lista no devuelva null
	const dialogList =
		localStorage.getItem('noListStorage') !== null ? localStorage.getItem('noListStorage') : '[]';

	localStorage.clear();
	sessionStorage.clear();

	//Para mantener la configuración del usuario.
	localStorage.setItem('theme', theme);
	localStorage.setItem('noListStorage', dialogList);
}