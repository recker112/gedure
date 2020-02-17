function ConverterCursoCode(code) {
	if (typeof code !== 'undefined'){
		const grado = code.substring(1,2);
		const number = code.substring(0,1);
		if (grado === "G") {
			return `${number} grado`
		}else {
			return `${number} año`
		}
	}
}

export default ConverterCursoCode;