const downloadFiles = (response, fileName, fileExtension) => {
	//Url del archivo
	const url = window.URL.createObjectURL(new Blob([response]));
	//Elemento Link
	const link = document.createElement('a');
	//Linkear url
	link.href = url;
	//Atributos,
	link.setAttribute('download', `${fileName}.${fileExtension}`);
	//Insertar elemento
	document.body.appendChild(link);
	//Descargar
	link.click();
}

export const downloadFilesNotResponse = (url) => {
	//Elemento Link
	const link = document.createElement('a');
	//Linkear url
	link.href = url;
	//Obtener nombre del archivo
	let fileName = url.split('/');
	fileName = fileName[fileName.length - 1];
	//Atributos,
	link.setAttribute('download', `${fileName}`);
	//Insertar elemento
	document.body.appendChild(link);
	//Descargar
	link.click();
}

export default downloadFiles;