export default function clearAllData() {
	//Limpiar toda la data para solventar errores.
	const theme = localStorage.getItem('theme');
	//Verifivar que la lista no devuelva null
	const dialogList =
		JSON.parse(localStorage.getItem('notSeeInfoDialog')) !== null ? localStorage.getItem('notSeeInfoDialog') : '[]';

	localStorage.clear();
	sessionStorage.clear();

	//Para mantener la configuraciรณn del usuario.
	localStorage.setItem('theme', theme);
	localStorage.setItem('notSeeInfoDialog', dialogList);
}